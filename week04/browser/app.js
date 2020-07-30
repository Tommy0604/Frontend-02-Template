const http = require('http');

const server = http.createServer((req, res) => {
  let body = [];
  req.on('error', err => {
    console.log("error:", err);
  }).on('data', chunk => {
    body.push(chunk.toString());
  }).on('end', () => {
    // const arr = new Uint8Array(body);
    // body = Buffer.concat(arr).toString();
    // body = body.join("");
    res.setHeader('Content-type', 'text/html')
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-type': 'text/plain' });
    // res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(
`<html maaa=a >
<body>
  <div>hello</div>
    </body>
</html>`);
  });


});

server.listen(8086);
console.log("8086 OK!");