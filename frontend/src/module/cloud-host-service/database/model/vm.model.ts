class Vm {
    instanceName : string; //数据库名称
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

class InstanceVMProfile {
    description? : string;   //, optional): 主机描述 ,
    instanceDisplayName? : string;   //, optional): 主机实例的名称 ,
    instanceId? : string;   //, optional): 主机实例Id ,
    labelIds? : string[];   //[string], optional): 主机实例的标签 ,
    serviceLevel? : string;   //, optional): 主机实例的服务级别，参考数据字典:GLOBAL->SERVICE_LEVEL ,
    useType? : string;   //, optional): 主机实例的类型，参考数据字典:GLOBAL->USE_TYPE
}

export {
    Vm,
    InstanceVMProfile
}