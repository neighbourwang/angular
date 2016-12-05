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
                "switchName": "VDS1",
                "switchId": "9000",
                "dvPortGroupName": "mk-group1",
                "enterpriseList": [
                    { "com": "HP2", "id": "001" },
                    { "com": "HP3", "id": "001" },
                    { "com": "HP1", "id": "001" }
                ]
            },
            {
                "id": "af349044-3bfb-4b09-b804-30954b084e0x",
                "dcName": "DC2",
                "switchName": "VDS2",
                "switchId": "8000",
                "dvPortGroupName": "mk-group1",
                "enterpriseList": [
                    { "com": "HP2", "id": "001" },
                    { "com": "HP3", "id": "001" },
                    { "com": "HP1", "id": "001" }
                ]
            },
            {
                "id": "af349044-3bfb-4b09-b804-30954b084e0x",
                "dcName": "DC2",
                "switchName": "VDS2",
                "switchId": "7000",
                "dvPortGroupName": "mk-group1",
                "enterpriseList": [
                    { "com": "HP2", "id": "001" },
                    { "com": "HP3", "id": "001" },
                    { "com": "HP1", "id": "001" }
                ]
            },
            {
                "id": "af349044-3bfb-4b09-b804-30954b084e0x",
                "dcName": "DC1",
                "switchName": "VDS1",
                "switchId": "7000",
                "dvPortGroupName": "mk-group1",
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

export const net_dc_list_mock = {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
         {
            "dcName": "DC1",
            "dcId": "77557b4d-9004-4118-807f-c9d6bffcbbd3",
            "switchList": [
                {
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a32",
                    "switchName": "VDS1"
                },
                {
                    "switchId": "ed44ca12-721c-4da3-8b5a-a2a040442f31",
                    "switchName": "VDS2"
                },
                {
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a32",
                    "switchName": "VDS5"
                }
            ]
        },
        {
            "dcName": "DC2",
            "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9",
            "switchList": [
                {
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a32",
                    "switchName": "VDS5"
                },
                {
                    "switchId": "c04e2749-6d72-4671-8a14-a92d6abdcb59",
                    "switchName": "VDS6"
                },
                {
                    "switchId": "ea083c37-8c26-427a-9806-aaf1319ed347",
                    "switchName": "VDS7"
                },
                {
                    "switchId": "69123d27-ab54-45d6-a1eb-15b1be22b89b",
                    "switchName": "VDSa"
                }
            ]
        } 
    ]
}
