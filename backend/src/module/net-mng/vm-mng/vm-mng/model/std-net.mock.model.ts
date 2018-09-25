export const StdNet_mock = {
    resultCode: "100",
    detailDescription: "标准网络",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords: 2
    },
    resultContent: {
        "networks": [
            {
                "id": "1",
                "dcName": "DC1",
                "clusterName": "cluster1",
                "clusterDisplayName": "皇后区",
                "portDisplayName": "hello",
                "portGroupName": "mk-group1",
                "vlanId": "88",
                "stateDict": "1",
                "lastUpdate": "2016-10-10 15:35:50"
            },
            {
                "id": "2",
                "dcName": "DC1",
                "clusterName": "cluster2",
                "clusterDisplayName": "可用区2",
                "portDisplayName": "hi",
                "portGroupName": "ch",
                "vlanId": "101",
                "stateDict": "2",
                "lastUpdate": "2016-11-11 16:35:50"
            },
            {
                "id": "3",
                "dcName": "DC2",
                "clusterName": "cluster21",
                "clusterDisplayName": "洪山区",
                "portDisplayName": "tom",
                "portGroupName": "nice",
                "vlanId": "222",
                "stateDict": "2",
                "lastUpdate": "2016-7-8 16:35:50"
            },
            {
                "id": "4",
                "dcName": "DC2",
                "clusterName": "cluster22",
                "clusterDisplayName": "洪山区",
                "portDisplayName": "tom",
                "portGroupName": "nice",
                "vlanId": "222",
                "stateDict": "2",
                "lastUpdate": "2016-7-8 16:35:50"
            }
        ]
    }
}



export const net_dc_list_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
        {
            "dcName": "DC1",
            "clusters": [
                {
                    "clusterId":"1",
                    "clusterName":"VSD1"
                 },
                {
                    "clusterId":"2",
                    "clusterName":"VSD2"
                },
                {
                    "clusterId":"3",
                    "clusterName":"VSD3"
                }

            ]
        },
         {
            "dcName": "DC2",
            "clusters": [
                {
                    "clusterId":"4",
                    "clusterName":"VSD4"
                 },
                {
                    "clusterId":"5",
                    "clusterName":"VSD5"
                },
                {
                    "clusterId":"6",
                    "clusterName":"VSD6"
                }

            ]
        }
    ]
}