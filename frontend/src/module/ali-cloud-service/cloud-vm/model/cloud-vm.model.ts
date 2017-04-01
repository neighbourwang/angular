import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";

export class orderVmPageModel {
    RegionId: string = "";
    LocalName: string = "";
    checked: boolean = false;
    selected: boolean = false;
    areas: Array<AreaModel> = [];
    selectedArea: AreaModel = new AreaModel();
    selectedChargeType: string = "";//收费方式
    selectedImage: string = "";　//启动ｖｍ时用的imageId,可能还需要镜像类型
    selectedQuantity: number = 0; //购买量月份
    renew: string = "0";  //"0"表示不自动续费，"1"表示自动续费

    selectedNetworkType: string = "0"; //'0' 表示经典网络，'1'表示专有网络
    selectedNetworkId: string = "";

    selectedDisk: string = "";//云硬盘类型
    diskCount: string = "";//云硬盘G数

    Password: string = "";
    passwordCheck: string = "";
    InstanceName: string = ""; //vm的名称

    price: string = "  "; //vm的价格

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








