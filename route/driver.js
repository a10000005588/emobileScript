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
    
	//資料庫新增司機
	request.post('http://140.113.63.172:5678/emobile/driver.php',
		{
			form:
			{
				"method": 'new_driver', 
				"driver": driverAddress,
				"phone": "0912345678",
				"name": driverName,
				"plate": "ABC-0000",
				"credit": credit
			}
		},
		function (error, response, body)
		{
			if(!error && response.statusCode == 200)
			{
			   console.log(body);
			}
		}
	);
	
	
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
	var counter = onChainResponse.length;
    
    for(var i=0; i<onChainResponse.length; i++) {
		
		
		//資料庫拿到司機資料
		
		//這寫法超可怕
		(function(idx){
			
			//發送POST
			request.post('http://140.113.63.172:5678/emobile/driver.php',
				{
					form:
					{
						"method": 'get_driver', 
						"driver": onChainResponse[idx].driverAddress
					}
				},
				function (error, response, body)
				{
					
					console.log(body);
					
					//回傳JSON資料轉成物件
					var db_data = JSON.parse(body);
					
					var information = "";
					
					if(db_data.result == true)
					{
						//成功 給拿到的資料
						information = {
							"method": "getDriverInformation",
							"driverName": onChainResponse[idx].driverName,
							"credit": onChainResponse[idx].credit,
							"driverAddress": onChainResponse[idx].driverAddress,
							"mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
							"phone": db_data.data[0].phone,
							"plate": db_data.data[0].plate,
							"count": onChainResponse[idx].count
						}
					}
					else
					{
						
						//失敗 給假資料
						information = {
							"method": "getDriverInformation",
							"driverName": onChainResponse[idx].driverName,
							"credit": onChainResponse[idx].credit,
							"driverAddress": onChainResponse[idx].driverAddress,
							"mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
							"phone": "09-12345678",
							"plate": "ABC-0000",
							"count": onChainResponse[idx].count
						}
					}
					
					data.push(information);
					
					counter = counter -1;
					
					if(counter == 0)
					{
						res.send(data);
					}
					
				}
			);
			
		})(i);
		
		
		
    }
	
	if(onChainResponse.length == 0)
	{
		res.send(data);
	}
	
	
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
	
	
	//資料庫拿到單一司機
	request.post('http://140.113.63.172:5678/emobile/driver.php',
		{
			form:
			{
				"method": 'get_driver', 
				"driver": driverAddress
			}
		},
		function (error, response, body)
		{
			if(!error && response.statusCode == 200)
			{
				
				var db_data = JSON.parse(body);
				
				var information = {
					"method": "getDriverInformation",
					"driverName": onChainResponse.driverName,
					"credit": onChainResponse.credit,
					"driverAddress": driverAddress,
					"mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
					"phone": db_data.data[0].phone,
					"count": onChainResponse.count
				}
				
				res.send(information);
			}
		}
	);
	
	
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});

apiRouter.post('/:hash/payment/user/:userHash', async function (req, res) {
  try {
    console.log("create payment api");

    var request2 = {
      "driverAddress": req.params.hash,
      "driverName": req.body.driverName,
      "userAddress": config.account,
      "userName": req.body.userName,
      "fee": req.body.fee,
      "credit": req.body.credit
    }
	
	//資料庫新增交易
	request.post('http://140.113.63.172:5678/emobile/api.php',
		{
			form:
			{
				"method": "new_travel",
				"longitude": 121.5,
				"latitude": 25.0,
				"distance": 1.234,
				"user": config.account,
				"driver": req.params.hash,
				"contract": "0x0100000000000000000000000000000000000001",
				"credit": req.body.credit,
				"comment": req.body.comment
			}
		},
		function (error, response, body)
		{
			if(!error && response.statusCode == 200)
			{
			   console.log(body);
			}
		}
	);
	
    
    await emoto.createPayment(request2.credit, request2.driverAddress, request2.fee).then(function(txHash) {
      console.log("route api callback");
      
      var avgCredit = req.body.credit / req.body.count;

      var response = {
        "method": "createPayment",
        "driverName": request2.driverName,
        "userName": req.body.userName,
        "userAddress": config.account,
        "credit": req.body.credit,
        "driverAddress": req.body.driverAddress,
        "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
		"comment": req.body.comment,
        "transactionReceipt": txHash,
		"fee": req.body.fee
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




apiRouter.get('/comment/:hash', async function (req, res) {
  try {
    var driverAddress = req.params.hash;
    
	
	//資料庫拿到單一司機
	request.post('http://140.113.63.172:5678/emobile/api.php',
		{
			form:
			{
				"method": 'get_driver_travel', 
				"driver": driverAddress
			}
		},
		function (error, response, body)
		{
			if(!error && response.statusCode == 200)
			{
				
				var db_data = JSON.parse(body);
				
				res.send(db_data);
			}
		}
	);
	
	
  } catch (e) {
    res.status(404).send({
      message: 'Not Found'
    });
  }
});








module.exports = apiRouter;
