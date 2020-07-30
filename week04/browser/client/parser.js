let currentToken = null;

function emit(token) {
    console.log(token);
}

const EOF = Symbol("EOF");

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) {
        emit({ type: "EOF" });
        return;
    } else {
        emit({ type: "text", content: c });
        return data;
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen; // </ 结束标签
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        };
        return tagName(c);
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        };
        return tagName(c);
    } else if (c == ">") {
        // error
    } else if (c == EOF) {
        // error
    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == "EOF") {
        // error
    } else {
        // error
    }
}

// 利用FSM来分析HTML
function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}

module.exports = {
    parseHTML
}