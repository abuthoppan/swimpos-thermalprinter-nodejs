const Service = require('node-windows').Service;

const svc = new Service({
  name: 'SwimPos',
  description: 'SwimPos app running as a Windows service',
  script: 'C:\\Users\\abuth\\swimpos-thermalprinter-nodejs\\server.js', // Replace with your app's path
});

svc.on('install', () => {
  svc.start();
});

svc.install();
