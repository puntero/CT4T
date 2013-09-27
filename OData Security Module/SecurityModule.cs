using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text.RegularExpressions;
using System.Web;

namespace ODataSecurityModule {

	public class SecurityModule : IHttpModule {

		private IList<Regex> regexList = new List<Regex>();

		/// <summary>
		/// Inititialize the module
		/// </summary>
		/// <param name="context">The application context</param>
		public void Init(HttpApplication context) {
			context.AuthorizeRequest += new EventHandler(this.OnAuthorizeRequest);
			int i = 0;
			String regex;
			while ((regex = ConfigurationManager.AppSettings["AllowedRegEx" + i]) != null) {
				regexList.Add(new Regex(regex));
				i++;
			}
		}

		/// <summary>
		/// Dispose
		/// </summary>
		public void Dispose() {
		}

		private void OnAuthorizeRequest(object sender, EventArgs e) {
			HttpApplication application = (HttpApplication)sender;
			HttpRequest request = application.Context.Request;
			String path = request.Path;

			foreach (Regex regex in regexList) {
				if (regex.IsMatch(path)) {
					return;
				}
			}

			throw new HttpException(401, "Not allowed");
		}
	}
}
