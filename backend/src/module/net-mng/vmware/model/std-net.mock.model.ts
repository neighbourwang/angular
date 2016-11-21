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
        "dcNameList": [
            {
            "dcName": "DC1",
            "clusterNameList": [
                "cluster1",
                "cluster2"
            ]
        },
        {
            "dcName": "DC2",
            "clusterNameList": [
                "cluster1",
                "cluster2"
            ]
        }
        ],
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
                "clusterName": "cluster1",
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
                "clusterName": "cluster1",
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