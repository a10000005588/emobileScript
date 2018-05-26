const Web3 = require('web3');
const ethTx = require('ethereumjs-tx');
const keythereum = require("keythereum");
const io = require('socket.io-client');
const axios = require('axios');
let env = require('./env');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let server = require('http').createServer(app);
 
let apiDriver = require('./route/driver')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// define api router 
let apiRouter = express.Router();

app.use('/api/driver', apiDriver);
app.use('', apiRouter);
    
apiRouter.get('/driver/general', async function (req, res) {
  res.send({ message: 'hello world' });
});

server.listen(env.port, async function () {
    console.log(`App listening on port: ${env.port}`);
    console.log(`API prefix: `);
});

import * as transaction from './action/transaction';
import * as emobile from './action/emobile';

/* contrac abi */
let emobileAbi = require('./abi/Emobile.json');
/* config info */
let config = require('./data/config.js');

/* contract address */
let contractAddress = require('./data/contract');
/* connect to ethereum node */
const ethereumUri = 'http://127.0.0.1:8545';
let web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(ethereumUri));

if(!web3.isConnected()) {
    throw new Error('unable to connect to ethereum node at ' + ethereumUri);
} else {
    console.log('connected successed');
    console.log('connected to ethereum node at ' + ethereumUri);
}

/* 初始化變數 */
let etherUnit = 10 ** 18;

export default web3;
