export const portlist_mock = {
        "resultCode": "100",
        "detailDescription": null,
        "resultContent": {
            "dcNameList": [
                "DC1",
                "DC2"
            ],
            "clusterNameList": [
                "VDS1",
                "VDS2"
            ],
            "portResList": [
                {
                    "id": "ef349044-3bfb-4b09-b804-30954b084e0c",
                    "dcName": "DC1",
                    "clusterName": "cluster1",
                    "clusterDisplayName": "可用区1",
                    "portDisplayName": "9000",
                    "portGroupName": "mk-group1",
                    "enterpriseList": [
                        { "com": "HP2", "id": "001" },
                        { "com": "HP3", "id": "001" },
                        { "com": "HP1", "id": "001" }
                    ]
                },
                {
                    "id": "af349044-3bfb-4b09-b804-30954b084e0x",
                    "dcName": "DC2",
                    "clusterName": "cluster2",
                    "clusterDisplayName": "可用区2",
                    "portDisplayName": "8000",
                    "portGroupName": "mk-group2",
                    "enterpriseList": [
                        { "com": "HP2", "id": "001" },
                        { "com": "HP3", "id": "001" },
                        { "com": "HP1", "id": "001" }
                    ]
                }
            ]
        }
};

export const port_net_mock =
    {
            "resultCode": "100",
            "detailDescription": null,
            "resultContent": {
                "portResList": [
                    {
                        "id": "ef349044-3bfb-4b09-b804-30954b084e0c",
                        "dcName": "DC1",
                        "clusterName": "cluster1",
                        "clusterDisplayName": "可用区1",
                        "portDisplayName": "null",
                        "portGroupName": "mk-group1",
                        "vlanId": "100"
                    },
                    {
                        "id": "af349044-3bfb-4b09-b804-30954b084e0x",
                        "dcName": "DC2",
                        "clusterName": "cluster2",
                        "clusterDisplayName": "可用区2",
                        "portDisplayName": "null",
                        "portGroupName": "mk-group2",
                        "vlanId": "100"
                    }
                ],
                "enterpriseSelectedList": [
                    {
                        "com": "HP2",
                        "id": "001"
                    },
                    {
                        "com": "HP3",
                        "id": "001"
                    },
                    {
                        "com": "HP1",
                        "id": "001"
                    }
                ],
                "enterpriseUnselectedList": [
                    {
                        "com": "HP4",
                        "id": "001"
                    },
                    {
                        "com": "HP5",
                        "id": "001"
                    },
                    {
                        "com": "HP6",
                        "id": "001"
                    }
                ]
            }
        }
