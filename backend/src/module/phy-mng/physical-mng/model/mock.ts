export const serverTypeListAndbrandList_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": {
        "serverTypeList": [
            {
                "id": 1,
                "serverType": "X86"
            },
            {
                "id": 2,
                "serverType": "X64"
            }
        ],
        "brandList": [
            {
                "id": 1,
                "brand": "HP",
                "modelList": [
                    {
                        "id": 1,
                        "model": "i380"
                    },
                    {
                        "id": 2,
                        "model": "i580"
                    }
                ]
            },
            {
                "id": 2,
                "brand": "华为",
                "modelList": [
                    {
                        "id": 3,
                        "model": "G5"
                    },
                    {
                        "id": 4,
                        "model": "G8"
                    },
                    {
                        "id": 5,
                        "model": "G9"
                    }
                ]
            },
            {
                "id": 3,
                "brand": "浪潮",
                "modelList": [
                    {
                        "id": 6,
                        "model": "L3008"
                    },
                    {
                        "id": 7,
                        "model": "L3380"
                    }
                ]
            }
        ]
    }
}


export const physicalMachine_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": {
        id:"123",
        "model": "DL380 G9",
    "sn": "ABC124ABC",
    "pmHardwareCPU": {
      "version": "Xeon E5 2560",
      "value": 8
    },
    "pmHardwareMemory": {
      "version": "32GB X4 PC3L-10600",
      "value": 128
    },
    "pmHardwareDiskList": [
      {
        "version": "4*SSD",
        "value": null
      },
      {
        "version": "4*SAS",
        "value": null
      }
    ],
    "pmPoolId": "ID_POOL_ljllllljsldfjkl",
    "pmName": "HP DL380 G9",
    "macAddress": "A3-3B-22-F4-21-22",
    "iloIPAddress": "10.135.22.98",
    "iloUserName": "root",
    "iloPwd": "!QAZ&UJM",
    "sererTypeId": 1,
    "serverTypeName": "X86",
    "brandId": 2,
    "brandName": "华为",
    "modleId": 3,
    "modleName": "G5",
    "locale": "北京朝阳区",
    "description": "此物理机是2017年最新到货的机型",
    "pmId": "ID_PM_xxlkjflkjslkj",
    "enterprise": "BOE",
    "department": "BOE",
    "startDate": "2016-10-01",
    "endDate": "2017-12-11",
    "applicant": "张三",
    "priIPAddr": "10.0.0.1",
    "pubIPAddr": "127.1.1.1",
    "image": "windows2016"
    }
}
export const PhysicalList_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
        {
        "index": 1,
        "pmId": "IDljijfeixis001",
        "pmName": "HP DL380 G7-001",
        "pmSN": "ABC124ABC",
        "macAddress": "B3-2A-12-2B-F6-4D",
        "pmBrand": "HP",
        "pmModel": "G7",
        "pmCPUCores": 4,
        "pmRAM": 128,
        "pmDiskInfo": "4*SSD  10240G,4*SAS 10240G",
        "pmPriIPAddr": "16.19.65.30",
        "pmPubIPAddr": null,
        "pmILOAddr": "16.179.5.3",
        "pmLocation": "1F-1-1",
        "pmPowerStatus": 1,
        "pmUseageStatus": 1,
        "pmMainStatus": 0,
        "pmHealthExam": 1
        
    },
    {
        "index": 2,
        "pmId": "IDljijfeixis002",
        "pmName": "HP DL380 G7-002",
        "pmSN": "ABC124ABC",
        "macAddress": "B3-2A-12-2B-F6-4D",
        "pmBrand": "HP",
        "pmModel": "G7",
        "pmCPUCores": 4,
        "pmRAM": 128,
        "pmDiskInfo": "4*SSD  10240G,4*SAS 10240G",
        "pmPriIPAddr": "16.19.65.30",
        "pmPubIPAddr": null,
        "pmILOAddr": "16.179.5.3",
        "pmLocation": "1F-1-1",
        "pmPowerStatus": 1,
        "pmUseageStatus": 1,
        "pmMainStatus": 1,
        "pmHealthExam": 1
        
    },
    ],
    "pageInfo":{
        "currentPage": 1,
        "totalPage": 1,
        "pageSize": 10,
        "totalRecords": 1
  }  
}

export const PortsList_mock = {
"resultCode": "100",
  "detailDescription": null,
  "resultContent": [
    {
      "id": null,
       "partsId": "157876b7-8529-4fb9-ae6e-f0c257e4f026",
      "partsName": "磁盘",
      "specId": "a2e9c59b-f86d-47f9-ab7a-89e9070e6cc9",
      "specName": "SSD",
      "specValue": "32",
      "partsNum": 100,
      "partsCap":100,
      "index": 1
    },
    {
      "id": null,
      "partsId": "7197caed-1ad9-4ece-9cd4-d96e526f48af",
      "partsName": "CPU",
      "specId": "27156ed8-f1e3-460a-927d-e0471fe4ab4e",
      "specName": "Inter",
      "specValue": 1,
      "partsNum": 200,
      "partsCap":100,
      "index": 2
    }
  ],
  }
  export const PortList_mock={
      "resultCode": "100",
  "detailDescription": null,
  "resultContent": [
    {
      "partsId": "157876b7-8529-4fb9-ae6e-f0c257e4f026",
      "partsName": "磁盘",
      "specList": [
        {
           "specId": "a2e9c59b-f86d-47f9-ab7a-89e9070e6cc9",
          "specName": "SSD"
        },
      ]
    },
    {
      "partsId": "7197caed-1ad9-4ece-9cd4-d96e526f48af",
      "partsName": "CPU",
      "specList": [
        {
          "specId": "27156ed8-f1e3-460a-927d-e0471fe4ab4e",
          "specName": "Inter"
        }
      ]
    }
  ]
  }



  


  
 

