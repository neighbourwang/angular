export class IpUsageMngModel {
    id: string; //IP地址ID
    addr: string; //IP地址
    instanceName: string; //占用IP的主机名
    tenantName: string; //企业名称
    status: string; //状态, 来源于数据字典
    description: string; //说明 

}