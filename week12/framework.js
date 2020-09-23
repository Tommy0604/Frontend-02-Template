export function createElement(type, attrs, ...children) {
    let element;
    if (typeof type === 'string') {
        element = new ElementWrapper(type);
    } else {
        element = new type();
    }

    for (const name in attrs) {
        element.setAttribute(name, attrs[name]);
    }
    for (const child of children) {
        if (typeof child === 'string') {
            child = new TextNodeWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

export class Component {
    constructor() { }
    mountTo(parent) {
        parent.appendChild(this.root);
    }
    appendChild(child) {
        child.mountTo(this.root);
    }
    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }
}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(this.type);
    }
}

class TextNodeWrapper extends Component {
    constructor(text) {
        this.root = document.createTextNode(text);
    }
}