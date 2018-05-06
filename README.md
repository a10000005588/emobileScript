# Emobile Project Contract Script 

## Development Setting 
1. Do `npm install` first.
To install packages for project.

2. Using testrpc to build a test ethereum blockchain. such as...
`ganche-cli`

3. Setting testing account
In `/data/config.js`
setting your account address 、privateKey、 contracts address..

4. Then, in the emobileScript, run script with...
`./node_modules/.bin/babel-node test.js`

## Project API

Provide the API for emobile frontend:
https://xd.adobe.com/spec/e801fb67-7a04-4539-9ddf-a9d57bafcd04/#screen/9cee957f-3e26-4721-8b4b-84d7c96ba46d/%E6%88%91%E7%9A%84%E9%92%B1%E5%8C%85


###  API Spec for emobile App.

It's API spec for emobile web app.

## Usage
---
### Emobile API

data collection for emobiles.

[link](#-Emobile)
* [ ] GET: /

```
GET:  /emobile                                  // 列出所有 emobile 資訊
GET:  /emobile/:hash                            // 以 hash 取得 emobile 資訊
GET:  /emobile/investor/:investorId             // 取得investor對所有emobile的投資
POST: /emobile/:EmobileId/investor/:investorId  // 新增一筆investor對emobile的投資資訊
POST: /emobile/:EmobileId/client/:clientId      // 新增一筆client對emobile的投資資訊

```

### Driver API

data collection for emobiles.

[link](#-Driver)
* [ ] GET: /

```
GET:  /driver                   // 列出所有driver資訊
GET:  /driver/:hash             // 列出對應hash的driver資訊
POST: /driver/:hash/assess      // 給予driver評價
```
---

# # Emobile API

## # 列出所有 emobile 資訊.

**URL** : `/emobile`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

(None)

**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
[{
    "mobileAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "fund": 5000000000000000000,
    "driverName": "王小明",
    "driverAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "isLock": false,
    "createDate": "2018-01-01",
    "investorList": [{
      "investorName": "王二明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    },{
      "investorName": "王三明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    }]
}, {
    "mobileAddress": "0xe635dead34fdd0c8c1eaa621647084732b4b23db",
    "plate": "BBS-9999",
    "fund": 5000000000000000000,
    "driverName": "汪大東",
    "driverAddress": "0x65d09d72e2ca19b7fad0a5d6cec6909e3b379214",
    "isLock": false,
    "createDate": "2018-01-01",
    "investorList": [{
      "investorName": "王二明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    },{
      "investorName": "王三明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    }]
},...
]
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
---

## # 以 hash 取得 emobile 資訊.

**URL** : `/emobile/:hash`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "hash": byte64
```

**URL example**:

```
/emobile/0x83af6976832d90e5693a9b5a7b29fac4a28de801
```

**Data constraints**

(None)

**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
    "mobileAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "fund": 5000000000000000000,
    "driverName": "王小明",
    "driverAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "isLock": false,
    "createDate": "2018-01-01",
    "investorList": [{
      "investorName": "王二明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    },{
      "investorName": "王三明",
      "ratio": 0.1,
      "investAmount": 5000000000000000000
    }]
}
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
---
## # 取得investor對所有emobile的投資.

**URL** : `/emobile/investor/:investorId`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "investorId": byte64
```

**URL example**:

```
/emobile/investor/0x83af6976832d90e5693a9b5a7b29fac4a28de801
```
**Data constraints**

(None)

**Data example**: 

(None)


### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
[{
    "mobileAddress": "0x10af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "fund": 5000000000000000000,
    "driverName": "王小明",
    "driverAddress": "0x99af6976832d90e5693a9b5a7b29fac4a28de801",
    "investorAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "profit": 34.6,
    "ratio": 0.1,
    "investAmount": 5000000000000000000,
    "isLock": false,
    "createDate": "2018-01-01"
}, {
    "mobileAddress": "0xe635dead34fdd0c8c1eaa621647084732b4b23db",
    "plate": "BBS-9999",
    "driverName": "汪大東",
    "driverAddress": "0x65d09d72e2ca19b7fad0a5d6cec6909e3b379214",
    "investorAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "profit": 14.3,
    "ratio": 0.1,
    "investAmount": 5000000000000000000,
    "isLock": false,
    "createDate": "2018-01-01"
},...
]
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
---

## 新增一筆investor對emobile的投資資訊

**URL** : `/emobile/:EmobileId/investor/:investorId`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "EmobileId": byte64
 "investorId": byte64
```

**URL example**:

```
/emobile/0x5a25d727235d5641de8be96bb7447d4b839e771f/investor/0x83af6976832d90e5693a9b5a7b29fac4a28de801
```

**Data constraints**

```json
{
    "investorName": "string",
    "investAmount": "ether",
}
```
**Data example**: 

```json
{
    "investorName": "毛小聖",
    "investAmount": 0.01,
}
```

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
    "result": true,
    "message": "invest success",
}
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
---

## # 新增一筆client對emobile的投資資訊

**URL** : `/emobile/:EmobileId/client/:clientId`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "EmobileId": byte64
 "clientId": byte64
```

**URL example**:

```
/emobile/0x5a25d727235d5641de8be96bb7447d4b839e771f/client/0x83af6976832d90e5693a9b5a7b29fac4a28de801
```

**Data constraints**

```json
{
    "paymentAmount": "ether",
}
```
**Data example**: 

```json
{
    "paymentAmount": 0.001,
}
```

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
    "result": true,
    "message": "payment success",
}
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```

# # Driver API

## # 列出所有司機資訊.

**URL** : `/driver`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

(None)

**URL example**:

```
/driver
```

**Data constraints**

(None)

**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
[{
  "driverName": "毛小聖",
  "creadit": 5,
  "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
  "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",

},{
  "driverName": "毛二聖",
  "creadit": 10,
  "driverAddress": "0x85cbae24f7ebd6537128f5d51f29c3d60dea8e07",
  "mobileAddress": "0x149da1ec1128b906947416cbb34aa778dfa15e56c",
}]
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
---
## # 列出該hash的司機資訊.


**URL** : `/driver/:hash`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**
```
{
  "hash": bytes64
}
```
**URL example**:

```
/driver/0xc159e38b17d5aa46dc7fc61778222a8c485f6b81
```

**Data constraints**

(None)

**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
  "driverName": "毛小聖",
  "creadit": 5,
  "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
  "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",

}
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```

---
## # 給予司機評價.

**URL** : `/driver/:hash/assess`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**
```
{
    "hash": bytes64
}
```

**URL example**:

```
/driver/0xc159e38b17d5aa46dc7fc61778222a8c485f6b81/assess
```

**Data constraints**
```
{
    "credit" : 5
}
```
**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
    "driverName": "毛小聖",
    "creadit": 10,
    "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
    "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
}
```

### Error Responses

**Condition** : If fields has wrong format or miss fields.

**Content example** :

```json

{
    "result": false,
    "message": "",
}

```

### Or

**Condition** : If server unavailable.

**Code** : `500 Internal Server Error`

**Content example**

```json

{
    "errors": "Internal Server Error."
}

```
