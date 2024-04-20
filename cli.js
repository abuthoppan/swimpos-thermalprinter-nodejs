const parseArgs = require('minimist')
const thermalPrinter = require('./thermalPrinter.js')

/*const _DATA = {
  "Location": "Pala",
  "To": "Abu Thoppan",
  "RefNo": "123455",
  "DateTime": null,
  "Items": [["2 x Item 1 @ 230", "460"],
  ["5 x Item 2 @ 200", "1000"]],
  "Total": "1460",
  "Discount": "100",
  "GrandTotal": "1360"
}

//example(DATA);

//console.log(Buffer.from(JSON.stringify(DATA)).toString('base64'));

*/
//console.log(process.argv)

var argv = parseArgs(process.argv.slice(2));

//console.log(argv);
const data = Buffer.from(argv?.data, 'base64').toString('ascii');
const json_data = JSON.parse(data);
const printerip = argv?.printerip ?? 'tcp://192.168.192.168';
console.log('data : ', data);
console.log('printerip :', printerip);

thermalPrinter.thermalPrint(json_data, printerip).then(() => {
  console.log("print successfull!")
}).catch((err) => {
  console.error("print error :", err)
})