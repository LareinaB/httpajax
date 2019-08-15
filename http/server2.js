const http = require('http');
http.createServer(function (request, response) {
    console.log('request comes ', request.url);
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'X-Test-Cors',
        'Access-Control-Max-Age': '1000'
    });
    response.end('123');
}).listen(8887);

console.log('server listening on 8887');