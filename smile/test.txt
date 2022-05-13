const http = require('http');

http.createServer(function (req, res) {
    let { url, headers, method } = req

    if(method === 'GET') {
        res.writeHead(200);
        res.end('hello world');
    }

    res.writeHead(404);
    res.end('Not Found Page!');

}).listen(3000, function(){
    console.log('server on : 3000port')
});
