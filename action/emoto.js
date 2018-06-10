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
      chainId: "0x4",
      from: config.account,
      nonce: web3.toHex(nounce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emobile,
      // 如果沒有要打ehter, 直接代0x0
      value: value_,
      data: data,
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
      chainId: "0x4",
      from: config.account,
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emoto,
      value: '0x00',
      data: data,
  }
  console.log(txInfo);

  transaction.sendTransaction(txInfo).then(function(txhash) {
    console.log('====setEmoto hash====');
    console.log(txhash);
  }).catch(err => {
    console.log("caught: ", err);
  });
}

export function getMobileInformation(_emotoAddress) {
  
  let block = web3.eth.getBlock("latest");
  let data = '0x';
  // 取前2-10位（共8位數、省略0x)
  let method = web3.sha3('getMobileInformation(address)').slice(2,10);
  
  let emotoAddress = _emotoAddress;
  
  let params =  transaction.to64Bytes(emotoAddress.slice(2,));
  console.log(params);
  
  // 將 data 轉成 heximal格式
  data += method + params;

  let gasPrice = web3.eth.gasPrice;
  let gasLimit = 1000000;
  let value_ = 0x0;
  let nonce = web3.eth.getTransactionCount(config.account);

  // if gave the wrong address for to... no error pop on the terminal........
  let txInfo = {
      chainId: "0x4",
      from: config.account,
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emoto,
      value: '0x00',
      data: data,
  }
  console.log(txInfo);
  
  
  var result = web3.eth.call(txInfo);
  
  //切掉前面0x
  var raw_data = result.slice(2);
  
  //plate
  var data_plate = raw_data.slice(0,64);
  
  //driverName
  var data_name = raw_data.slice(64,128);
  
  //driverAddress
  var data_address = raw_data.slice(128,192);
  
  //isLock
  var data_islock = raw_data.slice(192);
  
  var res = {
    "plate": web3.toAscii("0x" + data_plate),
    "driverName": web3.toAscii("0x" + data_name),
    "driverAddress": ("0x" + data_address),
    "isLock": ("0x" + data_islock)
  };
  
  
  return res;
  
}


export async function createPayment(_credit, _driverAddress, _fee) {
  
  let block = web3.eth.getBlock("latest");
  let data = '0x';
  // 取前2-10位（共8位數、省略0x)
  let method = web3.sha3('createPayment(uint256,address)').slice(2,10);

  let driverAddress = _driverAddress;
  let credit = web3.toHex(_credit);

  let params = transaction.to64Bytes(credit.slice(2,)) +
               transaction.to64Bytes(driverAddress.slice(2,));
                
  _fee = _fee * (10 ** 18);
  let fee = web3.toHex(_fee);
  // 將 data 轉成 heximal格式
  data += method + params;

  let gasPrice = web3.eth.gasPrice;
  let gasLimit = 1000000;
  let value_ = fee;
  let nonce = web3.eth.getTransactionCount(config.account);

  let txInfo = {
      chainId: "0x4",
      from: config.account,
      nonce: web3.toHex(nonce),
      gasPrice: web3.toHex(gasPrice),
      gasLimit: web3.toHex(gasLimit),
      to: contractAddress.Emoto,
      value: value_,
      data: data,
  }
  console.log(txInfo);

  return new Promise(function(resolve, reject){
    transaction.sendTransaction(txInfo).then(function(txhash) {
      console.log('====createPayment hash====');
      console.log(txhash);

      console.log('====get updated driverInforamtion');
      

   
      resolve(txhash);
    }).catch(err => {
      console.log("caught: ", err);
    });
  })  
}
