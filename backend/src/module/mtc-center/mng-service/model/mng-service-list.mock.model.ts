export const ServiceList_mock= {
    "resultCode": "100",
    "detailDescription": "获取服务列表成功",
    "resultContent": [
        {
            "serviceId": "6770e06b-b304-45d6-aeb0-cdb6ebcf09f2",
            "serviceName": "这是一个demo的服务",
            "serviceObjectCode": "1",
            "instance": {
                "instanceId": "157a058e-66ec-4927-bf84-3f31c054a2ef",
                "instanceName": "云主机123",
                "instanceType": "云主机",
                "instanceAvailableZone": "可用区3333",
                "instanceRegion": "上海一区"
            },
            "enterpriseId": "54007090-c9da-4f9e-9bb8-216220f0acab",
            "serviceType": "0",
            "serviceStatus": "1"
        }
    ]
}

export const ServiceDetail_mock= {
    "resultCode": "100",
    "detailDescription": "获取管理服务详情成功",
    "resultContent": {
        "serviceBaseInfo": {
            "serviceId": "6770e06b-b304-45d6-aeb0-cdb6ebcf09f2",
            "serviceName": "这是一个demo的服务",
            "serviceObjectCode": "1",
            "instance": {
                "instanceId": "157a058e-66ec-4927-bf84-3f31c054a2ef",
                "instanceName": "云主机123",
                "instanceType": "云主机",
                "instanceAvailableZone": "可用区3333",
                "instanceRegion": "上海一区"
            },
            "enterpriseId": "54007090-c9da-4f9e-9bb8-216220f0acab",
            "serviceType": "0",
            "serviceStatus": "1"
        },
        "remarkInfo": "这是一个测试的备注信息/n哈哈",
        "startDate": "2017-7-1 10：00：00",
        "endDate": "2017-12-31 10：00：00",
        "followInfos": [
            {
                "followInfoId": "47d2b934-558f-4bd7-b2d2-db35d47c14b8",
                "followInfo": "测试的跟进信息1111111111111111111111",
                "creatorId": "43dce297-ea75-4449-8a4f-6498c8c0e8e5",
                "creatorName": "fhd",
                "date": "2017-7-1 10:00"
            },
            {
                "followInfoId": "47f58ec2-b818-463d-808c-57afe732a29a",
                "followInfo": "测试的跟进信息1111111111111111111111",
                "creatorId": "7dd00fd8-6745-4cef-8501-e82d1344dee8",
                "creatorName": "zhangwei",
                "date": " 2017-6-20 10:00"
            }
        ]
    }
}


