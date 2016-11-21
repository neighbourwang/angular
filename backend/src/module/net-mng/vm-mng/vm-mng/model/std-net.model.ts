export class StdNet {
    selected: boolean = false;
    nameEditing: boolean;
    id: string = "";
    dcName: string = ""; //数据中心
    clusterName: string = "";//可用区（集群）名称
    clusterDisplayName: string;//可用区显示名称
    portDisplayName: string;//标准端口组显示名称
    portGroupName: string;//标准端口组名称
    vlanId: string;//VLANID
    stateDict: string; //状态，来源数据字典
    lastUpdate: string;
}