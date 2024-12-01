let fetch = require("node-fetch");

async function print(command) {

    try {
        const response = await fetch('http://10.10.1.229/pstprnt', {
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
const printQRCode = (x, y, url) => (`^FO${x},${y}^BQ,2,7^FD${url}^FS`);
const end = "^XZ";

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 

    printText(70,320,"320") + 

    printText(260,406,"406") +
    printText(70,406,"406") +
    printText(70,488,"488") +

    printText(260,574,"574") +
    printText(260,618,"AAA") +

    printText(70,574,"574") +
    
    //printText(53,710,"710") +
    
    printText(640,686,"2025 / 01") +

    printQRCode(594, 96, "http://www.qvalify.se/id=abced24353&ejhfjewhrewr") +

    end;

console.log(zpl);

print(zpl).then(() => {
   console.log("done");
})