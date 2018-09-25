export class ServiceInstanceItem{
    serviceId:string;
    serviceName:string;
    serviceInstanceType:string;
	vmItem:VMItem = null;
    diskInstanceItem:DiskInstanceItem = null;
    pmServiceItem:PMServiceItem= null;
    superviseNoInstanceItem:SuperviseNoInstanceItem = null;
}


export class VMItem {

    platformType:string;//平台类型 
    regionZone :string;///主机所属可用区 ,
    instanceName :string;//主机实例名称 ,
    vcpus :string; //CPU核数 ,
    memoryMb :string; //内存（MB） ,
    rootGb :string; //启动盘（GB） ,
    imageName :string;//镜像名称 ,
    privateIP :string;//主机私网IP ,
    publicIP:string;//主机公网IP ,

// billingInfo (ProductBillingItem, optional): 产品计费详细信息 ,
// createDate (Timestamp, optional),
// description (string, optional): 主机描述 ,
// diskCount (integer, optional): 主机所挂载硬盘个数 ,
// expiryDate (Timestamp, optional),


// itemId (string, optional): 主机实例Id ,

// networkType (string, optional): 主机网络类型 ,
// osInfo (string, optional): 主机操作系统信息 ,
// password (string, optional): 主机password ,
// paymentType (string, optional): 主机支付类型 ,
// platformId (string, optional): 平台信息，亦即：platformid信息 ,
// releaseDate (Timestamp, optional),

// runningMillionMeters (integer, optional): 运行时间 ,
// serviceLevel (string, optional): 服务级别，如：关键，高，中，低。见数据字典field=SERVICE_LEVEL ,
// snapshotCount (integer, optional): 主机所拥有快照个数 ,
// specification (string, optional): 主机规格信息，亦即：CPU和MEM信息 ,
// subInstanceId (string, optional): 订购实例ID ,
// subinstanceNo (string, optional): subinstance编号 ,
// useType (string, optional): 使用类型，如：生产，研发。见数据字典field=USE_TYPE ,
// uuid (string, optional),
// vmState (string, optional): 主机状态
}

export class DiskInstanceItem {
platformType :string;//平台类型 ,
name :string;//订购实例Name, 映射？ ,\
type :string;//存储类型, 映射？ ,
size :string; //存储容量, 映射？ ,
status :string;//存储的状态, 映射？ ,

relyName :string;//挂载依赖主机InstanceItem.name, 映射？ ,
useType :string;//用途：启动盘/数据盘 ,
platformName :string;//所在区域 ,
zoneName :string;//所在可用区



// billingInfo (ProductBillingItem, optional): 产品计费详细信息 ,
// expireDate (string, optional): 存储的实例的过期时间, 映射？ ,
// id (string, optional): 实例ID, 映射INS_VOLUME_INSTANCE.ID ,
// instanceItemId (string, optional): 订购实例Item ID, 映射？ ,

// platformId (string, optional): 平台ID ,

// sourceType (string, optional): 来源：订购/导入 ,
// relyId (string, optional): 挂载依赖主机InstanceItem.Id, 映射？ ,
// subInstanceId (string, optional): 订购实例ID ,

// unloadAble (string, optional): 是否可卸载, 映射？ ,

// uuid (string, optional): 实例UUID ,

}



export class PMServiceItem {
pmName:string;//物理机名称


privateIP:string;//
publicIP :string;//

pmConfInfo :string;////区域

poolRegionInfo:string;//可用区

appendService :string;//
expireDate :string;//
hostName :string;//
osInfo :string;//

pmId :string;//

serviceLevel :string;//
serviceType :string;//
startDate :string;//

status:string;//
statusName :string;//
subinstanceId :string;//
uuid :string;//
}

export class SuperviseNoInstanceItem {
region:string;//区域 ,
zone :string;// 可用区
instanceType:string;//实例类型 ,
instanceId:string;// 实例id ,
instanceName :string;//实例名称 ,
}