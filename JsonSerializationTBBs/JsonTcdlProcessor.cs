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
using System.Text.RegularExpressions;
namespace Tridion.Extensions.ContentManager.Templating
{
    [TcmTemplateTitle("JSON TCDL Processor")]
    public class JsonTcdlProcessor : TemplateBase
    {
        private static string LINK_PATTERN = @"TCDL_LINK_(tcm\:\d+\-\d+)";
        private static string TCDL_LINK_FORMAT = "<tcdl:Link urlOnly=\"true\" type=\"Component\" destination=\"{0}\" templateURI=\"tcm:0-0-0\" origin=\"tcm:0-0-0\"  />";
        public override void Transform(Engine engine, Package package)
        {
            this.Initialize(engine, package);
            Item output = package.GetByName("Output");
            output.SetAsString(Regex.Replace(output.GetAsString(), LINK_PATTERN, delegate(Match match)
            {
                return String.Format(TCDL_LINK_FORMAT, match.Groups[1].Value);
            }));
        }
    }
}
