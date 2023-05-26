const http = require('http');
const fs = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  const folder = process.argv[2];
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write("<html><body><ul>");
      files.forEach(f => {
        const path = folder + "/" + f;
        const stats = fs.statSync(path);
        const isDirectory = stats.isDirectory();
        const listItem = isDirectory ? `<li><strong>${f}</strong></li>` : `<li>${f}</li>`;
        res.write(listItem);
      });
      res.end("</ul></body></html>");
    }
  });
});

server.listen(PORT, () => {
  console.log("Rodando na porta " + PORT);
});
