/**
* CT4T Library.
*/
var ClientTemplating4T;
(function (ClientTemplating4T) {
    var context = new Tridion.ContentDelivery.ContentDeliveryService({
        name: 'oData',
        oDataServiceHost: 'http://ec2-176-34-172-61.eu-west-1.compute.amazonaws.com:88/odata.svc'
    });

    function getComponent(publicationId, componentId, cb) {
        context.onReady(function () {
            context.ComponentPresentations.filter(function (cp) {
                return cp.ComponentId === this.componentId && cp.PublicationId === this.publicationId;
            }, { publicationId: publicationId, componentId: componentId }).map(function (cp) {
                return cp.PresentationContent;
            }).toArray(function (cps) {
                if (cps.length > 0) {
                    console.log(cps, JSON.parse(cps[0]));
                    cb(null, JSON.parse(cps[0]));
                } else {
                    cb(null, null);
                }
            });
        });
    }
    ClientTemplating4T.getComponent = getComponent;

    /**
    * Gets multiple components from the broker based on a query.
    *
    * @param {ComponentQuery} query The query to search for components.
    * @param {function} cb The callback function once components are retrieved. (error, components).
    */
    function getComponents(query, cb) {
        context.onReady(function () {
            var components = context.QueryComponentPresentations;

            if (query.orderBy) {
                components = components.orderBy("it." + query.orderBy);
            } else if (query.orderByDesc) {
                components = components.orderByDescending("it." + query.orderByDesc);
            }

            if (query.publicationId) {
                components = components.filter(function (cp) {
                    return cp.Publication === this.query.publicationId;
                }, { query: query });
            }

            if (query.schemaIds) {
                if (query.schemaIds.length === 1) {
                    components = components.filter(function (cp) {
                        return cp.ItemSchema === this.query.schemaIds[0];
                    }, { query: query });
                } else {
                    components = components.filter(function (cp) {
                        return cp.ItemSchema in this.query.schemaIds;
                    }, { query: query });
                }
            }

            components = components.map(function (cp) {
                return cp.PresentationContent;
            });

            if (query.limit) {
                components = components.take(query.limit);
            }

            components.toArray(function (cps) {
                var length = cps.length;

                while (length--) {
                    cps[length] = JSON.parse(cps[length]);
                }
                cb(null, cps);
            });
        });
        /*var results: any[] = [];
        
        $.getJSON("/data/fake-service.js", function (result) {
        var length = result.results.length,
        component: any;
        
        while (length--) {
        component = result.results[length];
        if (query.publicationId) {
        if (component.publication !== query.publicationId) {
        continue;
        }
        }
        if (query.schemas) {
        if (query.schemas.indexOf(component.schema) === -1) {
        continue;
        }
        }
        results[results.length] = component;
        
        if (query.limit && results.length >= query.limit) {
        break;
        }
        }
        cb(null, results);
        });*/
    }
    ClientTemplating4T.getComponents = getComponents;

    function getComponentPresentation(publicationId, templateId, componentId) {
    }
    ClientTemplating4T.getComponentPresentation = getComponentPresentation;

    /**
    * Creates an empty ComponentQuery object.
    */
    function query() {
        return new ComponentQuery();
    }
    ClientTemplating4T.query = query;

    /**
    * Represents a query object.
    */
    var ComponentQuery = (function () {
        /**
        * Constructor
        */
        function ComponentQuery() {
            /**
            * The starting row to get results for.
            */
            this.start = 0;
        }
        /**
        * Adds a specific schema.
        */
        ComponentQuery.prototype.addSchemaId = function (schemaId) {
            if (!this.schemaIds) {
                this.schemaIds = [];
            }
            this.schemaIds[this.schemaIds.length] = schemaId;

            return this;
        };

        /**
        * Sets the maximum number of results that will be returned by the query.
        *
        * @param {number} value The value to set the limit to.
        */
        ComponentQuery.prototype.setLimit = function (value) {
            this.limit = value;

            return this;
        };

        /**
        * Sets the publication to pull results from.
        */
        ComponentQuery.prototype.setPublication = function (publicationId) {
            this.publicationId = publicationId;

            return this;
        };

        /**
        * Sets the starting row to begin getting results from.
        */
        ComponentQuery.prototype.setStart = function (value) {
            this.start = value;

            return this;
        };
        return ComponentQuery;
    })();
    ClientTemplating4T.ComponentQuery = ComponentQuery;
})(ClientTemplating4T || (ClientTemplating4T = {}));

console.log("ClientTemplating4T:", ClientTemplating4T);
