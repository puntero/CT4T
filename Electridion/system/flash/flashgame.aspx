<%@ Page Title="Flash Game" Language="C#" MasterPageFile="~/system/electridion.master" Inherits="Electridion.Web.UI.ElectridionBasePage" BodyClass="product tvvideo" PageUri="tcm:68-6571-64" StructureGroupUri="tcm:68-767-4"%>
<asp:Content ID="HeadContent" ContentPlaceHolderId="head" runat="server">
    <meta name="keywords" content="" />
    <meta name="description" content="Labels.ProductPage" />
    <title>Flash Game</title>
</asp:Content>


<asp:Content ID="MainContent" ContentPlaceHolderId="main" runat="server">
    <div id="contents">
    	
    	
           <div class="banner">
   <object width="600" height="430">
     <embed src="/system/flash/FlashGame.swf" type="application/x-shockwave-flash" width="600" height="430"></embed>
   </object>
<br/>
This a Game where you can build Sandwiches.
</div>        
        <div id="main">
    
        
        
		</div>
    </div>
    <div id="sidebar">
        <div  class="background-gradient" style="height:100%">
              <ul id="taxnav">
              	<tridion:TaxonomyControl ID="TaxonomyNav" ShowRoot="false" runat="server" ContextKeyword="" TaxonomyUri="" ShowEmptyKeywords="false"   />
                </ul>
               <div id="recommend">
                    <elec:PersonalizedContent ID="PersonalizedContent1" runat="server" MaxResults="3" Title="Recomendado" />
               </div>
         </div>
    </div>
    <div class="clearfix"></div>
     <!--SITE_EDIT_INIT-->
</asp:Content>