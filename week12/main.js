for (let i of [1, 2, 3]) {
    console.log(i);
}

function createElement(type, attributes, ...childen) {
    let element;
    if (typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;
    for (const attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    for (const child of children) {
        if (typeof child === "string")
            child = new TextWrapper(child);
        element.appendChild(child)
    }
    return element;
}

export class Component {
    constructor() {
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        child.mountTo(this.root)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class TextWrapper extends Component {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

}

class ElementWrapper extends Component {
    constructor(type) {
        this.root = document.createElement(type);
    }
}

let a = <div id="a">
    <span>a</span>
    <span>b</span>
    <span>c</span>
</div>

document.body.appendChild(a);