const parseArgs = require('minimist')
const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine, printer } = require('node-thermal-printer')
const fs = require('fs');

const _DATA = {
  'Location': 'Pala',
  'To': 'Abu Thoppan',
  'RefNo': '123455',
  'DateTime': null,
  'Items': [['2 x Item 1 @ 230', '460'],
  ['5 x Item 2 @ 200', '1000']],
  'Total': '1460',
  'Discount': '100',
  'GrandTotal': '1360'
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

  printer.alignCenter();
  await printer.printImage('./logo.png');
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
  let i = 0;
  DATA.Items.forEach(r => {
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

  try {
    await printer.execute();
    console.log('Print success.');
  } catch (error) {
    console.error('Print error:', error);
  }
}

//example(DATA);

//console.log(Buffer.from(JSON.stringify(DATA)).toString('base64'));

//console.log(process.argv)

var argv = parseArgs(process.argv.slice(2));

//console.log(argv);
const data = Buffer.from(argv?.data, 'base64').toString('ascii')
const json_data = JSON.parse(data)
const printerip = argv?.printerip ?? 'tcp://192.168.192.168'
console.log('data : ', data);
console.log('printerip :', printerip);

thermalPrint(json_data, printerip)