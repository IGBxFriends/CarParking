const express = require('express');

const app = express();
app.use(express.json())

const routerClient = require('./src/routers/controllerClient');
const routerCarPark = require('./src/routers/controllerCarPark')
const routerBranch = require('./src/routers/controllerBranch');

app.use('/Client', routerClient );
app.use('/carpark', routerCarPark );
app.use('/branch', routerBranch );

module.exports = app;