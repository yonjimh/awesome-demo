const http = require('http')
const urlLib = require('url'); //处理url相关

console.log(process.argv); // 可以用这个来获取命令行参数


http.createServer((req, res) => {
    var urlObj = urlLib.parse(req.url, true);

    //POST
    var str = '';
    var postData = '';
    // body的数据分段到达
    req.on('data', function (data) {
        str += data;
    });
    // 数据已经接受完
    req.on('end', function () {
        console.log(str)
        // postData = querystring.parse(str);
    });

    // console.log(req)
    // res.setHeader('Access-Control-Allow-Origin', '*')
    // res.setHeader('Access-Control-Allow-Origin', req.headers['origin'])
    res.writeHead(200, {
        // 'Access-Control-Allow-Headers': 'content-type,cookies',
        // 'Access-Control-Allow-Headers': 'content-type',
        // 'Access-Control-Allow-Methods': 'PUT',
        // // // 'Access-Control-Allow-Credentials': false,
        // 'Access-Control-Allow-Credentials': true,
        // 'Access-Control-Max-Age': 120
        // "X-Content-Type-Options": 'nosniff',
        // "X-Frame-Options": 'DENY',
        // "X-XSS-Protection": "1; mode=block"，
    //    'Set-Cookie': ['pageAccess=3; max-age=11111']
    })
    res.end('{"a":111}')

}).listen('8888')

console.log('127.0.0.1:8888')