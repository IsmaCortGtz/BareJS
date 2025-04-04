BareJS.Components.newWC("CustomImage", class CustomImage extends HTMLElement {
    #name;
    
    constructor() {
        super();
    }

    connectedCallback() {
        this.#name = this.getAttribute("name");
        this.attachShadow({ mode: "open" }).innerHTML = `
            <p>Hola <slot>desconocido</slot> y ${this.#name}.</p>
            <style>
                p {
                    background-color: #222222;
                    color: #dedede;
                }
            <style>
        `;
    }
});