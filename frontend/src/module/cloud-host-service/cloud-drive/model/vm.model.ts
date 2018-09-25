class Vm {
    instanceName : string; //云主机名称
    specification : string; //配置
    //镜像缺少
    privateIp : string;//内部ip 
    publicIP : string;//外部ip
    regionZone : string; //可用区
    vmState : string;//状态
    expiryDate : string;//到期时间
    diskCount : number; //云盘数量
    snapshotCount : number ;//快照数量
    //附件服务缺少
    //支付类型 网络类型不明白
    //类型缺少
    //服务级别缺少
    constructor() {
    }
}

export {
    Vm
}