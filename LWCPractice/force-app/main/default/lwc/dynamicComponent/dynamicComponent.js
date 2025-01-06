import { LightningElement, wire } from 'lwc';
import getDynamicComponents from '@salesforce/apex/DynamicComponentController.getDynamicComponents';

export default class DynamicContainer extends LightningElement {
    components = [];
    error;

    @wire(getDynamicComponents)
    wiredComponents({ error, data }) {
        if (data) {
            // Transform the metadata into component configurations
            this.components = data.map(config => ({
                componentName: config.Component_Name__c,
                order: config.Display_Order__c,
                constructor: null
            }));
            
            // Load all components
            this.loadComponents();
        } else if (error) {
            this.error = 'Error loading components: ' + error.body.message;
            console.error('Error:', error);
        }
    }

    async loadComponents() {
        try {
            // Load each component constructor
            const loadedComponents = await Promise.all(
                this.components.map(async (component) => {
                    try {
                        const module = await import(component.componentName);
                        return {
                            ...component,
                            constructor: module.default
                        };
                    } catch (err) {
                        console.error(`Error loading component ${component.componentName}:`, err);
                        return null;
                    }
                })
            );

            // Filter out any failed loads and sort by order
            this.components = loadedComponents
                .filter(comp => comp !== null)
                .sort((a, b) => a.order - b.order);
        } catch (err) {
            this.error = 'Error initializing components: ' + err.message;
            console.error('Error:', err);
        }
    }
}