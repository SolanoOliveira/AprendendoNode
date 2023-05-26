import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import { createLink } from './util.js';

dotenv.config();

const PORT = process.env.PORT || 3333;

const server = http.createServer((req, res) => {
  const folder = process.argv[2];
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.write('<ul>');
      files.forEach((f) => {
        const path = `${folder}/${f}`;
        const stats = fs.statSync(path);
        const isDirectory = stats.isDirectory();
        const listItem = isDirectory
          ? `<li><strong>${createLink(f)}</strong></li>`
          : `<li>${createLink(f)}</li>`;
        res.write(listItem);
      });
      res.end('</ul>');
    }
  });
});

server.listen(PORT, () => {
  console.log('Rodando na porta ' + PORT);
});
