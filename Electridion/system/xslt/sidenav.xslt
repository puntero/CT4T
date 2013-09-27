<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://schemas.microsoft.com/AspNet/SiteMap-File-1.0" exclude-result-prefixes="sm">
	<xsl:output method="html" indent="yes" omit-xml-declaration="yes"/>
  <xsl:param name="sgUri"/>
  <xsl:param name="currentPageUri"/>
		<xsl:template match="/">
			<xsl:variable name="contextSgUri">
				<xsl:choose>
					<xsl:when test="/sm:siteMap/sm:siteMapNode/sm:siteMapNode[@id=string($sgUri)]"><xsl:value-of select="$sgUri"/></xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="/sm:siteMap/sm:siteMapNode/sm:siteMapNode[@type='StructureGroup' and (.//sm:siteMapNode[@id=string($sgUri)])]/@id"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:variable>
			<xsl:variable name="contextSg" select="/sm:siteMap/sm:siteMapNode/sm:siteMapNode[@id=string($contextSgUri)]"/>
			<ul>
				<xsl:apply-templates select="$contextSg/sm:siteMapNode"/>
			</ul>
		</xsl:template>
		<xsl:template match="sm:siteMapNode">
      <xsl:if test="not (string(number(substring(@fullTitle,0,3)))='NaN')">
			  <li>
          <xsl:if test="@id=$currentPageUri">
            <xsl:attribute name="class">navselected</xsl:attribute>
          </xsl:if>
				  <a href="{@url}">
					  <xsl:value-of select="@title"/>
					  <xsl:if test="./sm:siteMapNode">
						  <ul>
							  <xsl:apply-templates select="./sm:siteMapNode"/>
						  </ul>
					  </xsl:if>
				  </a>
			  </li>
      </xsl:if>
		</xsl:template>
</xsl:stylesheet>
