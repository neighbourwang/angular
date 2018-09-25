
class VlueList {
    attrValueId?: string = "";
    attrValueCode?: string = "";
    attrDisplayValue?: string = "";
    attrValue?: string = "";
    sku?:SkuMap;
    capacity?: number;
    osType?: number;
}

class OrderService {
    attrId: string = "";
    attrCode: string = "";
    attrDisplayName: string = "";
    valueType: number = null;
    mandatory: number = null;
    relyType: number = null;
    relyAttrId: string = "";
    valueList: VlueList[] = [];
    mapValueList: VlueList[] = [];
}

class OrderList {
    imagetype : OrderService = new OrderService();
    diskinitialsize? : OrderService = new OrderService();
    disktype? : OrderService = new OrderService();
    networktype : OrderService = new OrderService();
    billingmode : OrderService = new OrderService();
    cpu : OrderService = new OrderService();
    diskmounthostid? : OrderService = new OrderService();
    username : OrderService = new OrderService();
    diskstepsize? : OrderService = new OrderService();
    settingtype : OrderService = new OrderService();
    bootstorage : OrderService = new OrderService();
    bootsize : OrderService = new OrderService();
    timelineunit : OrderService = new OrderService();
    securitygroup : OrderService = new OrderService();
    diskinsname? : OrderService = new OrderService();
    diskmounthostname? : OrderService = new OrderService();
    storage : OrderService = new OrderService();
    instancename : OrderService = new OrderService();
    mem : OrderService = new OrderService();
    startupsource : OrderService = new OrderService();
    timeline : OrderService = new OrderService();
    diskmaxsize? : OrderService = new OrderService();
    storagesize? : OrderService = new OrderService();
    disksize? : OrderService = new OrderService();
    zone : OrderService = new OrderService();
    password : OrderService = new OrderService();
    platform : OrderService = new OrderService();
    os : OrderService = new OrderService();
}

class SendModule {
    imagetype : VlueList = new VlueList();
    diskinitialsize? : VlueList = new VlueList();
    disktype? : VlueList = new VlueList();
    networktype : VlueList = new VlueList();
    billingmode : VlueList = new VlueList();
    cpu : VlueList = new VlueList();
    diskmounthostid? : VlueList = new VlueList();
    username : VlueList = new VlueList();
    diskstepsize? : VlueList = new VlueList();
    settingtype : VlueList = new VlueList();
    bootstorage : VlueList = new VlueList();
    bootsize : VlueList = new VlueList();
    timelineunit : VlueList = new VlueList();
    securitygroup : VlueList = new VlueList();
    diskinsname? : VlueList = new VlueList();
    diskmounthostname? : VlueList = new VlueList();
    storage : VlueList = new VlueList();
    instancename : VlueList = new VlueList();
    mem : VlueList = new VlueList();
    startupsource : VlueList = new VlueList();
    timeline : VlueList = new VlueList();
    diskmaxsize? : VlueList = new VlueList();
    storagesize? : VlueList = new VlueList();
    disksize? : VlueList = new VlueList();
    zone : VlueList = new VlueList();
    password : VlueList = new VlueList();
    platform : VlueList = new VlueList();
    os : VlueList = new VlueList();
}

class AttrConfigList {
    IMAGETYPE : OrderService = new OrderService();
    DISKINITIALSIZE : OrderService = new OrderService();
    DISKTYPE : OrderService = new OrderService();
    NETWORKTYPE : OrderService = new OrderService();
    BILLINGMODE : OrderService = new OrderService();
    CPU : OrderService = new OrderService();
    DISKMOUNTHOSTID : OrderService = new OrderService();
    USERNAME : OrderService = new OrderService();
    DISKSTEPSIZE : OrderService = new OrderService();
    SETTINGTYPE : OrderService = new OrderService();
    BOOTSTORAGE : OrderService = new OrderService();
    BOOTSIZE : OrderService = new OrderService();
    TIMELINEUNIT : OrderService = new OrderService();
    SECURITYGROUP : OrderService = new OrderService();
    DISKINSNAME : OrderService = new OrderService();
    DISKMOUNTHOSTNAME : OrderService = new OrderService();
    STORAGE : OrderService = new OrderService();
    INSTANCENAME : OrderService = new OrderService();
    MEM : OrderService = new OrderService();
    STARTUPSOURCE : OrderService = new OrderService();
    TIMELINE : OrderService = new OrderService();
    DISKMAXSIZE : OrderService = new OrderService();
    STORAGESIZE : OrderService = new OrderService();
    DISKSIZE : OrderService = new OrderService();
    ZONE : OrderService = new OrderService();
    PASSWORD : OrderService = new OrderService();
    PLATFORM : OrderService = new OrderService();
    OS : OrderService = new OrderService();
}

class Values {
    IMAGETYPE : VlueList = new VlueList;
    DISKINITIALSIZE : VlueList = new VlueList;
    DISKTYPE : VlueList = new VlueList;
    NETWORKTYPE : VlueList = new VlueList;
    BILLINGMODE : VlueList = new VlueList;
    CPU : VlueList = new VlueList;
    DISKMOUNTHOSTID : VlueList = new VlueList;
    USERNAME : VlueList = new VlueList;
    DISKSTEPSIZE : VlueList = new VlueList;
    SETTINGTYPE : VlueList = new VlueList;
    BOOTSTORAGE : VlueList = new VlueList;
    BOOTSIZE : VlueList = new VlueList;
    TIMELINEUNIT : VlueList = new VlueList;
    SECURITYGROUP : VlueList = new VlueList;
    DISKINSNAME : VlueList = new VlueList;
    DISKMOUNTHOSTNAME : VlueList = new VlueList;
    STORAGE : VlueList = new VlueList;
    INSTANCENAME : VlueList = new VlueList;
    MEM : VlueList = new VlueList;
    STARTUPSOURCE : VlueList = new VlueList;
    TIMELINE : VlueList = new VlueList;
    DISKMAXSIZE : VlueList = new VlueList;
    STORAGESIZE : VlueList = new VlueList;
    DISKSIZE : VlueList = new VlueList;
    ZONE : VlueList = new VlueList;
    PASSWORD : VlueList = new VlueList;
    PLATFORM : VlueList = new VlueList;
    OS : VlueList = new VlueList;
}

class ValuesList {
    IMAGETYPE : VlueList[] = [];
    DISKINITIALSIZE : VlueList[] = [];
    DISKTYPE : VlueList[] = [];
    NETWORKTYPE : VlueList[] = [];
    BILLINGMODE : VlueList[] = [];
    CPU : VlueList[] = [];
    DISKMOUNTHOSTID : VlueList[] = [];
    USERNAME : VlueList[] = [];
    DISKSTEPSIZE : VlueList[] = [];
    SETTINGTYPE : VlueList[] = [];
    BOOTSTORAGE : VlueList[] = [];
    BOOTSIZE : VlueList[] = [];
    TIMELINEUNIT : VlueList[] = [];
    SECURITYGROUP : VlueList[] = [];
    DISKINSNAME : VlueList[] = [];
    DISKMOUNTHOSTNAME : VlueList[] = [];
    STORAGE : VlueList[] = [];
    INSTANCENAME : VlueList[] = [];
    MEM : VlueList[] = [];
    STARTUPSOURCE : VlueList[] = [];
    TIMELINE : VlueList[] = [];
    DISKMAXSIZE : VlueList[] = [];
    STORAGESIZE : VlueList[] = [];
    DISKSIZE : VlueList[] = [];
    ZONE : VlueList[] = [];
    PASSWORD : VlueList[] = [];
    PLATFORM : VlueList[] = [];
    OS : VlueList[] = [];
}

interface CommonServiceAttrValue{
    bootStorageSize : number;
}

class SkuMap {
    productId:string = "";
    serviceName:string = "";
    serviceType:number = 0;
    skuId:string = "";
    commonServiceAttrValue : CommonServiceAttrValue;
}

class TimeLineData {
    code :string ;
    displayValue :string;
    field :string;
    owner :string;
    value :string;
}
interface BillingInfo {
    basePrice:number;
    basicPrice:number;
    billingId:string;
    billingMode:number;
    cyclePrice:number;
    periodType:number;
    unitPrice:number;
    unitType:number;
}
interface ProMap {
    billingInfo : BillingInfo;
    productId:string;
    productName:string;
    serviceId:string;
    serviceType:number;
}

interface Network{
    cidr: string;
    enableDhcp: string;
    gateway: string;
    ipVersion: boolean;
    networkDisplayName: string;
    networkId: string;
    networkName: string;
    networkType: string;
    networkcode: string;
}
interface Image {
    imageCode: string;
    imageDisplayName: string;
    imageId: string;
    imageName: string;
    imageType: string;
    osType: string;
    capacity: number;
}

export {
    VlueList,
    OrderService,
    SendModule,
    AttrConfigList,
    ValuesList,
    Values,
    TimeLineData,
    SkuMap,
    ProMap,
    BillingInfo,
    OrderList,
    Network,
    Image
}