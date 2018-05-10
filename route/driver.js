var express = require('express');
var apiRouter = express.Router();
import web3 from '../test';

import * as driver from '../action/driver';

/* contract address */
let contractAddress = require('../data/contract');
/* contrac abi */
let driverAbi = require('../abi/Driver.json');

let driverContract;

apiRouter.get('/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;
    var driverName = "Testing";
    var credit = 10;

    var result = driver.setDriver(driverAddress, driverName, credit);
    console.log(result);

  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

module.exports = apiRouter;