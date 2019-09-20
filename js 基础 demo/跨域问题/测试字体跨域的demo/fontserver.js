const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
  console.log('request come', request.url)

  const html = fs.readFileSync(request.url.slice(1))
  response.writeHead(200, {
    // 'Content-Type': 'font/woff2'
    'Access-Control-Allow-Origin': '*' // 设置CORS 就可以解决了
  })
  response.end(html)
}).listen(8111)

console.log('server listening on 8111')