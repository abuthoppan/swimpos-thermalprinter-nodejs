const express = require('express');
const app = express();
const port = 3000;
const thermalPrinter = require('./thermalPrinter.js')
const bodyParser = require('body-parser');
const cors = require('cors');

// Allow all origins + Private Network Access
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Required for Chrome's Private Network Access (localhost requests)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  next();
});

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
  res.sendStatus(204);
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/print', async (req, res) => {
    try {
        const { data, printer_ip } = req.body;
        console.log({ data, printer_ip });
        await thermalPrinter.thermalPrint(data, printer_ip);
        console.log('Print success.');
        res.json({ message: 'Receipt printed successfully' });
    } catch (error) {
        console.error('Print error:', error);
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
