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
    // res.setHeader('Content-type', 'text/html')
    // res.writeHead(200, { 'Content-type': 'text/plain' });
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(
      `<html maaa=a >
<head>
<style>
#container {
  width: 500px;
  height: 300px;
  display: flex;
  background-color: rgb(255, 255, 255);
}
#container #myId {
  width: 200px;
  height: 100px;
  background-color: rgb(255, 0, 0);
}
#container .c1 {
  flex: 1;
  background-color: rgb(0, 255, 0);
}
</style>
</head>
<body>
  <div id="container">
    <div id="myId"></div>
    <div class="c1"></div>
  </div>
</body>
</html>`);
  });


});

server.listen(8086);
console.log("8086 OK!");