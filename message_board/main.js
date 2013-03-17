var http = require('http');
var port = process.env.port || 1337;
var server = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n'); 
});

server.listen(port, function() { console.log('Server is running at %s:%s ',
server.address().address, server.address().port);
});
