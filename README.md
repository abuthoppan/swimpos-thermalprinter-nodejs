# swimpos-thermalprinter-nodejs

## Install packages
`
npm i
`
## Run

1. Prepare the data to be printed as JSON object and stringify it

```
Sample JSON Object :

{
  'Headline': "Thoppans' Swimming Centre\nYMCA complex, Thodupuzha",
  'To': 'Abu Thoppan',
  'RefNo': '123455',
  'DateTime': null,
  'Items': [['2 x Item 1 @ 230', '460'],
  ['5 x Item 2 @ 200', '1000']],
  'Total': '1460',
  'Discount': '100',
  'GrandTotal': '1360'
}
```

2. Base64 Encode the JSON string

Use the Base64 encoding of the JSON object you prepared in step 1.
3. Execute the script

`
node cli.js --data <BASE64_ENCODED_JSON_STRING> --printerip tcp://<EPSON_THERMAL_PRINTER_IP_ADDRESS>
`

Example :

`
node cli.js --data eyJIZWFkbGluZSI6IlRob3BwYW5zJyBTd2ltbWluZyBDZW50cmVcbllNQ0EgY29tcGxleCwgVGhvZHVwdXpoYSIsIlRvIjoiQWJ1IFRob3BwYW4iLCJSZWZObyI6IjEyMzQ1NSIsIkRhdGVUaW1lIjpudWxsLCJJdGVtcyI6W1siMiB4IEl0ZW0gMSBAIDIzMCIsIjQ2MCJdLFsiNSB4IEl0ZW0gMiBAIDIwMCIsIjEwMDAiXV0sIlRvdGFsIjoiMTQ2MCIsIkRpc2NvdW50IjoiMTAwIiwiR3JhbmRUb3RhbCI6IjEzNjAifQ== --printerip tcp://192.168.192.168
`

Please not that the printerip parameter is optional. If not provided it will connect to `tcp://192.168.192.168` by default.

