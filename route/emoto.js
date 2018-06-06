var express = require('express');
var apiRouter = express.Router();
import web3 from '../test';

import * as emobile from '../action/emoto';

apiRouter.post('/setEmoto/', async function (req, res) {
  try {
    var emotoAddress = req.body.emoto;
    var plate = req.body.plate;
    var driverName = req.body.name;
  	var driverAddress = req.body.driver;
    
    console.log("set emoto api");
	
    var result = emobile.setEmotoInfomation(emotoAddress, plate, driverName, driverAddress);
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

apiRouter.get('/:hash/', async function (req, res) {
  try {
    var emotoAddress = req.params.hash;
    
    console.log("get emoto api");
	
    var result = emobile.getMobileInformation(emotoAddress);
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

apiRouter.post('/:hash/calculateServiceFee', async function (req, res) {
  try {
    // 1 km per 0.01 ether
    var fee = req.body.distance * 0.01;
    console.log(req.body.distance);
    var data = {
      "method": "calcuateServiceFee",
      "emotoType": req.body.emotoType,
      "createDate": req.body.createDate,
      "emotoAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
      "plate": "ACX-9999",
      "driverName": "Bob",
      "driverAddress": req.params.driverAddress,
      "mileage": req.body.distance,
      "fee": fee
    }

    res.send(data);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});


module.exports = apiRouter;