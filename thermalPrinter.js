const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer')
const fs = require('fs');
const net = require('net');

const DEFAULT_COMPANY_NAME = "Thoppans' Swimming Centre\nYMCA complex, Thodupuzha";

function printCompanyName(printer, companyName) {
    const name = typeof companyName === 'string' && companyName.trim()
        ? companyName
        : DEFAULT_COMPANY_NAME;
    const [primaryLine, ...secondaryLines] = name.split(/\r?\n/);

    printer.alignCenter();
    printer.bold(true);
    printer.setTextDoubleHeight();
    printer.println(primaryLine.trim());
    printer.setTextNormal();

    secondaryLines.forEach((line) => {
        if (line.trim()) printer.println(line.trim());
    });

    printer.bold(false);
}

// node-thermal-printer 4.4.1 sends network data but does not resolve its
// Promise unless the printer sends a response.  Receipt printers normally do
// not send one for a print job, which leaves the HTTP request open forever.
// Resolve after Node has handed the complete buffer to the printer socket.
function sendNetworkPrint(printer) {
    const { host, port, timeout } = printer.Interface;
    const buffer = printer.getBuffer();

    return new Promise((resolve, reject) => {
        let settled = false;

        const complete = (error, result) => {
            if (settled) return;
            settled = true;
            if (error) reject(error);
            else resolve(result);
        };

        const networkConnection = net.createConnection({ host, port, timeout });

        networkConnection.once('connect', () => {
            networkConnection.write(buffer, (error) => {
                if (error) {
                    networkConnection.destroy();
                    complete(error);
                    return;
                }

                console.log(`Data sent to printer: ${host}:${port}`, buffer);
                networkConnection.end();
                complete(null, 'Data sent to printer');
            });
        });

        networkConnection.once('error', (error) => {
            networkConnection.destroy();
            complete(error);
        });

        networkConnection.once('timeout', () => {
            networkConnection.destroy();
            complete(new Error('Socket timeout'));
        });
    });
}

async function thermalPrint(DATA, PRINTER_IP) {
    const printer = new ThermalPrinter({
        type: PrinterTypes.EPSON, // 'star' or 'epson'
        interface: PRINTER_IP,//process.argv[2],
        options: {
            timeout: 1000,
        },
        width: 48, // Number of characters in one line - default: 48
        characterSet: CharacterSet.ISO8859_2_LATIN2, // Character set - default: SLOVENIA
        breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
        removeSpecialCharacters: false, // Removes special characters - default: false
        lineCharacter: '-', // Use custom character for drawing lines - default: -
    });

    const isConnected = await printer.isPrinterConnected();
    console.log('Printer connected:', isConnected);

    printCompanyName(printer, DATA.CompanyName);
    printer.setTextNormal();
    printer.bold(true);
    if (DATA.Location)
        printer.println(DATA.Location);
    printer.bold(false);

    printer.alignLeft();
    printer.newLine();
    if (DATA.To)
        printer.println(`To : ${DATA.To}`);
    if (DATA.RefNo)
        printer.println(`Ref No : #${DATA.RefNo}`);
    if (DATA.DateTime)
        printer.println(`Date & Time : ${DATA.DateTime} `);
    else
        printer.println(`Date & Time : ${new Date().toLocaleString()} `);
    printer.newLine();

    printer.drawLine();
    printer.bold(true);
    printer.tableCustom([
        { text: '#', align: 'LEFT', cols: 8 },
        { text: 'Item', align: 'LEFT', cols: 32 },
        { text: 'Amount', align: 'LEFT', cols: 8 }
    ]);
    printer.bold(false);
    printer.drawLine();
    // A receipt may legitimately have no line items. Keep the existing output
    // for valid arrays and render the receipt without item rows otherwise.
    const items = Array.isArray(DATA.Items) ? DATA.Items : [];
    let i = 0;
    items.forEach(r => {
        printer.tableCustom([
            { text: `${++i}`, align: 'LEFT', cols: 8 },
            { text: `${r[0]}`, align: 'LEFT', cols: 32 },
            { text: `${r[1]}`, align: 'LEFT', cols: 8 }
        ]);
        printer.drawLine();
    });
    printer.newLine();
    printer.bold(true);
    printer.println(`Total : ${DATA.Total}`);
    printer.println(`Discount : -${DATA.Discount}`);
    printer.setTextDoubleHeight();
    printer.println(`Grand Total : ${DATA.GrandTotal}`);
    printer.bold(false);
    printer.setTextNormal();

    printer.cut();

    const printText = printer.getText().replace(/[\x1D\x1BE\x10\x00-\x07]/g, "").split("\n").splice(2).join("\n").replace("!ddV@", "\n\n").replace("!Grand", "Grand");
    console.log(printText);


    fs.appendFile('log.txt', printText, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    // Network printers need the explicit send above; the dependency's network
    // execute() Promise never settles for normal print jobs. Keep the library
    // path for non-network interfaces (for example file or OS printers).
    if (printer.Interface && printer.Interface.host) {
        return sendNetworkPrint(printer);
    }

    return printer.execute();

}

module.exports = { thermalPrint }
