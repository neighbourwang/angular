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