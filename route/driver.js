var express = require('express');
var apiRouter = express.Router();
import web3 from '../test';

import * as driver from '../action/driver';

let driverContract;

apiRouter.get('/:hash', async function (req, res) {
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