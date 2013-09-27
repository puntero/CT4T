declare var $: any;

/**
 * CT4T Library.
 */
module ClientTemplating4T {

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
        $.getJSON("/data/fake-service.js", function (result) {
            var length = result.results.length,
                component: any;

            while (length--) {
                component = result.results[length];
                if (component.publication === publicationId && component.id === componentId) {
                    return cb(null, component);
                }
            }
            cb(null, null);
        });
    }

    /**
     * Gets multiple components from the broker based on a query.
     *
     * @param {ComponentQuery} query The query to search for components.
     * @param {function} cb The callback function once components are retrieved. (error, components).
     */
    export function getComponents(query: IComponentQuery, cb: (error: any, components?: any[]) => void) {
        var results: any[] = [];

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
        });
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
        public schemas: number[];

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
        public addSchema(schemaId: number): ComponentQuery {
            if (!this.schemas) {
                this.schemas = [];
            }
            this.schemas[this.schemas.length] = schemaId;

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
    schemas: any[];
    keywords: any[];
    metadata: any[];
    orderBy: any;
    publicationId: any;
    limit: number;
    start: number;
}
/*
ourApi.getComponentData(id);
.getComponents(schemaId); schemaId, keywords, metadata
*/
    