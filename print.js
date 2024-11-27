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
        console.log("Printer response:", data);
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

const zplCommands = 
    fieldOrigin(50, 340) + "^CFA20,20" + printText("123456789") +
    fieldOrigin(50, 420) + "^CFA20,20" + printText("123456789") +
    fieldOrigin(350, 420) + "^CFA20,20" + printText("123456789") +
    fieldOrigin(50, 505) + "^CFA20,20" + printText("123456789") +
    fieldOrigin(50, 590) + "^CFA20,20" + printText("123456789") +
    fieldOrigin(350, 590) + "^CFA20,20" + printText("123456789");

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 
    zplCommands +
    end;

print(zpl).then(() => {
    console.log("done");
})