# swimpos-thermalprinter-nodejs

## Install packages
`
npm i
`
## Run cli

1. Prepare the data to be printed as JSON object and stringify it

```
Sample JSON Object :

{
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
```

2. Base64 Encode the JSON string

```
eyJMb2NhdGlvbiI6IlBhbGEiLCJUbyI6IkFidSBUaG9wcGFuIiwiUmVmTm8iOiIxMjM0NTUiLCJEYXRlVGltZSI6bnVsbCwiSXRlbXMiOltbIjIgeCBJdGVtIDEgQCAyMzAiLCI0NjAiXSxbIjUgeCBJdGVtIDIgQCAyMDAiLCIxMDAwIl1dLCJUb3RhbCI6IjE0NjAiLCJEaXNjb3VudCI6IjEwMCIsIkdyYW5kVG90YWwiOiIxMzYwIn0=

```
3. Execute the script

`
node cli.js --data <BASE64_ENCODED_JSON_STRING> --printerip tcp://<EPSON_THERMAL_PRINTER_IP_ADDRESS>
`

Example :

`
node cli.js --data eyJMb2NhdGlvbiI6IlBhbGEiLCJUbyI6IkFidSBUaG9wcGFuIiwiUmVmTm8iOiIxMjM0NTUiLCJEYXRlVGltZSI6bnVsbCwiSXRlbXMiOltbIjIgeCBJdGVtIDEgQCAyMzAiLCI0NjAiXSxbIjUgeCBJdGVtIDIgQCAyMDAiLCIxMDAwIl1dLCJUb3RhbCI6IjE0NjAiLCJEaXNjb3VudCI6IjEwMCIsIkdyYW5kVG90YWwiOiIxMzYwIn0= --printerip tcp://192.168.192.168
`

## Run cli
1. `node run server.js`
2. `POST localhost:3000/print`

Request Body :

`{
  "data":{
  "Location": "Thodupuzha",
  "To": "Adam Thoppan",
  "RefNo": "99999",
  "DateTime": null,
  "Items": [["2 x Item 1 @ 230", "460"],
  ["5 x Item 2 @ 200", "1000"]],
  "Total": "1460",
  "Discount": "100",
  "GrandTotal": "1360"
},
"printer_ip":"tcp://192.168.192.168"
}`

Please note that the printerip parameter is optional. If not provided it will connect to `tcp://192.168.192.168` by default.

