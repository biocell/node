var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<p>Please enter your message</p>');
  res.write('<form action="/message" method="POST" enctype="application/x-www-form-urlencoded" >');
  res.write('<textarea name="message" rows="10" cols="40" id="message" placeholder="Message"></textarea><br>');
  res.write('<br><button>submit</button>');
  res.write('</form>');
   if (req.method === 'POST') {
       let body = '';
       req.on('data', chunk => {
           body +=chunk.toString();
       });
       req.on('end', () => {
           fs.appendFileSync('./message.txt', body);
           res.end('true');
       });
   }
   else{
       return 'error';
   }
  
  return res.end();
}).listen(8080);
