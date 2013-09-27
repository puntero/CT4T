declare var $: any;
declare var Tridion: any;

/**
 * CT4T Library.
 */
module ClientTemplating4T {

    var context: any = new Tridion.ContentDelivery.ContentDeliveryService({
        name: 'oData',
        oDataServiceHost: 'http://ec2-176-34-172-61.eu-west-1.compute.amazonaws.com:88/odata.svc'
    });

    /**
     * Gets a specific component out.
     *
     * @param {number} publicationId The identifier of the publication to get the component from.
     * @param {number} componentId The unique identifier of the component to get.
     * @param {function} cb The callback function (error, component).
     */
    export function getComponent(publicationId: number, componentId: number, cb: (error: any) => void): void
    export function getComponent(publicationId: number, componentId: number, cb: (error: any, component: any) => void): void
    export function getComponent(publicationId: number, componentId: number, cb: (error: any, component?: any) => void): void {
        context.onReady(function () {
            context.ComponentPresentations
                .filter(function (cp) {
                    return cp.ComponentId === this.componentId && cp.PublicationId === this.publicationId;
                }, { publicationId: publicationId, componentId: componentId })
                .map(function (cp) {
                    return cp.PresentationContent;
                })
                .toArray(function (cps: string[]) {
                    
                    if (cps.length > 0) {
                        console.log(cps, JSON.parse(cps[0]));
                        cb(null, JSON.parse(cps[0]));
                    } else {
                        cb(null, null);
                    }
                });
        });
    }

    /**
     * Gets multiple components from the broker based on a query.
     *
     * @param {ComponentQuery} query The query to search for components.
     * @param {function} cb The callback function once components are retrieved. (error, components).
     */
    export function getComponents(query: IComponentQuery, cb: (error: any, components?: any[]) => void) {

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

            components.toArray(function (cps: string[]) {
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

    export function getComponentPresentation(publicationId, templateId, componentId) {

    }

    /**
     * Creates an empty ComponentQuery object.
     */
    export function query() {
        return new ComponentQuery();
    }

    /**
     * Represents a query object.
     */
    export class ComponentQuery implements IComponentQuery {

        /**
         * The schemas to query on.
         */
        public schemaIds: number[];

        /**
         * The keywords to query on.
         */
        public keywords: any[];

        /**
         * The metadata to query on.
         */
        public metadata: any[];

        /**
         * The maximum number of results to retrieve.
         */
        public limit: number;

        /**
         * The order statement.
         */
        public orderBy: any;

        public orderByDesc: any;

        /**
         * The publication to get results from.
         */
        public publicationId: number;

        /**
         * The starting row to get results for.
         */
        public start: number = 0;

        /**
         * Constructor
         */
        constructor() {

        }

        /**
         * Adds a specific schema.
         */
        public addSchemaId(schemaId: number): ComponentQuery {
            if (!this.schemaIds) {
                this.schemaIds = [];
            }
            this.schemaIds[this.schemaIds.length] = schemaId;

            return this;
        }

        /**
         * Sets the maximum number of results that will be returned by the query.
         *
         * @param {number} value The value to set the limit to.
         */
        public setLimit(value: number): ComponentQuery {
            this.limit = value;

            return this;
        }

        /**
         * Sets the publication to pull results from.
         */
        public setPublication(publicationId: number): ComponentQuery {
            this.publicationId = publicationId;

            return this;
        }

        /**
         * Sets the starting row to begin getting results from.
         */
        public setStart(value: number): ComponentQuery {
            this.start = value;

            return this;
        }
    }
}

interface IComponent {
    id: number;
    publication: number;
    schema: number;
    title: string;
}

interface IComponentQuery {
    schemaIds: any[];
    keywords: any[];
    metadata: any[];
    orderBy: any;
    orderByDesc: any;
    publicationId: any;
    limit: number;
    start: number;
}


console.log("ClientTemplating4T:", ClientTemplating4T);