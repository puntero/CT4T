<%@ Page Title="" Language="C#" MasterPageFile="~/system/electridion.master" Inherits="Electridion.Web.UI.ElectridionBasePage" BodyClass="article company" PageUri="tcm:68-6552-64" StructureGroupUri="tcm:68-763-4"%>
<asp:Content ID="HeadContent" ContentPlaceHolderId="head" runat="server">
    <meta name="keywords" content="" />
    <meta name="description" content="Labels.ProductPage" />
    <title></title>
</asp:Content>


<asp:Content ID="MainContent" ContentPlaceHolderId="main" runat="server">

                    <div id="contents">
                    	
                    	<div id="main">
                        
                        </div>
                    </div>
                    <div id="sidebar">
                        
                        <div 
                             class="background-gradient" 
                            style="height:100%">
                            <asp:Xml ID="SideNav" runat="server" DocumentSource="~/electridion.sitemap" TransformSource="~/system/xslt/sidenav.xslt"></asp:Xml>
                            <div id="recommend">
                               <elec:PersonalizedContent ID="PersonalizedContent1" runat="server" MaxResults="3" Title="Recomendado" />
                            </div>
                            
                        </div>

                    </div>
                    <div class="clearfix"></div>
                     <!--SITE_EDIT_INIT-->
</asp:Content>