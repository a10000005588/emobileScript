import web3 from '../test';
import ethTx from 'ethereumjs-tx';
/* action */
import * as transaction from './transaction.js';
/* set the default accounts */
import * as config from '../data/config.js';
/* contract address */
import * as contractAddress from '../data/contract.js';

export function getProfitValue() {
  let block = web3.eth.getBlock("latest");
  let data = '0x';
  // 取前2-10位（共8位數、省略0x)
  let method = web3.sha3('getProfitValue()').slice(2,10);

  // 將 data 轉乘 heximal格式
  data += method;
  let gasPrice = web3.eth.gasPrice;
  // var gasLimit = web3.eth.estimateGas({
  //     to: Baliv,
  //     data: data
  // });
  let gasLimit = 1000000;
  let value_ = 0x0;
  let nounce = web3.eth.getTransactionCount(config.account);
  // 透過我自己的帳戶，用data和Emobile合約做溝通
  let txInfo = {
      // from: config.account,
      nonce: web3.toHex(nounce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emobile,
      // 如果沒有要打ehter, 直接代0x0
      value: value_,
      data: data,
      chainId: 1
  }
  transaction.sendTransaction(txInfo).then(function(txhash) {
    console.log('====userTakeOrder hash====');
    console.log(txhash);
  }).catch(err => {
    console.log("caught: ", err);
  });
}


export function setDriver(_driverName) {
  let block = web3.eth.getBlock("latest");
  let data = '0x';
  // 取前2-10位（共8位數、省略0x)
  let method = web3.sha3('setDriver(string)').slice(2,10);
  let driverName = web3.toHex(_driverName);
  let params = transaction.to64Bytes(driverName.slice(2,));
  // 將 data 轉成 heximal格式
  data += method + params;
  let gasPrice = web3.eth.gasPrice;
  // var gasLimit = web3.eth.estimateGas({
  //     to: Baliv,
  //     data: data
  // });
  let gasLimit = 1000000;
  let value_ = 0x0;
  let nounce = web3.eth.getTransactionCount(config.account);
  const txInfo = {
      // from: config.account,
      nonce: web3.toHex(nounce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddr.Baliv,
      value: value_,
      data: data,
      chainId: 1
  }
  transaction.sendTransaction(txInfo).then(function(txhash) {
    console.log('====setDriver hash====');
    console.log(txhash);
  }).catch(err => {
    console.log("caught: ", err);
  });
}