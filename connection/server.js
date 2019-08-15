const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request comes ', request.url);
    const host = request.headers.host;

    const html = fs.readFileSync('test.html', 'utf8');
    const img = fs.readFileSync('loading.png');

    if(request.url === '/'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'connection': 'close'
        });
        response.end(html);
    } else {
        response.writeHead(200, {
            'Content-Type': 'image/png',
            'connection': 'close'
        });
        response.end(img);
    }

}).listen(8888);
console.log('server listening on 8888');