package com.tridion.extensions.tcdl.renderer;

import com.tridion.linking.BinaryLink;
import com.tridion.linking.ComponentLink;
import com.tridion.linking.Link;
import com.tridion.linking.PageLink;
import com.tridion.tcdl.OutputDocument;
import com.tridion.tcdl.TCDLTransformerException;
import com.tridion.tcdl.Tag;
import com.tridion.tcdl.TagRenderer;
import com.tridion.tcdl.TransformContext;
import com.tridion.util.StringUtils;
import com.tridion.util.TCMURI;
import java.text.ParseException;

public class ExtendedLinkTagRenderer implements TagRenderer {
	private String originURI;
	private String destinationURI;
	private String templateURI;
	private String linkAttributes = "";
	private String variantId;
	private boolean textOnFail;
	private String addAnchor;
	private String type;
	private String parameters;
	private boolean urlOnly;

	public void setOrigin(String originURI) {
		this.originURI = originURI;
	}

	public void setRequiredDestination(String destinationURI) {
		this.destinationURI = destinationURI;
	}

	public void setTemplateURI(String templateURI) {
		this.templateURI = templateURI;
	}

	public void setLinkAttributes(String linkAttributes) {
		this.linkAttributes = linkAttributes;
	}

	public void setTextOnFail(String textOnFail) {
		this.textOnFail = "true".equalsIgnoreCase(textOnFail);
	}

	public void setAddAnchor(String addAnchor) {
		this.addAnchor = addAnchor;
	}

	public void setRequiredType(String type) {
		this.type = type;
	}

	public void setVariantId(String variantId) {
		this.variantId = variantId;
	}

	public void setUrlOnly(String urlOnly) {
		this.urlOnly = "true".equalsIgnoreCase(urlOnly);
	}

	public int doStartTag(Tag tag, StringBuffer tagBody,
			TransformContext context, OutputDocument target)
			throws TCDLTransformerException {
		return 0;
	}

	public String doEndTag(Tag tag, StringBuffer tagBody,
			TransformContext context, OutputDocument target)
			throws TCDLTransformerException {
		String result = "";

		String linkText = tagBody.toString().trim();

		if ("Binary".equals(this.type))
			result = generateBinaryLink(this.destinationURI,
					StringUtils.normalizeString(this.variantId),
					this.addAnchor, linkText, this.linkAttributes,
					this.textOnFail);
		else if ("Component".equals(this.type))
			result = generateComponentLink(this.originURI, this.destinationURI,
					this.templateURI, "true".equalsIgnoreCase(this.addAnchor),
					linkText, this.linkAttributes, this.textOnFail);
		else if ("Page".equals(this.type))
			result = generatePageLink(this.destinationURI, this.addAnchor,
					linkText, this.linkAttributes, this.textOnFail,
					this.parameters);
		return result;
	}

	public boolean requiresCodeBlock(TransformContext context,
			OutputDocument target, Tag tag) {
		return false;
	}

	private String generateBinaryLink(String binaryURI, String variantId,
			String addAnchor, String linkText, String linkAttributes,
			boolean textOnFail) {
		BinaryLink binaryLink = new BinaryLink(getPublicationId(binaryURI));
		Link link = binaryLink.getLink(binaryURI, variantId, addAnchor,
				linkText, linkAttributes, textOnFail);
		return urlOnly ? link.getURL() : link.toString();
	}

	private String generateComponentLink(String pageURI, String componentURI,
			String templateURI, boolean addAnchor, String linkText,
			String linkAttributes, boolean textOnFail) {
		int pubId = getPublicationId(pageURI);
		pubId = pubId != 0 ? pubId : getPublicationId(componentURI);
		ComponentLink componentLink = new ComponentLink(pubId);
		Link link = componentLink.getLink(pageURI, componentURI, templateURI,
				linkAttributes, linkText, textOnFail, addAnchor);
		return urlOnly ? link.getURL() : link.toString();
	}

	private String generatePageLink(String pageURI, String addAnchor,
			String linkText, String linkAttributes, boolean textOnFail,
			String parameters) {
		PageLink pageLink = new PageLink(getPublicationId(pageURI));
		Link link = pageLink.getLink(pageURI, addAnchor, linkAttributes,
				linkText, textOnFail, parameters);
		return urlOnly ? link.getURL() : link.toString();
	}

	private int getPublicationId(String itemURI) {
		int publicationId = 0;
		try {
			TCMURI uri = new TCMURI(itemURI);
			publicationId = uri.getPublicationId();
		} catch (ParseException e) {
			// log.error("Couldn't retrieve publication identifier for rendering TCDL Link tag: "
			// + e.getMessage());
		}
		return publicationId;
	}
}