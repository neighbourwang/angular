export const IpMngModel_mock = {
    resultCode: "100",
    detailDescription: "IP地址管理",
    resultContent: [
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e01", 
        "dcId": "77557b4d-9004-4118-807f-c9d6bffcbbd3", 
        "dcName": "DC1", 
        "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a31", 
        "switchName": "VDS1",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e02", 
        "dcId": "77557b4d-9004-4118-807f-c9d6bffcbbd3", 
        "dcName": "DC1", 
        "switchId": "ed44ca12-721c-4da3-8b5a-a2a040442f32", 
        "switchName": "VDS2",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4       
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e03", 
        "dcId": "77557b4d-9004-4118-807f-c9d6bffcbbd3", 
        "dcName": "DC1", 
        "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a35", 
        "switchName": "VDS5",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    },


    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e04", 
        "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9", 
        "dcName": "DC2", 
        "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a25", 
        "switchName": "VDS5",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e05", 
        "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9", 
        "dcName": "DC2", 
        "switchId": "c04e2749-6d72-4671-8a14-a92d6abdcb26", 
        "switchName": "VDS6",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e06", 
        "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9", 
        "dcName": "DC2", 
        "switchId": "ea083c37-8c26-427a-9806-aaf1319ed327", 
        "switchName": "VDS7",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084e07", 
        "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9", 
        "dcName": "DC2", 
        "switchId": "69123d27-ab54-45d6-a1eb-15b1be22b82a", 
        "switchName": "VDSa",
        "dvPortGroupName": "dv pg 1",
        "distPortGroupDisplayName": null,
        "vlanId": "100", 
        "subnetCIDR": "10.10.0.0/24", 
        "gateway": "10.10.0.1", 
        "ipCount": 24, 
        "usedIPCount": 20, 
        "freeIPCount": 4      
    }
    ]
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
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a31",
                    "switchName": "VDS1"
                },
                {
                    "switchId": "ed44ca12-721c-4da3-8b5a-a2a040442f32",
                    "switchName": "VDS2"
                },
                {
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a35",
                    "switchName": "VDS5"
                }
            ]
        },
        {
            "dcName": "DC2",
            "dcId": "8121c33b-a698-48cf-abc4-fa68a8bed2e9",
            "switchList": [
                {
                    "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a25",
                    "switchName": "VDS5"
                },
                {
                    "switchId": "c04e2749-6d72-4671-8a14-a92d6abdcb26",
                    "switchName": "VDS6"
                },
                {
                    "switchId": "ea083c37-8c26-427a-9806-aaf1319ed327",
                    "switchName": "VDS7"
                },
                {
                    "switchId": "69123d27-ab54-45d6-a1eb-15b1be22b82a",
                    "switchName": "VDSa"
                }
            ]
        } 
    ]
}



export const IpUsageMngModel_mock = {
    resultCode: "100",
    detailDescription: "IP地址使用情况",
    resultContent: [
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084001", //IP地址ID
        "addr": "10.20.0.1", //IP地址
        "instanceName": "测试集群001号机", //占用IP的主机名
        "tenantName": "BOE - CIO企", //企业名称
        "status": "1", //状态, 来源于数据字典
        "description": null //说明
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084002",
        "addr": "10.20.0.2",
        "instanceName": "",
        "tenantName": "",
        "status": "2",
        "description": null
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084003",
        "addr": "10.20.0.3",
        "instanceName": "测试集群009号机",
        "tenantName": "HPE",
        "status": "1",
        "description": null
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084004",
        "addr": "10.20.0.4",
        "instanceName": "",
        "tenantName": "",
        "status": "2",
        "description": null
    },
    {
        "id": "ef349044-3bfb-4b09-b804-30954b084005",
        "addr": "10.20.0.5",
        "instanceName": "",
        "tenantName": "",
        "status": "2",
        "description": null
    }

    ]
}




export const subnetInfoModel_mock = {
    resultCode: "100",
    detailDescription: "IP地址管理",
    resultContent: {
            "id": "ef349044-3bfb-4b09-b804-30954b084e01",
            "dcId": "77557b4d-9004-4118-807f-c9d6bffcbbd3",
            "dcName": "DC1",
            "switchId": "792a37ea-2443-4ae5-8ad9-32f7ddce8a31",
            "switchName": "VDS1",
            "dvPortGroupName": "dv pg 1",
            "distPortGroupDisplayName": null,
            "subnetCIDR": "10.10.0.0/24",
            "gateway": "10.10.0.1",
            "subnetMask": "255.255.255.0",
            "dnsPre": "16.187.145.120",
            "dnsAlt": "16.187.145.119",
            "range": [
                "10.10.0.5,10.10.0.10",
                "10.10.0.15,10.10.0.30"
            ]
        }
}
