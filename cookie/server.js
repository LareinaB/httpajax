const http = require('http');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request comes ', request.url);
    const host = request.headers.host;


    if (request.url === '/'){
        const html = fs.readFileSync('test.html', 'utf8');
        if(host === 'a.test.com'){
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'Set-Cookie': 'id=123'
            });
        }
        response.end(html);
    }

}).listen(8888);
console.log('server listening on 8888');