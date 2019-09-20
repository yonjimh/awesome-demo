var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();


// 方法一 全部代理
app.use(proxy('/cc', {
    // 代理跨域目标接口
    target: 'http://127.0.0.1:8888',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    // onProxyRes: function(proxyRes, req, res) {
    //     res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
    //     res.header('Access-Control-Allow-Credentials', 'true');
    // },

    // 修改响应信息中的cookie域名
    // cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
}));

app.use('/', express.static('public'))


// 方法 二修改响应头
// app.use(proxy('/cc', {
//     // 代理跨域目标接口
//     target: 'http://127.0.0.1:8888',
//     changeOrigin: true,

//     // 修改响应头信息，实现跨域并允许带cookie
//     onProxyRes: function(proxyRes, req, res) {
//         res.header('Access-Control-Allow-Origin', 'http://www.domain1.com');
//         res.header('Access-Control-Allow-Credentials', 'true');
//     },

//     修改响应信息中的cookie域名
//     cookieDomainRewrite: 'www.domain1.com'  // 可以为false，表示不修改
// }));

app.listen(3000);
console.log('Proxy server is listen at port 3000...');