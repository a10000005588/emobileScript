var express = require('express');
var apiRouter = express.Router();
var request = require('request');
import web3 from '../test';

import * as config from '../data/config.js';
import * as driver from '../action/driver';
import * as emoto from '../action/emoto';

import { on } from 'cluster';

let driverContract;

apiRouter.post('/setDriver/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;
    var driverName = req.body.driverName;
    var credit = 0;
    
    var onChainResponse = await driver.setDriverInformation(driverAddress, driverName, credit);

    res.send(onChainResponse);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});


apiRouter.get('/', async function (req, res) {
  try {
    console.log("getAllDriver API");
    var onChainResponse = await driver.getAllDriverInformation();
    
    var data = [];
    
    for(var i=0; i<onChainResponse.length; i++) {
      var information = {
        "method": "getDriverInformation",
        "driverName": onChainResponse[i].driverName,
        "credit": onChainResponse[i].credit,
        "driverAddress": onChainResponse[i].driverAddress,
        "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
        "phone": "09-12345678",
        "count": onChainResponse[i].count
      }
      data.push(information);
    }    

    res.send(data);

  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

apiRouter.get('/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;
    var onChainResponse = await driver.getDriverInformation(driverAddress);

    var information = {
      "method": "getDriverInformation",
      "driverName": onChainResponse.driverName,
      "credit": onChainResponse.credit,
      "driverAddress": driverAddress,
      "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
      "phone": "09-12345678",
      "count": onChainResponse.count
    }

    res.send(information);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

apiRouter.post('/:hash/payment/user/:userHash', async function (req, res) {
  try {
    console.log("create payment api");

    var request = {
      "driverAddress": req.params.hash,
      "driverName": req.body.driverName,
      "userAddress": config.account,
      "userName": req.body.userName,
      "fee": req.body.fee,
      "credit": req.body.credit
    }
    
    await emoto.createPayment(request.credit, request.driverAddress, request.fee).then(function(txHash) {
      console.log("route api callback");
      
      var avgCredit = req.body.credit / req.body.count;

      var response = {
        "method": "createPayment",
        "driverName": request.driverName,
        "userName": req.body.userName,
        "userAddress": config.account,
        "credit": req.body.credit,
        "driverAddress": req.body.driverAddress,
        "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
        "transactionReceipt": txHash
      }
      res.send(response);
    }).catch(err => {
      console.log("caught: ", err);
    });
    
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

// request.post('http://140.113.63.172:5678/emobile/api.php', { 
//   form: { 
//     "method": 'get_user_travel', 
//     "user": '0x0100000000000000000000000000000000000001'}},
//   function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//           console.log(body)
//       }
//   }
// );

// request.post(
//     'http://140.113.63.172:5678/emobile/api.php',
//     { form: { "method": 'get_driver_travel', 
//               "driver": '0x0100000000000000000000000000000000000001'} },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log(body)
//         }
//     }
// );

module.exports = apiRouter;
