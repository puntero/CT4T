using Tridion.Extensions.ContentManager.Templating;
using Tridion.ContentManager.Templating.Assembly;
using Tridion.ContentManager.Templating;
using System.Xml;
using System.Web.Script.Serialization;
using Tridion.ContentManager.ContentManagement.Fields;
using System.Dynamic;
using System.Xml.Linq;
using System.Linq;
using System.Collections.Generic;
using Tridion.ContentManager.ContentManagement;
using System;
namespace Tridion.Extensions.ContentManager.Templating
{
[TcmTemplateTitle("Component To JSON")]
public class ComponentToJson : TemplateBase
{
    public override void Transform(Engine engine, Package package)
    {
        this.Initialize(engine, package);
        var data = new ComponentData(this.GetComponent(),engine);
        package.PushItem("Output", package.CreateStringItem(ContentType.Text, new JavaScriptSerializer().Serialize(data)));
    }
}

internal class KeywordData
{
    public int id { get; set; }
    public string key { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public KeywordData(Keyword kw)
    {
        id = kw.Id.ItemId;
        title = kw.Title;
        key = kw.Key != null ? kw.Key : null;
        description = kw.Description != null ? kw.Description : null;
    }
}

internal class BinaryData
{
    public string url { get; set; }
    public Dictionary<string,object> metadata { get; set; }
}

internal class ComponentData : Dictionary<string, object>
{
    private Engine _engine;
    public ComponentData(Component comp, Engine engine)
    {
        _engine = engine;
        this.Add("id", comp.Id.ItemId);
        this.Add("publication", comp.Id.PublicationId);
        this.Add("url", String.Format("TCDL_LINK_tcm:{0}-{1}",comp.Id.PublicationId,comp.Id.ItemId));
        foreach (var field in new ItemFields(comp.Content, comp.Schema))
        {
            object fieldData = GetFieldData(field);
            if (fieldData != null)
            {
                this.Add(field.Name, fieldData);
            }
        }
        //add title and date (if there are not already fields for these)
        if (!this.ContainsKey("title"))
        {
            this.Add("title", comp.Title);
        }
        if (!this.ContainsKey("pubdate"))
        {
            this.Add("pubdate", GetIso8601Date(DateTime.Now));
        }
        this.Add("metadata", GetFieldsData(new ItemFields(comp.Metadata, comp.MetadataSchema)));
    }

    private object GetIso8601Date(DateTime dateTime)
    {
        return dateTime > DateTime.MinValue ? dateTime.ToString("s", System.Globalization.CultureInfo.InvariantCulture) + "Z" : null;
    }

    private Dictionary<string, object> GetFieldsData(ItemFields itemFields)
    {
        if (itemFields != null)
        {

            var data = new Dictionary<string, object>();
            foreach (var field in itemFields)
            {
                object fieldData = GetFieldData(field);
                if (fieldData != null)
                {
                    data.Add(field.Name, fieldData);
                }
            }
            return data;
        }
        return null;
    }
    private object GetFieldData(ItemField field)
    {
        //For embedded we recurse
        if (field is EmbeddedSchemaField)
        {
            var f = (EmbeddedSchemaField)field;
            if (f.Definition.MaxOccurs != 1)
            {
                return f.Values.Select(a => GetFieldsData(a)).ToList();
            }
            return GetFieldsData(f.Value);
        }
        //For keywords we want the id, key, title etc.
        if (field is KeywordField)
        {
            var f = (KeywordField)field;
            if (f.Definition.MaxOccurs != 1)
            {
                return f.Values.Select(a => GetKeywordField(a)).ToList();
            }
            return GetKeywordField(f.Value);
        }
        //For binaries we want to publish the binary and add the URL (other component links we just add the id)
        if (field is ComponentLinkField)
        {
            var f = (ComponentLinkField)field;
            if (f.Definition.MaxOccurs != 1)
            {
                return f.Values.Select(a => GetComponentLinkField(a)).ToList();
            }
            return GetComponentLinkField(f.Value);
        }
        //For date fields we use a date object (TODO check serializes in good format)
        if (field is DateField)
        {
            var f = (DateField)field;
            if (f.Definition.MaxOccurs != 1)
            {
                return f.Values.Select(d=>this.GetIso8601Date(d)).ToList();
            }
            return this.GetIso8601Date(f.Value);
        }
        //Numbers are numbers
        if (field is NumberField)
        {
            var field2 = (NumberField)field;
            if (field2.Definition.MaxOccurs != 1)
            {
                return field2.Values;
            }
            return field2.Value;
        }
        //Include text but ignore RTF fields. Why? Better use a whole DCP if rendering these 
        //to many issues with markup, resolving links etc.
        if (field is TextField && !(field is XhtmlField))
        {
            var field2 = (TextField)field;
            if (field2.Definition.MaxOccurs != 1)
            {
                return field2.Values;
            }
            return field2.Value;
        }
        return null;
    }
    private object GetKeywordField(Keyword kw)
    {
        if (kw != null)
        {
            return new KeywordData(kw);
        }
        return null;
    }
    private object GetComponentLinkField(Component component)
    {
        if (component != null)
        {
            if (component.ComponentType == ComponentType.Multimedia)
            {
                var data = new BinaryData();
                data.url = _engine.PublishingContext.RenderedItem.AddBinary(component).Url;
                data.metadata = component.Metadata != null ? GetFieldsData(new ItemFields(component.Metadata, component.MetadataSchema)) : null;
                return data;
            }
            else
            {
                return component.Id.ToString();
            }
        }
        return null;
    }
}
}
