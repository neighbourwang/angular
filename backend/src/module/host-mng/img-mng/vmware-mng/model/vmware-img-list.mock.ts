export const VmwareImgModel_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
        {
            "id": "ef349044-3bfb-4b09-b804-30954b084eaa",
            "name": "windows-2016",
            "displayName": "windows 2016",
            "os": "CentOS",
            "bitsType": "0",
            "type": "0",
            "tenants": [
            ],
            "status": "0",
            "description": "windows 2016=============="
        },
        {
            "id": "ef349044-3bfb-4b09-b804-30954b084ebb",
            "name": "windows-boe",
            "displayName": "windows for BOE",
            "os": "CentOS",
            "bitsType": "1",
            "type": "1",
            "tenants": [
                {
                    "name": "BOE",
                    "id": "ef349044-3bfb-4b09-b804-30954b084e04"
                }
            ],
            "status": "1",
            "description": "windows for BOE!!!!!!!!!!!!!!!"
        },
        {
            "id": "ef349044-3bfb-4b09-b804-30954b084ecc",
            "name": "windows-customized",
            "displayName": "我的windows",
            "os": "CentOS",
            "bitsType": "0",
            "type": "2",
            "tenants": [
                {
                    "name": "企业1",
                    "id": "ef349044-3bfb-4b09-b804-30954b084e01"
                },
                {
                    "name": "企业2",
                    "id": "ef349044-3bfb-4b09-b804-30954b084e02"
                },
                {
                    "name": "企业3",
                    "id": "ef349044-3bfb-4b09-b804-30954b084e03"
                }
            ],
            "status": "2",
            "description": "我的windows#############"
        }
    ],
    "pageInfo": {
        "currentPage": 1,
        "totalPage": 2,
        "pageSize": 2,
        "totalRecords": 3
    }
}


export const EnterpriseModel_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
        {
            "name": "企业1",
            "id": "ef349044-3bfb-4b09-b804-30954b084e01"
        },
        {
            "name": "企业2",
            "id": "ef349044-3bfb-4b09-b804-30954b084e02"
        },
        {
            "name": "企业2",
            "id": "ef349044-3bfb-4b09-b804-30954b084e03"
        },
        {
            "name": "BOE",
            "id": "ef349044-3bfb-4b09-b804-30954b084e04"
        }
    ]
}
