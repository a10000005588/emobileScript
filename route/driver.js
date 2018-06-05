var express = require('express');
var apiRouter = express.Router();
var request = require('request');
import web3 from '../test';

import * as driver from '../action/driver';

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

    var information = {
      "method": "getDriverInformation",
      "driverName": onChainResponse.driverName,
      "credit": onChainResponse.credit,
      "driverAddress": onChainResponse.driverAddress,
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

apiRouter.post('/:hash/credit', async function (req, res) {
  try {
    console.log("credit api");
    var driverAddress = req.params.hash;
    var credit = req.body.credit;
  
    var result = driver.giveCreditForDriver(driverAddress,credit);
    console.log(result);
    res.send(result);
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
