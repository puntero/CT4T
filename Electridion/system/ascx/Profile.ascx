<%@ Control Language="C#" AutoEventWireup="true" Inherits="Electridion.Web.UI.SubscriptionControl" %>
<p><asp:Label runat="server" ID="MESSAGE" /></p>
	<asp:Panel runat="server" ID="FORMPANEL">
		<asp:HiddenField runat="server" ID="P" />
		<div style="width: 300px;float: left;">
			<table border="0" style="border-width: 0px; width: 100%;">
				<tr>
					<td style="width: 110px;">
						Email Address: <span style="color: Red">*</span>
						<asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator1" runat="server" ControlToValidate="MAIL">
							<br /><span style="color:Red;">Please enter a valid email address</span>
						</asp:RequiredFieldValidator>
					</td>
					<td>
						<asp:TextBox runat="server" ID="MAIL" />
					</td>
				</tr>
				<tr>
					<td>
						Password: <span style="color: Red">*</span>
						<asp:RequiredFieldValidator Display="Dynamic" ID="RequiredFieldValidator2" runat="server" ControlToValidate="EX_PASSWORD">
							<br /><span style="color:Red;">Please enter a password</span>
						</asp:RequiredFieldValidator>
					</td>
					<td>
						<asp:TextBox runat="server" ID="EX_PASSWORD" TextMode="Password" />
					</td>
				</tr>
                <tr>
					<td style="width: 110px;">
						First Name:
					</td>
					<td>
						<asp:TextBox runat="server" ID="EX_NAME" />
					</td>
				</tr>
				<tr>
					<td>
						Last Name:
					</td>
					<td>
						<asp:TextBox runat="server" ID="EX_SURNAME" />
					</td>
				</tr>
                <tr>
					<td valign="top">
						Gender:
					</td>
					<td>
                    	<asp:RadioButtonList runat="server" ID="KW_GENDER">
							<asp:ListItem Value="tcm:8-6180-1024" Text="Hembra" /><asp:ListItem Value="tcm:8-6181-1024" Text="Macho" />
                        </asp:RadioButtonList>
					</td>
				</tr>
				<tr>
					<td>
						City:
					</td>
					<td>
						<asp:TextBox runat="server" ID="EX_CITY" />
					</td>
				</tr>
				<tr>
					<td>
						Company:
					</td>
					<td>
						<asp:TextBox runat="server" ID="EX_COMPANY" />
					</td>
				</tr>
			</table>
		</div>
		<div style="width: 351px;" class="right">
			<table  border="0" style="border-width: 0px; width: 100%;">
				<tr>
					<td valign="top" style="width: 150px;">
						Which of the following best describe your interest?
					</td>
					<td>
						<asp:CheckboxList runat="server" ID="KW_INTEREST">
                        	<asp:ListItem Value="tcm:1-189-1024" Text="Advanced Amateur" /><asp:ListItem Value="tcm:1-188-1024" Text="Adventurer" /><asp:ListItem Value="tcm:1-190-1024" Text="Beginner" /><asp:ListItem Value="tcm:1-69-1024" Text="Professional" />
                        </asp:CheckboxList>
					</td>
				</tr>
				<tr>
					<td valign="top">
						What products and ideas are you interested in?
					</td>
					<td>
						
						<asp:CheckboxList runat="server" ID="KW_PRODUCTS">
                        	<asp:ListItem Value="tcm:8-2696-1024" Text="Accesorios" /><asp:ListItem Value="tcm:8-2695-1024" Text="Audio" /><asp:ListItem Value="tcm:8-2694-1024" Text="TV y vídeo" />
                        </asp:CheckboxList>
					</td>
				</tr>
			</table>
		</div>
		<div style="width: 300px; float: left;">
			<table border="0" style="border-width: 0px; width: 100%;">
				
			</table>
		</div>
		<div style="width: 100%;" class="right">
			&nbsp;
		</div>
		<div class="agreement" style="width: 100%; float: left;">
			<table border="0">
				<tr>
					<td valign="top">
						<br />
						<asp:Button runat="server" ID="Submit" OnClick="ProcessForm" Text="Submit" CssClass="button blue" />
					</td>
				</tr>
			</table>
		</div>
	</asp:Panel>

