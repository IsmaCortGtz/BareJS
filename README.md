# BareJS

`BareJS` is a lightweight Vanilla JS framework. It allows the use of Web Components, importing HTML as a component, SPA routing, and using Signals for simple reactivity.

This framework isn't created to be a real alternative in web development. It was created solely with the purpose of learning how frameworks works internally and testing some ideas about features that could be interesting.

## Table of Content 📕

1. [Documentation](#documentation)
    - [Components](#components)
    - [Routing](#routing)
    - [Signals](#signals) 
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)

## Documentation

This framework is divided into 3 main modules.

### Components

This module allows users to load components from a specific route. It provides a Web component `<x-component></x-component>` where you can specify either a Web Component or an HTML component to be loaded.

Here is an example of a Web Component (_without reactivity_).

```js
// file NavBar.js
class NavBar extends HTMLElement {
    #title;

    constructor() {
        super();
        this.#title = this.getAttribute("title");
    }

    connectedCallback() {
      this.innerHTML = `
        <nav>
            <h1>${this.title}</h1>
        </nav>`;
    }
}
```

And here is an example of an HTML Component.

```html
<!-- Coming soon -->
```

To use it, simply place the file in your components folder and reference it in your HTML like this:

```html
<barejs-component bjs-component="wc:NavBar" barejs-title="Passing a parameter"></barejs-component>
<barejs-component bjs-component="hc:icons/eye"></barejs-component>
```

In the `bjs-component` parameter, you need to specify the type. You can use `wc` for a Web Component (JS) or `hc` for an HTML Component. The framework will automatically load the file and insert it into the `barejs-component`.

Additionally, you can pass parameters to the Web Component using the `barejs-*` prefix. The component will receive the parameter without the prefix. Parameters are not yet available for HTML Components.

### Routing

The routing module works in a very similar way. It provides you with 2 Web Components and some JS objects to interact with.

You have the `<barejs-route></barejs-route>` component, where you can specify the content. You will specify the route using the `bjs-route` parameter. This component has 2 working modes.

The first mode is used when you don't have the components module installed. In this case, the content inside the component will be hidden using a simple CSS `display` property, and an event will be triggered.

When you have the components module installed, you can use the `bjs-page` parameter to load a component from the page's route. In this mode, the components will only be in the DOM when the route is active. If you leave the page, the component will be removed.

You can use either Web Components or HTML components.

```html
<barejs-route bjs-route="/" bjs-page="wc:Home"></barejs-route>

<barejs-route bjs-route="/details">
    Details page
</barejs-route>
```

### Signals

Coming soon..

## Installation

Add the script tag at the end of your head tag:
```html
<script src="https://cdn.jsdelivr.net/gh/IsmaCortGtz/BareJS/"></script>
```

## Usage

```js
console.log("hello world!");
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update examples and documentation as appropriate.

## License

[GPLv3](https://www.gnu.org/licenses/gpl-3.0.html#license-text)