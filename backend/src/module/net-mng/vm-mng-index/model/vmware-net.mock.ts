export const RegionInfo_mock = {
    resultCode: "100",
    detailDescription: "RegionList",
    resultContent: [
    {
     "regionId":"1",
     "regionName":"上海",
     "dcList":[{
                        "datacenterId":"11",
                        "datacenterName":"dc11",
                        "platformList":[
                                {"platformName":"platform111",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-111"
                                 },
                                 {"platformName":"platform112",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-112"
                                 },
                                 {"platformName":"platform113",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-113"
                                 }

                         ]
                },
                {
                        "datacenterId":"12",
                        "datacenterName":"dc12",
                        "platformList":[
                                {"platformName":"platform121",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-121"
                                 },
                                 {"platformName":"platform122",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-122"
                                 },
                                 {"platformName":"platform123",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-123"
                                 }
                         ]
                }
 
            ]
   
   },
   {
     "regionId":"2",
     "regionName":"北京",
     "dcList":[{
                        "datacenterId":"21",
                        "datacenterName":"dc21",
                        "platformList":[
                                {"platformName":"platform211",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-211"
                                 },
                                 {"platformName":"platform212",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-212"
                                 },
                                 {"platformName":"platform213",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-213"
                                 }

                         ]
                },
                {
                        "datacenterId":"22",
                        "datacenterName":"dc22",
                        "platformList":[
                                {"platformName":"platform221",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-221"
                                 },
                                 {"platformName":"platform222",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-222"
                                 },
                                 {"platformName":"platform223",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-223"
                                 }
                         ]
                }
 
                 ]
   
   },
   {
     "regionId":"3",
     "regionName":"武汉",
     "dcList":[{
                        "datacenterId":"31",
                        "datacenterName":"dc31",
                        "platformList":[
                                {"platformName":"platform311",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-311"
                                 },
                                 {"platformName":"platform312",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-312"
                                 },
                                 {"platformName":"platform313",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-313"
                                 }

                         ]
                },
                {
                        "datacenterId":"32",
                        "datacenterName":"dc32",
                        "platformList":[
                                {"platformName":"platform321",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-321"
                                 },
                                 {"platformName":"platform322",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-322"
                                 },
                                 {"platformName":"platform323",
                                "platformUrl":"http://",
                                "platformId":"1231231-123123-123123-323"
                                 }
                         ]
                }
                ]
   
   },

    ]
}



export const NetworkInfo_mock = {
    resultCode: "100",
    detailDescription: "NetworkList",
    resultContent: [
    {
        "dcName": "DC1",
        "dcId": "12312-123123-123123",
        "clusterName": "cluster1",
        "clusterId": "cluster1-123-123-111",
        "clusterDisplayName": "area1",
        "networkType": 2
    },
    {
        "dcName": "DC1",
        "dcId": "12312-123123-123123",
        "clusterName": "cluster2",
        "clusterId": "cluster1-123-123-112",
        "clusterDisplayName": "area2",
        "networkType": 1
    },
    {
        "dcName": "DC2",
        "dcId": "12312-123123-123123",
        "clusterName": "cluster3",
        "clusterId": "cluster1-123-123-123",
        "clusterDisplayName": "area3",
        "networkType": 3
    },
    {
        "dcName": "DC2",
        "dcId": "12312-123123-123123",
        "clusterName": "cluster4",
        "clusterId": "cluster1-123-123-124",
        "clusterDisplayName": "area4",
        "networkType": 1
    },

    ]
}

export const NsxInfo_mock = {
    resultCode: "100",
    detailDescription: "NetworkList",
    resultContent:
    {
        "nsxVer": 1,
        "nsxAddress": "http://123.com",
        "userName": "admin",
        "adminPassword": "adminpass",
        "platformId": "123123123-12312-11"
    }
}

export const NsxStatus_mock = {
    resultCode: "100",
    detailDescription: "NetworkList",
    resultContent: 
    {
        "checkResult":'2'
    }
}

export const Success_mock = {
    resultCode: "100",
    detailDescription: "",
}

export const Failure_mock = {
    resultCode: "200",
    detailDescription: "",
}