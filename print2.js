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
const printQRCode = (x, y, url) => (`^FO${x},${y}^BQN,2,7,M,7^FDQA,${url}^FS`);
const end = "^XZ";

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 

    printText(70,322,"Q2024041") + 

    printText(260,408,"R03113412") +
    printText(70,408,"HNE023-12") +
    printText(70,490,"Norra hallen") +


    printText(260,576,"3.500 KG") +
    printText(70,576,"G034") +
    
    printText(260,620,"5 Pers") +

    //printText(53,710,"710") +
    
    printText(640,686,"2025 / 01") +

    //printQRCode(594, 96, "http://www.qvalify.se/id=abced24353&ejhfjewhrewr") +
    printQRCode(606, 115, "http://www.qvalify.se/id=abced24353&ejhfjewhrewr") +

    end;

console.log(zpl);

print(zpl).then(() => {
   console.log("done");
})