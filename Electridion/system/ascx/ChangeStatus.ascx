<%@ Control Language="C#" AutoEventWireup="true" Inherits="Electridion.Web.UI.SubscriptionControl" %>

	<p><asp:Label runat="server" ID="MESSAGE" /></p>
	<asp:Panel runat="server" ID="FORMPANEL">
		<asp:HiddenField runat="server" ID="P" />
		<div class="agreement" style="width: 100%; float: left;">
			<table border="0">
				<tr>
					<td valign="top">
						<asp:Button runat="server" ID="Submit" OnClick="ProcessForm" Text="Submit" CssClass="button blue" />
					</td>
				</tr>
			</table>
		</div>
	</asp:Panel>
