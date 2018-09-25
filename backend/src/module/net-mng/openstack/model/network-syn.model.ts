export class Network_Syn {
    selected: boolean;
    id: string;
    tenantName: string; //所属企业名
    networkName: string; //网络名
    subnetName: string; //子网名
    subnetDisplayName: string; //子网显示名
    segmentCIDR: string; //网段信息
    gateway: string; //网关信息
    networkType: string; //网络类型，来源数据字典
    shared: string; //是否共享，来源数据字典
    state: string; //运行状态，来源数据字典
    status: string; //状态，来源数据字典

    syncResult:string;
    uuid:string;
}