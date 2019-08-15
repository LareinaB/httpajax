const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request comes ', request.url);

    if(request.url === '/'){
        response.writeHead(302, {
            // 不写host跟端口，默认情况下就是同域
            'Location': '/new',
        });
        response.end('');
    }

    if(request.url === '/new'){
        response.writeHead(302, {
            'Content-Type': 'text/html',
        });
        response.end('<div>this is content</div>');
    }

}).listen(8888);
console.log('server listening on 8888');