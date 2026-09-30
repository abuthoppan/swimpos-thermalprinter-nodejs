const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const thermalPrinter = require('./thermalPrinter.js')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/print', async (req, res) => {
    try {
        const { data, printer_ip } = req.body;
        console.log({ data, printer_ip });

        await thermalPrinter.thermalPrint(data, printer_ip);
        console.log('Print success.');
        res.status(200).json({ message: 'Receipt printed successfully' });
    } catch (error) {
        console.error('Print error:', error);
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})