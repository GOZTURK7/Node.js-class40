/**
 * Exercise 3: Create an HTTP web server
 */

 const http = require('http');
 const fs = require('fs');
 
 //create a server
 const server = http.createServer(function (req, res) {
   // YOUR CODE GOES IN HERE
	 
	 if(req.url==='/'){
		 
		 fs.readFile(
			'./index.html', 
			(err, data) => {
				if(err) throw err;
				res.writeHead(200, {'content-type': 'text/html'});
				res.end(data);
				return

		 })
		}else if(req.url==='/index.js'){
			fs.readFile(
				'./index.js', 
				(err, data) => {
					if(err) throw err;
					res.writeHead(200, {'content-type': 'application/json'});
					res.end(data)
					return
			})
		}else if(req.url === '/style.css'){
			fs.readFile('./style.css', (err, data) => {
				res.writeHead(200, {'content-type': 'text/css'});
				res.end(data);
				return
			})
		}
	
	});
 
	 // and after use it 
	 // res.write('./index.html' ); // Sends a response back to the client
	 // res.end(); // Ends the response

 
 server.listen(3000); // The server starts to listen on port 3000
 