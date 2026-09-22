const http = require('http');
const dateTimeET = require('./src/dateTimeET.js');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Roger Viidalepp, veevbiprogrammeerimine</title>\n</head>\n<body>\n';

const pageBody = '\t<h1>Roger Viidalepp, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>\n\t<p>Täna on ' + dateTimeET.day() + ', ' + dateTimeET.date() + ' ja kell on ' + dateTimeET.time() + '.</p>\n\t<hr>';

const pageFoot = '\n</body>\n</html>';


http.createServer(function(req, res){
    res.writeHead(200, {"Content-Type": "text/html"});
    //res.write('Veebiserver töötab!');
    res.write(pageHead);
    res.write(pageBody);
    res.write('\t<p>Täna on ' + dateTimeET.day() + ', ' + dateTimeET.date(1) + ' ja kell on ' + dateTimeET.time() + '.</p>\n');
    res.write(pageFoot);
    return res.end("<h1>Node.js server töötab!</h1>");
}).listen(5216);