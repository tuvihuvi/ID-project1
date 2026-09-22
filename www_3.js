const http = require('http');
const url = require('url');

const path = require('path');
//const fs = require('fs');
const fs = require('fs').promises;
const dateTimeET = require('./src/dateTimeET.js');

const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Roger Viidalepp, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBanner = '<img src="veebiprogrammeerimine_2026_ID.png" alt="Veebiprogrammeerimine bänner">\n';
const pageBody = '\t<h1>Roger Viidalepp, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimise kursusel <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> ning ei sislda tõsiseltvõetavat sisu!</p>';
const pageFoot = '\n</body>\n</html>';


http.createServer(async function(req, res){
    //vaatan URL-i
    console.log('PÄRING: ' +req.url);
    //parsin URL-i
    let currentURL = url.parse(req.url, true);
    console.log('Parsituna: ' + currentURL.pathname);
    //console.log('parsituna: ' + currentURL.port);

    if(currentURL.pathname === '/'){
    res.writeHead(200, {"Content-Type": "text/html"});
    //res.write('Veebiserver töötab!');
    res.write(pageHead);
    res.write(pageBanner);
    res.write(pageBody);
    res.write('\n\t<p>Täna on ' + dateTimeET.day() + ', ' + dateTimeET.date() + ' ja kell on ' + dateTimeET.time() + '.</p>\n\t<hr>');
    res.write(pageFoot);
    return res.end("<h1>Node.js server töötab!</h1>");
    }

    else if (currentURL.pathname === '/vanasona'){
        res.writeHead(200, {"Content-type": "text/html"});
		//res.write('Veebiserver käivitus!');
		res.write(pageHead);
        res.write(pageBanner);
		res.write('\t<h1>Tänane Eesti vanasõna</h1>\n\t<p>Siin näed tänaseks päevaks loositud vanasõna.</p>\n\t<hr>');
		res.write(pageFoot);
		return res.end();
    }

        else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
        //liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
        let bannerPath = path.join(__dirname, 'PICTURE', currentURL.pathname);
        try {
            const data = await fs.readFile(bannerPath);
            res.writeHead(200, {"Content-Type": "image/png"});
            return res.end(data);
        } catch (err) {
            res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
            return res.end("Pilti ei leitud!");
        }
    }

    /* else if (currentURL.pathname === '/veebiprogrammeerimine_2026_ID.png'){
        //liidame kättesaamatu päris kataloog jms virtuaalseks failiteeks
        let bannerPath = path.join(__dirname, 'PICTURE', currentURL.pathname);
        fs.readFile(bannerPath, function(err, data){
            if(err){
                throw err;
            } else {
                res.writeHead(200, {"Content-Type": "image/png"});
                return res.end(data);
            }
        }); 
    } */

    else {
        return res.end('404 - Lehte ei leitud!');
    }
}).listen(5216);