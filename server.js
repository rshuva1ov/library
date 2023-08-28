const http = require('http');
const fs = require('fs');
const path = require('path');
const HOST = `127.0.0.1`;
const PORT = `3000`;

const html = fs.readFile(path.resolve(__dirname, `index.html`), `utf-8`, err => console.log(err));

http.createServer((req, res) => {
  res.end(html);
}).listen(PORT, HOST, () => console.log(`server started on ${HOST}:${PORT}`));