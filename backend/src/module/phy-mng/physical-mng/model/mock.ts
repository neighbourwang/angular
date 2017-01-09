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
        "pmName": "北京地区-物理资源池1",
        "ipAddr": "北京",
        "username": "朝阳数据中心",
        "password": "朝阳数据中心描述",
        "serverTypeId": "2",
        "brandId": "3",
        "modelId": "6",
        "locale": "朝阳数据中心描述",
        "description": "北京地区-物理资源池1",
        "hardwareInfo": {
            "cpu": {
                "spec": "Xeon E5 2560",
                "specValue": 2
            },
            "memory": {
                "spec": "32GB X4 PC3L-10600",
                "specValue": 128
            },
            "disk": [
                {
                    "spec": "4*SSD",
                    "specValue": 10240
                },
                {
                    "spec": "4*SAS",
                    "specValue": 10240
                }
            ]
        },
        "enterprise": "BOE",
        "department": "BOE",
        "startDate": "2016-11-1",
        "endDate": "2016-11-2",
        "applicant": "张三",
        "priIPAddr": "10.0.0.1",
        "pubIPAddr": "127.1.1.1",
        "image": "windows2016"
    }
}
