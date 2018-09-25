export const Phylist_mock= {
    "resultCode": "100",
        "detailDescription": null,
        "resultContent": [
        {
            "index": 1,
            "pmPoolId": "ef349044-3bfb-4b09-b804-30954b084e0d",
            "pmPoolName": "北京地区-物理资源池1",
            "pmType": "X86",
            "region": "北京",
            "dataCenter": "朝阳数据中心",
            "amount": 8,
            "usedAmount": 0,
            "status": 0
        },
            {
                "index": 2,
                "pmPoolId": "ef349044-3bfb-4b09-b804-30954b084e0d",
                "pmPoolName": "北京地区-物理资源池2",
                "pmType": "X86",
                "region": "北京",
                "dataCenter": "朝阳数据中心",
                "amount": 10,
                "usedAmount": 0,
                "status": 1
            }
    ],
        "pageInfo": {
            "currentPage": 1,
            "totalPage": 1,
            "pageSize": 20,
            "totalRecords": 2
    }
}

export const Region_mock= {
    "resultCode": 100,
    "detailDescription": null,
    "resultContent": [
        {
            "id": "2",
            "code": "BeiJing",
            "name": "北京",
            "parentId": null
        },
        {
            "id": "1",
            "code": "ShangHai",
            "name": "上海",
            "parentId": null
        },
        {
            "id": "3",
            "code": "GuangZhou",
            "name": "广州",
            "parentId": null
        }
    ]
}
