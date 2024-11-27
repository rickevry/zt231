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
const end = "^XZ";

let zpl = 
    start + 
    type + 
    printRate + 
    darkness +
    changeFont + 

    printText(20,20,"20") + 
    printText(20,60,"60") + 
    printText(20,100,"100") + 
    printText(20,140,"140") + 
    printText(20,180,"180") + 
    printText(20,220,"220") + 
    printText(20,260,"260") + 
    printText(20,300,"300") + 

    printText(20,340,"340") +
    printText(20,380,"380") +
    printText(20,420,"420") +
    printText(20,460,"460") +
    printText(20,500,"500") +
    printText(20,540,"540") +

    printText(20,580,"580") +
    printText(20,620,"620") +
    printText(20,660,"660") +
    printText(20,700,"700") +

    end;

console.log(zpl);

print(zpl).then(() => {
   console.log("done");
})