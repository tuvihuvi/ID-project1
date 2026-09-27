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
    res.write('<style>body { background-color: rgb(186, 220, 255); }</style>');
    res.write('<h2><a style="text-decoration: underline; color: rgb(255, 0, 132)"  href="/">Avaleht</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/vanasona">Vanasõna</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/minust">Minust</a></h2>');
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
        res.write('<style>body { background-color: rgb(186, 220, 255); }</style>');
        res.write('<h2><a style="text-decoration: underline; color: rgb(255, 0, 132)"  href="/">Avaleht</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/vanasona">Vanasõna</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/minust">Minust</a></h2>');
        res.write(pageBanner);
		res.write('\t<h1>Tänane Eesti vanasõna</h1>\n\t<p>Siin näed hetkel välja loositud vanasõna.</p>\n\t<hr>');
		res.write(pageFoot);

        let pathName = path.join(__dirname, './txt/vanasonad.txt');
        try {
            const data = await fs.readFile(pathName, 'utf-8');
            let vanasonad = data.split(';');
            let randomIndex = Math.floor(Math.random() * vanasonad.length);
            let randomVanasona = vanasonad[randomIndex];
            res.write('<h1 style="font-size: 40px;">' + randomVanasona + '</h1>');

        } catch (err) {
            res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
            return res.end("Tekkis viga vanasõnade faili lugemisel!");
        }
		return res.end();
    }

    else if (currentURL.pathname === '/minust'){
        res.writeHead(200, {"Content-type": "text/html"});
        res.write(pageHead);
        res.write('<style>body { background-color: rgb(186, 220, 255); }</style>');
        res.write('<h2><a style="text-decoration: underline; color: rgb(255, 0, 132)"  href="/">Avaleht</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/vanasona">Vanasõna</a> | <a style="text-decoration: underline; color: rgb(255, 0, 132)" href="/minust">Minust</a></h2>');
        res.write(pageBanner);
        res.write('\t<h1>Minust</h1>\n\t<p style="font-size: 20px;">Siin on natuke infot minust.</p>\n\t<hr>');
        res.write('<h1 style="font-size: 40px;">Minu nimi on Roger Viidalepp. Olen 19 aastane ja õpin Tallinna Ülikoolis. Tulin TLÜ-sse õppima, et arendada oma digi ja programmeerimise oskusi.</h1>');
        res.write('<img src="./PICTURE/Nyancat.gif" alt="Nyan Cat" style="max-width: 400px; border-radius: 8px; margin-top: 15px;">');
        
        res.write(pageFoot);
        return res.end();   
    }

    else if (currentURL.pathname.endsWith('.jpg') || currentURL.pathname.endsWith('.png') || currentURL.pathname.endsWith('.gif')){
        let imagePath = path.join(__dirname, 'PICTURE', path.basename(currentURL.pathname));

        try {
            const data = await fs.readFile(imagePath);
            let contentType = 'image/jpeg';
            if (currentURL.pathname.endsWith('.png')) {
                contentType = 'image/png';
            } else if (currentURL.pathname.endsWith('.gif')) {
                contentType = 'image/gif';
            }
            res.writeHead(200, {"Content-Type": contentType});
            return res.end(data);
        } catch (err) {
            res.writeHead(404, {"Content-Type": "text/plain; charset=utf-8"});
            return res.end("Pildi faili ei leitud!");
        }
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