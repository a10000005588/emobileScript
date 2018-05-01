const Web3 = require('web3');
const ethTx = require('ethereumjs-tx');
const keythereum = require("keythereum");
const io = require('socket.io-client');
const axios = require('axios');

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
}else {
    console.log('connected successed');
    console.log('connected to ethereum node at ' + ethereumUri);
}

/* 初始化變數 */
let etherUnit = 10 ** 18;

/* 測試區 */
setTimeout(function(){
    // Call emobile contract's getProfitValue() ...
    var emobileContract = web3.eth.contract(emobileAbi.abi).at(contractAddress.Emobile);
    var result = emobileContract.getProfitValue();
    console.log(result);
},1000);

export default web3;
