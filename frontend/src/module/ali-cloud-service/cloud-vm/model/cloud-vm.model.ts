import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";

export class orderVmPageModel {
    RegionId: string = "";
    LocalName: string = "";
    checked: boolean = false;
    selected: boolean = false;
    areas: Array<AreaModel> = [];
    selectedArea: AreaModel = new AreaModel();

    selectedChargeType: string = "PostPaid";//===收费方式:PostPaid,按量付费,PrePaid,包年包月

    selectedNetworkType: string = "classic"; //==='classic' 表示经典网络，'vpc'表示专有网络
    AllocatePublicIP: boolean = true; //===经典网络时，显示带宽供选择
    selectedVpcId: string = null;
    selectedVswitchId: string = null;

    selectedInternetChargeType: string = "PayByTraffic"; //===经典网络时，带宽默认是按量方式    
    selectedInternetMaxBandwidthIn = null;
    selectedInternetMaxBandwidthOut = 1;//===
    

    SecurityGroupId: string = null;
    SecurityGroupName: string = null;

    selectedGeneration: string = null; //实例族
    selectedInstanceFamily: string = null;
    selectedInstanceType: string = null;
    ioOptimized_price: boolean = null;
    ioOptimized_vm: string = null;

    selectedImage: string = null;　//启动ｖｍ时用的imageId,可能还需要镜像类型

    selectedDisk: string = null;//云硬盘类型
    diskCount: string = "40";//===云硬盘G数


    selectedQuantity: number = null; //购买量月份
    vm_period: number = null;
    price_period: number = null;
    periodType: string = null;
    priceUnit: string = null;
    renew: boolean = null;  //"0"表示不自动续费，"1"表示自动续费 

    Password: string = null;
    passwordCheck: string = null;
    InstanceName: string = null; //vm的名称

    price: string = null; //vm的价格
    price_instance: string = null;
    price_traffic: string = null;

    toString() {
        return JSON.stringify(this);
    }
}

//>>>
export class imageModel {
/*
    ImageId: string = "";
    Description: string = "";
    ProductCode: string = "";
    OSType: string = "";
    Architecture: string = "";
    OSName: string = "";
    DiskDeviceMappings: DiskDeviceMappingModel = new DiskDeviceMappingModel();
    ImageOwnerAlias: string = "";
    Progress: string = "";
    IsSupportCloudinit: boolean = false;
    Usage: string = "";
    CreationTime: string = "";

    Tags: TagModel = new TagModel();

    ImageVersion: string = "";
    Status: string = "";
    ImageName: string = "";
    IsSupportIoOptimized: boolean = false;
    IsSelfShared: string = "";
    IsCopied: boolean = false;
    IsSubscribed: boolean = false;
    Platform: string = "";
    Size: number;
}
export class TagModel {
   Tag: Array<string> = []; 
}
export class DiskDeviceMappingModel {
        DiskDeviceMapping: Array<string> = []; 
}
*/
    platformName: string = "";
    images: Array<imageItemModel> = [];
}

export class imageItemModel {
    osname: string = "";
    ostype: string = "";
    ImageId: string = "";
    OSType: string = "";
    Architecture: string = "";
    OSName: string = "";
    ImageOwnerAlias: string = "";
    Status: string = "";
    Platform: string = "";
}
//<<<



export class QuantityModel {
    displayValue: string = "";
    monthnum: number = 0;
}


export class InstanceTypeModel {
    LocalStorageAmount:number = 0;
    LocalStorageCapacity:number = 0;
    CpuCoreCount:number = 0;
    InstanceTypeFamily:string = "";
    InstanceTypeId:string = "";
    GPUSpec:string = "";
    MemorySize:number = 0;
    GPUAmount:number = 0;
}


export class InstanceTypeFamilyModel {
    InstanceTypeFamilyId: string = "";
    Generation: string = "";
}

//>>>
export class VPCModel {
    CreationTime: string = "";
    CidrBlock: string = "";
    VpcName: string = "";
    Status: string = "";
    Description: string = "";
    VSwitchIds: VSwitchIdModel = new VSwitchIdModel();
    IsDefault: boolean = false;
    UserCidrs: UserCidrModel = new UserCidrModel();
    RegionId: string = "";
    VRouterId: string = "";
    VpcId: string = "";
}
export class VSwitchIdModel {
    VSwitchId: Array<string> = [];
}
export class UserCidrModel {
    UserCidr: Array<string> = [];
}
//<<<


export class VSwitchModel {
    CreationTime: string = "";
    CidrBlock: string = "";
    Status: string = "";
    Description: string = "";
    IsDefault: boolean = false;
    AvailableIpAddressCount: number = 0;
    VSwitchName: string = "";
    ZoneId: string = "";
    VSwitchId: string = "";
    VpcId: string = "";
}



//>>>
export class instanceListModel {
    AutoReleaseTime: string = "";
    ClusterId: string = "";
    Cpu: number = 0;
    CreationTime: string = "";
    Description: string = "";
    DeviceAvailable: boolean = false;
    EipAddress: EipAddressModel = new EipAddressModel();
    ExpiredTime: string = "";
    GPUAmount: number = 0;
    GPUSpec: string = "";
    HostName: string = "";
    ImageId: string = "";
    InnerIpAddress: IpAddressModel = new IpAddressModel();
    InstanceChargeType: string = "";
    InstanceId: string = "";
    InstanceName: string = "";
    InstanceNetworkType: string = "";
    InstanceType: string = "";
    InstanceTypeFamily: string = "";
    InternetChargeType: string = "";
    InternetMaxBandwidthIn: number = 0;
    InternetMaxBandwidthOut: number = 0;
    IoOptimized: boolean = false;
    Memory: number = 0;
    OperationLocks: OperationLocksModel = new OperationLocksModel();
    PublicIpAddress: IpAddressModel = new IpAddressModel();
    RegionId: string = "";
    SecurityGroupIds: SecurityGroupIdsModel = new SecurityGroupIdsModel();
    SerialNumber: string = "";
    SpotStrategy: string = "";
    Status: string = "";
    VlanId: string = "";
    VpcAttributes: VpcAttributesModel = new VpcAttributesModel();
    ZoneId: string = "";

    checked: boolean = false;
}
export class EipAddressModel {
    AllocationId: string  = "";
    InternetChargeType: string  = "";
    IpAddress: string  = "";
}
export class IpAddressModel {
    IpAddress: Array<string> = [];
}
export class OperationLocksModel {
    LockReason: Array<string> = [];
}
export class SecurityGroupIdsModel {
    SecurityGroupId: Array<string> = [];
}
export class VpcAttributesModel {
    NatIpAddress: string  = "";
    PrivateIpAddress: IpAddressModel = new IpAddressModel();
    VSwitchId: string  = "";
    VpcId: string  = "";
}
//<<<

//>>> FamilyTree
export class instanceFamilyTreeTypeIdModel {
    LocalStorageAmount:number = 0;
    LocalStorageCapacity:number = 0;
    instanceShowName: string = "";
    CpuCoreCount:string = "";
    InstanceTypeFamily:string = "";
    InstanceTypeId:string = "";
    GPUSpec:string = "";
    MemorySize:string = "";
    GPUAmount:string = "";
}

export class instanceFamilyTreeIdModel {
    instancefamilyid: string = "";
    instancefamilyShowName: string = "";
    instanceTypeIDModelList: Array<instanceFamilyTreeTypeIdModel> = [];
}

export class instanceFamilyTreeGenerationModel {
    generation: string = "";
    generationShowName: string = "";
    instancefamilyid: Array<instanceFamilyTreeIdModel> = [];
}
//<<<


//>>>
export class priceSubmitModel {
    orderType: string = "instance-buy";
    regionId: string = "";
    commodity: priceCommodityModel = new priceCommodityModel();
    zoneId: string = "";

}
export class priceCommodityModel {
    amount: number = 1;
    imageId: string = null;
    securityGroupId: string = null;
    securityGroupRule: string = null;
    autoRenew: boolean = false;
    instanceType: string = null;
    internetChargeType: string = null;
    internetMaxBandwidthOut: number = 0;
    ioOptimized: boolean = false;
    maxAmount: number = 1;
    networkType: string = null;
    vpcId: string = null;
    period: number = 0;
    periodType: string = null;
    priceUnit: string = null;
    systemDisk: systemDiskModel = new systemDiskModel();
}
export class systemDiskModel {
    category: string = null;
    size: string = null;
}
export class priceReturnModel {
    orderType: string = null;
    originalAmount: string = null;
    tradeAmount: string = null;
}
//<<<



export class securityGroupModel {
    CreationTime: string = "";
    Tags: TagModel = new TagModel();
    SecurityGroupId: string = null;
    SecurityGroupName: string = null
    Description: string = "";
    AvailableInstanceAmount: number = 0;
    VpcId: string = "";
}
export class TagModel {
    Tag: Array<string> = [];
}

export class GetSecGroupSubmitModel{
    accessinfo: accessinfoModel = new accessinfoModel();
    pageNumber: string = "1";
    pageSize: string = "50";
    vpcId: string = null;
}

export class orderSubmitModel {
  accessinfo: accessinfoModel = new accessinfoModel();
  autoRenew: boolean = false;
  autoRenewPeriod: string = null;
  clientToken: string = null;  
  description: string = null;
  hostName: string = null;
  imageId: string = null;
  instanceChargeType: string = null;
  instanceName: string = null;
  instanceType: string = null;
  internetChargeType: string = null;
  internetMaxBandwidthIn: number = null;
  internetMaxBandwidthOut: number = null;
  ioOptimized: string = null;
  nodeControllerId: string = null;
  password: string = null;
  period: number = null;
  privateIpAddress: string = null;
  securityGroupId: string = null;
  systemDiskCategory: string = null;
  systemDiskDescription: string = null;
  systemDiskDiskName: string = null;
  systemDiskSize: string = null;
  userData: string = null;
  vswitchId: string = null;
  zoneId: string = null;
}

export class accessinfoModel {
    accessId: string = null;
    accessSecret: string = null;
}

