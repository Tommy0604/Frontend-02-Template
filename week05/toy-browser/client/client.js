const net = require('net');
const images = require('images');
const parser = require('./parser');

class Request {
  constructor(options) {
    this.method = options.method || "GET";
    this.host = options.host;
    this.port = options.port || '8080';
    this.path = options.path || '/';
    this.body = options.body || {};
    this.headers = options.headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json")
      this.bodyText = JSON.stringify(this.body);
    else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded")
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
    this.headers["Content-Length"] = this.bodyText.length;

  }

  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        // 创建TCP连接
        connection = net.createConnection({
          host: this.host,
          port: this.port
        }, () => {
          console.log(this.toString());
          connection.write(this.toString());
        })
      }

      connection.on('data', data => {
        console.log(data.toString());
        parser.receive(data.toString());
        if (parser.isFinished) {
          resolve(parser.response);
          connection.end();
        }
      })
      connection.on('error', err => {
        reject(err);
        connection.end();
      })
    }).catch(e => {
      console.log(e);
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
  }
}

class TrunckedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;

    this.length = 0;
    this.content = [];
    this.isFinished = false;
    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        this.isFinished = this.length === 0
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      this.content.push(char);
      this.length--;
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }

  }
}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }
  get response() {
    this.statusLine.match(/Http\/1.1 ([0-9]+) ([\s\S]+)/);
    const data = {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
    return data;
  }

  receive(str) {
    for (let i = 0; i < str.length; i++) {
      this.receiveChat(str.charAt(i));
    }
  }

  receiveChat(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END;
        if (this.headers['Transfer-Encoding'] === 'chunked')
          this.bodyParser = new TrunckedBodyParser();
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      // console.log(char);
      this.bodyParser.receiveChar(char);
    }

  }
}

// 在 viewport 上绘制 element
function render(viewport, element) {
  const rgbRegExp = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;

  if (element.style) {
    const img = images(element.style.width, element.style.height);
    if (element.style['background-color']) {
      const color = element.style['background-color'] || 'rgb(0,0,0)';
      const result = color.match(rgbRegExp);
      if (result.length > 0) {
        let [r, g, b] = result.slice(1);
        img.fill(Number(r), Number(g), Number(b));
        viewport.draw(img, element.style.left || 0, element.style.top || 0);
      }
    }
  }

  if (element.children) {
    for (const child of element.children) {
      render(viewport, child);
    }
  }
}


void async function () {
  let req = new Request({
    method: "POST",
    host: "127.0.0.1",
    port: "8086",
    path: "/",
    headers: {
      ["X-Foo2"]: "customed"
    },
    body: {
      name: "qizhen"
    }
  });
  let res = await req.send();

  let dom = parser.parseHTML(res.body);

  let viewport = images(800, 600); // 创建一个视口

  const body = dom.children[0].children[3];
  const container = body.children[1];
  const myId = container.children[1];
  const c1 = container.children[3];

  render(viewport, dom);
  viewport.save('viewport.jpg');
  // console.log(JSON.stringify(dom, null, "   "));
}();