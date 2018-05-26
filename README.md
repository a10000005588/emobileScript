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

## Project API Information

### Provide the API for emobile frontend:
https://xd.adobe.com/spec/e801fb67-7a04-4539-9ddf-a9d57bafcd04/#screen/9cee957f-3e26-4721-8b4b-84d7c96ba46d/%E6%88%91%E7%9A%84%E9%92%B1%E5%8C%85


###  API Spec for emobile App.

It's API spec for emobile web app.

### Base URL: 

140.113.73.50:3000


## Usage
---
### Emobile API

data collection for emobiles.

[link](#-Emobile)
* [ ] GET: /

```
GET:  /api/emoto                                  // 列出所有 emoto 資訊
GET:  /api/emoto/:hash                            // 以 hash 取得 emoto 資訊
GET:  /api/emoto/:hash/user/:userHash             // 計算某台電動車行駛費用
```

### Driver API

data collection for emobiles.

[link](#-Driver)
* [ ] GET: /

```
GET:  /api/driver                   // 列出所有driver資訊
GET:  /api/driver/:hash             // 列出對應hash的driver資訊
POST: /api/driver/:hash/credit      // 給予driver評價
```
---

# # Emobile API

## # 列出所有 emoto 資訊.

**URL** : `/api/emoto`

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
    "method": "getAllEmotoInformation",
    "emotoAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "driverName": "王小明",
    "driverAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "isLock": false,
 ** "mileage": 20  (km),
    "createDate": "2018-01-01",
]}, {
    "method": "getAllEmotoInformation",
    "emotoAddress": "0xe635dead34fdd0c8c1eaa621647084732b4b23db",
    "plate": "BBS-9999",
    "driverName": "汪大東",
    "driverAddress": "0x65d09d72e2ca19b7fad0a5d6cec6909e3b379214",
    "isLock": false,
 ** "mileage": 39  (km),
    "createDate": "2018-01-01",
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

**URL** : `/api/emoto/:hash`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "hash": byte64
```

**URL example**:

```
/api/emoto/0x83af6976832d90e5693a9b5a7b29fac4a28de801
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
    "method": "getEmotoInformation",
    "emotoAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "driverName": "王小明",
    "driverAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "isLock": false,
 ** "mileage": 20  (km),
    "createDate": "2018-01-01",
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
## # 計算某台電動車行駛費用

**URL** : `/api/emoto/:hash/user/:userHash`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

```
 "hash": byte64
```

**URL example**:

```
/api/emoto/0x83af6976832d90e5693a9b5a7b29fac4a28de801/user/0x77af5576832d90e5693a9b5a7b29fac4a28de111
```

**Data constraints**

```json
{
    "createDate": "2018-01-01",
    "longitude": 121.525, //經度
    "latitude": 25.0392, //緯度
    "distance": 1.234, //本次搭乘里程數
}
```

**Data example**: 

(None)

### Success Response

**Condition** : If everything is OK and server available.

**Content example**

```json
{
    "method": "calcuateServiceFee",
    "emotoAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
    "plate": "ACX-9999",
    "driverName": "王小明",
    "driverAddress": "0x83af6976832d90e5693a9b5a7b29fac4a28de801",
 ** "mileage": 21.234  (km),
    "fee": 10 (ether)
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


# # Driver API

## # 列出所有司機資訊.

**URL** : `/api/driver`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**URL constraints**

(None)

**URL example**:

```
/api/driver
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
  "method": "getAllDriverInformation",
  "driverName": "王大陸",
  "creadit": 5,
  "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
  "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",

},{
  "method": "getAllDriverInformation",
  "driverName": "王二陸",
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


**URL** : `/api/driver/:hash`

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
/api/driver/0xc159e38b17d5aa46dc7fc61778222a8c485f6b81
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
  "method": "getDriverInformation",
  "driverName": "毛小聖",
  "creadit": 5,
  "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
  "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
  "phone": "09-12345678"
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

**URL** : `/api/driver/:hash/credit`

**Method** : `POST`

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
/api/driver/0xc159e38b17d5aa46dc7fc61778222a8c485f6b81/assess
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
    "method": "giveCreditForDriver",
    "driverName": "毛小聖",
    "creadit": 10,
    "driverAddress": "0xc159e38b17d5aa46dc7fc61778222a8c485f6b81",
    "mobileAddress": "0x149da1ece68b906947416cbb34aa778dfa15e56c",
    "phone": "09-12345678"

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
