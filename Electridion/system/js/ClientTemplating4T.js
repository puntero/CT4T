/**
* CT4T Library.
*/
var ClientTemplating4T;
(function (ClientTemplating4T) {
    function getComponent(publicationId, componentId, cb) {
        $.getJSON("/data/fake-service.js", function (result) {
            var length = result.results.length, component;

            while (length--) {
                component = result.results[length];
                if (component.publication === publicationId && component.id === componentId) {
                    return cb(null, component);
                }
            }
            cb(null, null);
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
        var results = [];

        $.getJSON("/data/fake-service.js", function (result) {
            var length = result.results.length, component;

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
        });
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
        ComponentQuery.prototype.addSchema = function (schemaId) {
            if (!this.schemas) {
                this.schemas = [];
            }
            this.schemas[this.schemas.length] = schemaId;

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
