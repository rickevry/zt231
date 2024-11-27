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
const changeFont = "^CF00,60";
const fieldOrigin = (x,y) => (`^FO${x},${y}`);
const printText = (s) => (`^FD${s}`) 
const end = "^XZ";

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 
    fieldOrigin(20,20) +
    printText("hej") + 
    end;

print(zpl).then(() => {
    console.log("done");
})