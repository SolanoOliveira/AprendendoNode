const http = require('http');
const fs = require("fs")
require("dotenv").config()

const PORT = process.env.PORT || 3333;
const folder =  process.argv[2]

const server = http.createServer((req, res) => {
    fs.readdir(folder,(err,files) =>{
        if(err) console.log(err)
        else {
            console.log(folder)
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            files.forEach(f => res.write(`${f}\n`))
            res.end("Instituto de Computação");
        }
    })
});

server.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);    
});

