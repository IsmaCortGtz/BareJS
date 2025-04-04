BareJS.Components.Component = class extends HTMLElement {
    #componentName;
    #componentType;

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.parentNode instanceof BareJS.Components.Component && this.parentNode.getAttribute("bjs-component")?.startsWith("hc:")) {
            console.log("[BAREJS-COMPONENT] Skipping. Component nested.");
            return;
        }

        const componentAt = this.getAttribute("bjs-component");
        if (!componentAt) throw new Error("Atributte 'bjs-component' not found.");

        const componentParts = componentAt.split(":");
        if (componentParts.length != 2) throw new Error("Invalid 'bjs-component'.");

        this.#componentType = componentParts[0];
        if (!["wc", "hc"].includes(this.#componentType)) throw new Error("Invalid 'bjs-component' type.");

        this.#componentName = componentParts[1];

        if (this.#componentType === "wc") return BareJS.Components.loadWC(this.#componentName, () => {
            this.renderWc();
        });

        if (this.#componentType === "hc") return BareJS.Components.loadHC(this.#componentName, (html) => {
            this.renderHc(html);
        });
    }

    renderWc() {
        // Create Shadow DOM
        const shadowRoot = this.attachShadow({ mode: "open" });

        // Create the component from a Web Component
        const component = BareJS.Components.createWC(this.#componentName);

        // Pass childs to the new component
        component.innerHTML = this.innerHTML;
        this.innerHTML = "";

        // Pass attributes
        Array.from(this.attributes).forEach(attr => {
            if (!attr.name.startsWith("barejs-")) return;
            const name = attr.name.substring(7);
            component.setAttribute(name, attr.value);
        });

        // Add component as child
        shadowRoot.appendChild(component);
    }

    renderHc(html) {
        // Get default innerHTML for slots
        const htmlInner = this.innerHTML;
        this.innerHTML = "";

        // Create shadow root
        const shadowRoot = this.attachShadow({ mode: "open" });

        // Get props
        const props = {};
        Array.from(this.attributes).forEach(attr => {
            if (!attr.name.startsWith("barejs-")) return;
            const name = attr.name.substring(7);
            props[name] = attr.value;
        });

        // Generate ID
        const id = `${this.#componentName}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
        this.setAttribute("id", id);

        // Create parser to load component
        const parser = new DOMParser();
        const component = parser.parseFromString(`<html><head></head><body>${html}</body></html>`, "text/html");
        const scripts = component.querySelectorAll("head > script");

        let getShadowRoot = "";
        let initRoot = this;
        while(true) {
            const root = initRoot.getRootNode();
            if (root instanceof ShadowRoot) {
                getShadowRoot = `.getElementById("${initRoot.id}").shadowRoot${getShadowRoot}`;
                initRoot = root.host;
            } else {
                getShadowRoot = `document.getElementById("${initRoot.id}").shadowRoot${getShadowRoot}`;
                break;
            }
        }

        // Generate script with props
        const propsScript = document.createElement("script");
        propsScript.innerHTML = `{BareJS.Components.current={};BareJS.Components.current.shadowRoot=${getShadowRoot};BareJS.Components.current.props=JSON.parse('${JSON.stringify(props)}');}`;
        shadowRoot.appendChild(propsScript);

        const elements = component.querySelectorAll("body > *");
        elements.forEach(element => {
            // If tag is not script
            if(!(element instanceof HTMLScriptElement)) return shadowRoot.appendChild(element);

            // If tag is script
            const newScript = document.createElement("script");
            newScript.innerHTML = element.innerHTML;
            shadowRoot.appendChild(newScript);
        });

        // Replace slot tags
        shadowRoot.innerHTML = shadowRoot.innerHTML.replaceAll("<slot></slot>", htmlInner);
    }
};

customElements.define("barejs-component", BareJS.Components.Component);