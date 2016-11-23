export class IpMngModel {
        id: string; //网络端口组ID
        dataCenter: string; //数据中心,VC中定义的
        clusterName: string; //集群名称
        clusterDisplayName: string; //集群显示名称
        portGroup: string; //标准端口组名称
        portGroupDisplayName: string; //标准端口组显示名称
        vlanId: string; //虚拟局域网ID
        segmentCIDR: string; //网段信息
        gateWay: string; //网关信息
        ipCount: string; //ip总数量
        usedIPCount: string; //已使用ip数量
        freeIPCount: string; //剩余ip数量

	checked: boolean = false;//ui operation
}