const http = require('http');
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../index.html');
http.createServer((req, res) => {
  const resume=req.url?.startsWith('/Ashlesh_Gavas_Resume.pdf');
  res.setHeader('Content-Type', resume?'application/pdf':'text/html; charset=utf-8');
  fs.createReadStream(resume?path.resolve(__dirname,'../Ashlesh_Gavas_Resume.pdf'):file).pipe(res);
}).listen(5179, '127.0.0.1', () => console.log('Preview ready at http://127.0.0.1:5179'));
