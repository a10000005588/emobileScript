import web3 from '../test';
const ethTx = require('ethereumjs-tx');
let config = require('../data/config.js');
let privateKey = Buffer.from(config.myPrivateKey, 'hex');

export function sendTransaction(txn) {
  return new Promise(function(resolve, reject){
      let tx = new ethTx(txn);
      tx.sign(privateKey);
      let serializedTx = tx.serialize().toString('hex');
      let rawTxn = '0x'+ serializedTx;
      let txHash = web3.eth.sendRawTransaction(rawTxn, function (err, hash) {
          if (err) {
              console.log(err);
              console.log('sendTransaction error occured');
          } else {
              resolve(hash);
          }
      });
  });
}

export function getTransactionReceipt(hash) {
    return new Promise(function(resolve, reject){
        try {
            setTimeout(function() {
                let receipt = web3.eth.getTransactionReceipt(hash);
                if(receipt.logs.length != 0) {
                    console.log('====getTransactionReceipt txn====');
                    resolve(true);
                }else {
                    reject(false);
                }
            },config.transactionTimeInterval);
        }
        catch(err) {
            console.log('approve transactoin has not been packed yet, do getTransaction tx again...');
            setTimeout(function() {
                getTransactionReceipt(hash);
            },config.transactionTimeInterval);
        }
    });
}

export function to64Bytes(data) {
    let zero = '';
    for(var i=0; i< (64- data.length); i++) {
        zero += '0';
    } 
    return zero + data;
}

export function toArrayHex(array) {
    let result = '';
    result += '00000000000000000000000000000000000000000000000000000000000000a0';
    result += to64(web3.toHex(array.length).slice(2,));

    for(var index in array) { 
        let value = array[index]; 
        result += to64(web3.toHex(value).slice(2,));
    }
    return result;
}
