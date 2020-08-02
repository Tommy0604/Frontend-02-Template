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
<head>
<style>
body div #myImg{
  width:100px;
  background-color: #ff5000;
}
body div img{
  width:30px;
  background-color: #ff1111;
}
</style>
</head>
  <body>
    <div>
      <img id="myImg" />
      <img />
    </div>
  </body>
</html>`);
  });


});

{/* <div>hello world</div>
<html>
<body>
<div>hello</div>
</body>
</html> */}
server.listen(8086);
console.log("8086 OK!");