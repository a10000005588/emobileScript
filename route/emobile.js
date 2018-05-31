var express = require('express');
var apiRouter = express.Router();
import web3 from '../test';

import * as emobile from '../action/emobile';

//好像沒用到的變數
let driverContract;

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

module.exports = apiRouter;