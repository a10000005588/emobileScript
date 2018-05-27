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
  //     to: ,
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

export function setEmotoInfomation(_emotoAddress, _plate, _driverName, _driverAddress) {
  
  let block = web3.eth.getBlock("latest");
  let data = '0x';
  // 取前2-10位（共8位數、省略0x)
  let method = web3.sha3('setEmotoInfomation(address,bytes32,bytes32,address)').slice(2,10);
  
  let emotoAddress = _emotoAddress;
  let plate = web3.toHex(_plate);
  let driverName = web3.toHex(_driverName);
  let driverAddress = _driverAddress;

  let params =  transaction.to64Bytes(emotoAddress.slice(2,)) +
                transaction.to64Bytes(plate.slice(2,)) +
				transaction.to64Bytes(driverName.slice(2,)) +
                transaction.to64Bytes(driverAddress.slice(2,));
  console.log(params);
  
  

  // 將 data 轉成 heximal格式
  data += method + params;

  let gasPrice = web3.eth.gasPrice;
  let gasLimit = 1000000;
  let value_ = 0x0;
  let nonce = web3.eth.getTransactionCount(config.account);

  // if gave the wrong address for to... no error pop on the terminal........
  let txInfo = {
      // from: config.account,
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emobile,
      value: '0x00',
      data: data,
      chainId: 1
  }
  console.log(txInfo);

  transaction.sendTransaction(txInfo).then(function(txhash) {
    console.log('====setEmoto hash====');
    console.log(txhash);
  }).catch(err => {
    console.log("caught: ", err);
  });
}