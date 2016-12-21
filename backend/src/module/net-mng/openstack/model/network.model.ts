
    // {
    //     ""id"": ""ef349044-3bfb-4b09-b804-30954b084e0c"", //网络ID
    //     ""tenantName"": ""BOE - CIO总部"", //所属企业名
    //     ""networkName"": ""cionetwork"", //网络名
    //     ""subnetName"": ""subnetwork"", //子网名
    //     ""subnetDisplayName"": ""CIO - 外部网络"", //子网显示名
    //     ""segmentCIDR"": ""10.10.0.0/24"", //网段信息
    //     ""gateway"": ""10.10.0.1"", //网关信息
    //     ""network_type"": 1, //网络类型，来源数据字典
    //     ""shared"": 1, //是否共享，来源数据字典
    //     ""state"": 1, //运行状态，来源数据字典
    //     ""status"": 1, //状态，来源数据字典
    //     ""region"": ""上海"", //地域
    //     ""dataCenter"": ""数据中心1"", //数据中心
    //     ""url"": ""https://192.168.1.1:443"" //连接url
    // }


export class Network {
    selected: boolean;
    id: string;
    tenantName: string; //所属企业名
    networkName: string; //网络名
    networkDisplayName: string; //网络显示名
    subnetName: string; //子网名
    subnetDisplayName: string; //子网显示名
    segmentCIDR: string; //网段信息
    gateway: string; //网关信息
    networkType: string; //网络类型，来源数据字典
    shared: string; //是否共享，来源数据字典
    state: string; //运行状态，来源数据字典
    status: string; //状态，来源数据字典
    region: string; //地域
    dataCenter: string; //数据中心

    platformId: string; //
    platformName: string;
    nameEditing:boolean;

}