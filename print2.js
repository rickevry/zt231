let fetch = require("node-fetch");

async function print(command) {

    try {
        const response = await fetch('http://192.168.68.73/pstprnt', {
            method: 'POST',
            headers: {
                'Content-Length': command.length.toString()
            },
            body: command
        });
        const data = await response.text();
    } catch (error) {
        console.error('Error:', error);
    }
}

const start = "^XA";
const type = "^MT1";
const printRate = "^PR3";
const darkness = "^MD15";
const changeFont = "^CF00,40";
const fieldOrigin = (x,y) => (`^FO${x},${y}`);
const printText = (x,y,s) => (`^FO${x},${y}^FD${s}^FS`) 
const printQRCode = (x, y, url) => (`^FO${x},${y}^BQ,2,10^FD${url}^FS`);
const end = "^XZ";

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 

    printText(53,312,"300") + 

    printText(250,400,"380") +
    printText(53,400,"420") +
    printText(53,485,"500") +
    printText(244,570,"540") +

    printText(53,570,"580") +
    printText(53,710,"700") +
    printText(570,710,"2025/1") +

    printQRCode(631, 125, "www.qvalify.se") +

    end;

console.log(zpl);

print(zpl).then(() => {
   console.log("done");
})