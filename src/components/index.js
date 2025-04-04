// Where custom components class will be loaded
BareJS.Components = class {
    // barejs-component class
    static Component;
    
    static current = undefined;
    static CACHE = {
        WC_COMPONENT: {},
        HC_COMPONENT: {}
    };

    static newWC(componentName, componentClass) {
        this.CACHE.WC_COMPONENT[componentName] = componentClass;
    }

    static createWC(componentName) {
        if (!this.CACHE.WC_COMPONENT[componentName]) throw new Error(`Component '${componentName}' doesn't exist.`);
        return new this.CACHE.WC_COMPONENT[componentName]();
    }

    static loadWC(componentName, callback) {
        const url = `${BareJS.config.root}${BareJS.config.components.components_folder}${componentName}.js`;
        if (this.CACHE.WC_COMPONENT[componentName]) return callback();

        const newComponent = document.createElement("script");
        newComponent.onload = () => { 
            customElements.define(`barejs-custom-${componentName.toLowerCase()}`, this.CACHE.WC_COMPONENT[componentName]);
            callback(); 
        };
        
        newComponent.src = url;
        document.body.appendChild(newComponent);
    }

    static loadHC(componentName, callback) {
        const url = `${BareJS.config.root}${BareJS.config.components.components_folder}${componentName}.html`;

        // Use a HC component already loaded
        if (this.CACHE.HC_COMPONENT[url] !== undefined) {
            return this.CACHE.HC_COMPONENT[url].then(html => callback(html));
        } 

        // Download component
        this.CACHE.HC_COMPONENT[url] = new Promise((resolve, reject) => {
            fetch(url)
                .then(res => res.text())
                .then(html => {
                    resolve(html);
                    callback(html);
                })
                .catch(err => reject(err)); 
        });
    }
}