(function(global, $data, undefined) {

	$data.Entity.extend('Tridion.ContentDelivery.Binary', {
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'Binaries'
		},
		'BinaryVariants' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.BinaryVariant',
			'inverseProperty' : 'Binary'
		},
		'BinaryId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Type' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.BinaryContent', {
		'BinaryId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'VariantId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.BinaryVariant', {
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'BinaryVariants'
		},
		'Binary' : {
			'type' : 'Tridion.ContentDelivery.Binary',
			'required' : true,
			'inverseProperty' : 'BinaryVariants'
		},
		'BinaryId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Description' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'IsComponent' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Boolean'
		},
		'Path' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'URLPath' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'VariantId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'Type' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		}
	});

	$data.Entity
			.extend(
					'Tridion.ContentDelivery.Component',
					{
						'Publication' : {
							'type' : 'Tridion.ContentDelivery.Publication',
							'required' : true,
							'inverseProperty' : 'Components'
						},
						'Schema' : {
							'type' : 'Tridion.ContentDelivery.Schema',
							'required' : true,
							'inverseProperty' : 'Components'
						},
						'ComponentPresentations' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.ComponentPresentation',
							'inverseProperty' : 'Component'
						},
						'CustomMetas' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.CustomMeta',
							'inverseProperty' : 'Component'
						},
						'Keywords' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Keyword',
							'inverseProperty' : 'Components'
						},
						'SchemaId' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'Multimedia' : {
							'nullable' : true,
							'type' : 'Edm.Boolean'
						},
						'Title' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'ItemId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'PublicationId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'MajorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'MinorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'OwningPublication' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'CreationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'InitialPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'LastPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'Author' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.String'
						},
						'ModificationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						}
					});

	$data.Entity.extend('Tridion.ContentDelivery.ComponentPresentation', {
		'SchemaTitle' : {
			'type' : String,
			'computed' : true
		},
		'ItemSchema' : {
		    'type': String,
            'computed' : true
		},
		'ItemLastPublish' : {
		    'type': Date,
            'computed' : true
		},
		'Publication' : {
			'type' : String,
			'computed' : true
		},
		'Component' : {
			'type' : 'Tridion.ContentDelivery.Component',
			'required' : true,
			'inverseProperty' : 'ComponentPresentations'
		},
		'Template' : {
			'type' : 'Tridion.ContentDelivery.Template',
			'required' : true,
			'inverseProperty' : 'ComponentPresentations'
		},
		'Pages' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Page',
			'inverseProperty' : 'ComponentPresentations'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'ComponentId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'TemplateId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PresentationContent' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'OutputFormat' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'Encoding' : {
			'nullable' : true,
			'type' : 'Edm.String'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.CustomMeta', {
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'CustomMetas'
		},
		'Page' : {
			'type' : 'Tridion.ContentDelivery.Page',
			'required' : true,
			'inverseProperty' : 'CustomMetas'
		},
		'Component' : {
			'type' : 'Tridion.ContentDelivery.Component',
			'required' : true,
			'inverseProperty' : 'CustomMetas'
		},
		'Keyword' : {
			'type' : 'Tridion.ContentDelivery.Keyword',
			'required' : true,
			'inverseProperty' : 'CustomMetas'
		},
		'Id' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'ItemId' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'ItemType' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PublicationId' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'KeyName' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'StringValue' : {
			'nullable' : true,
			'type' : 'Edm.String'
		},
		'FloatValue' : {
			'nullable' : true,
			'type' : 'Edm.Decimal'
		},
		'DateValue' : {
			'nullable' : true,
			'type' : 'Edm.DateTime'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.Keyword', {
		'Children' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Keyword',
			'inverseProperty' : '$$unbound'
		},
		'Parent' : {
			'type' : 'Tridion.ContentDelivery.Keyword',
			'required' : true,
			'inverseProperty' : '$$unbound'
		},
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'Keywords'
		},
		'CustomMetas' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.CustomMeta',
			'inverseProperty' : 'Keyword'
		},
		'Components' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Component',
			'inverseProperty' : 'Keywords'
		},
		'Pages' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Page',
			'inverseProperty' : 'Keywords'
		},
		'Id' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'TaxonomyId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Title' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'Description' : {
			'nullable' : true,
			'type' : 'Edm.String'
		},
		'HasChildren' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Boolean'
		},
		'Abstract' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Boolean'
		},
		'Navigable' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Boolean'
		},
		'Key' : {
			'nullable' : true,
			'type' : 'Edm.String'
		},
		'Depth' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'ItemType' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'TotalRelatedItems' : {
			'nullable' : true,
			'type' : 'Edm.Int32'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.StructureGroup', {
		'Children' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.StructureGroup',
			'inverseProperty' : '$$unbound'
		},
		'Parent' : {
			'type' : 'Tridion.ContentDelivery.StructureGroup',
			'required' : true,
			'inverseProperty' : '$$unbound'
		},
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'StructureGroups'
		},
		'Pages' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Page',
			'inverseProperty' : 'StructureGroup'
		},
		'Id' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Title' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'Directory' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		},
		'Depth' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		}
	});

	$data.Entity.extend('Tridion.ContentDelivery.PageContent', {
		'Page' : {
			'type' : 'Tridion.ContentDelivery.Page',
			'required' : true,
			'inverseProperty' : 'PageContent'
		},
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'PageContents'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'PageId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Content' : {
			'nullable' : true,
			'type' : 'Edm.String'
		},
		'CharSet' : {
			'nullable' : true,
			'type' : 'Edm.String'
		}
	});

	$data.Entity
			.extend(
					'Tridion.ContentDelivery.Page',
					{
						'PageContent' : {
							'type' : 'Tridion.ContentDelivery.PageContent',
							'required' : true,
							'inverseProperty' : 'Page'
						},
						'Publication' : {
							'type' : 'Tridion.ContentDelivery.Publication',
							'required' : true,
							'inverseProperty' : 'Pages'
						},
						'CustomMetas' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.CustomMeta',
							'inverseProperty' : 'Page'
						},
						'StructureGroup' : {
							'type' : 'Tridion.ContentDelivery.StructureGroup',
							'required' : true,
							'inverseProperty' : 'Pages'
						},
						'Keywords' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Keyword',
							'inverseProperty' : 'Pages'
						},
						'ComponentPresentations' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.ComponentPresentation',
							'inverseProperty' : 'Pages'
						},
						'PagePath' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'Url' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'TemplateId' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'Title' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'ItemId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'PublicationId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'MajorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'MinorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'OwningPublication' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'CreationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'InitialPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'LastPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'Author' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.String'
						},
						'ModificationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						}
					});

	$data.Entity
			.extend(
					'Tridion.ContentDelivery.Publication',
					{
						'Pages' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Page',
							'inverseProperty' : 'Publication'
						},
						'Components' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Component',
							'inverseProperty' : 'Publication'
						},
						'PageContents' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.PageContent',
							'inverseProperty' : 'Publication'
						},
						'Schemas' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Schema',
							'inverseProperty' : 'Publication'
						},
						'Templates' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Template',
							'inverseProperty' : 'Publication'
						},
						'Keywords' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Keyword',
							'inverseProperty' : 'Publication'
						},
						'ComponentPresentations' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.ComponentPresentation',
							'inverseProperty' : 'Publication'
						},
						'CustomMetas' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.CustomMeta',
							'inverseProperty' : 'Publication'
						},
						'Binaries' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.Binary',
							'inverseProperty' : 'Publication'
						},
						'BinaryVariants' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.BinaryVariant',
							'inverseProperty' : 'Publication'
						},
						'StructureGroups' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.StructureGroup',
							'inverseProperty' : 'Publication'
						},
						'Id' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'Title' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'Key' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'PublicationPath' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'PublicationUrl' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'MultimediaPath' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'MultimediaUrl' : {
							'nullable' : true,
							'type' : 'Edm.String'
						}
					});

	$data.Entity.extend('Tridion.ContentDelivery.Schema', {
		'Publication' : {
			'type' : 'Tridion.ContentDelivery.Publication',
			'required' : true,
			'inverseProperty' : 'Schemas'
		},
		'Components' : {
			'type' : 'Array',
			'elementType' : 'Tridion.ContentDelivery.Component',
			'inverseProperty' : 'Schema'
		},
		'PublicationId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'SchemaId' : {
			'key' : true,
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.Int32'
		},
		'Title' : {
			'nullable' : false,
			'required' : true,
			'type' : 'Edm.String'
		}
	});

	$data.Entity
			.extend(
					'Tridion.ContentDelivery.Template',
					{
						'Publication' : {
							'type' : 'Tridion.ContentDelivery.Publication',
							'required' : true,
							'inverseProperty' : 'Templates'
						},
						'ComponentPresentations' : {
							'type' : 'Array',
							'elementType' : 'Tridion.ContentDelivery.ComponentPresentation',
							'inverseProperty' : 'Template'
						},
						'TemplatePriority' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'OutputFormat' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.String'
						},
						'Title' : {
							'nullable' : true,
							'type' : 'Edm.String'
						},
						'ItemId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'PublicationId' : {
							'key' : true,
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.Int32'
						},
						'MajorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'MinorVersion' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'OwningPublication' : {
							'nullable' : true,
							'type' : 'Edm.Int32'
						},
						'CreationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'InitialPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'LastPublishDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						},
						'Author' : {
							'nullable' : false,
							'required' : true,
							'type' : 'Edm.String'
						},
						'ModificationDate' : {
							'nullable' : true,
							'type' : 'Edm.DateTime'
						}
					});

	$data.EntityContext
			.extend(
					'Tridion.ContentDelivery.ContentDeliveryService',
					{
						'Binaries' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Binary
						},
						'BinaryContents' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.BinaryContent
						},
						'BinaryVariants' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.BinaryVariant
						},
						'Components' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Component
						},
						'ComponentPresentations' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.ComponentPresentation
						},
						'QueryComponentPresentations' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.ComponentPresentation
						},
						'CustomMetas' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.CustomMeta
						},
						'Keywords' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Keyword
						},
						'StructureGroups' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.StructureGroup
						},
						'PageContents' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.PageContent
						},
						'Pages' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Page
						},
						'Publications' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Publication
						},
						'Schemas' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Schema
						},
						'Templates' : {
							type : $data.EntitySet,
							elementType : Tridion.ContentDelivery.Template
						}
					});

	$data.generatedContexts = $data.generatedContexts || [];
	$data.generatedContexts
			.push(Tridion.ContentDelivery.ContentDeliveryService);

})(window, $data);
