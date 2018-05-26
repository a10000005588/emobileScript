var express = require('express');
var apiRouter = express.Router();
import web3 from '../test';

import * as driver from '../action/driver';

let driverContract;

apiRouter.get('/setDriver/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;
    var driverName = 'William';
    var credit = 12999;
    
    console.log("get set driver api");

    var result = driver.setDriverInformation(driverAddress, driverName, credit);
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

module.exports = apiRouter;

apiRouter.get('/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;

    var result = driver.getDriverInformation(driverAddress);
    console.log(result);
    res.send(result);
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