
class VlueList {
    attrValueId?: string = "";
    attrValueCode?: string = "";
    attrDisplayValue?: string = "";
    attrValue?: any;
    value?:string;
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
    diskinitialsize : OrderService = new OrderService();
    disktype : OrderService = new OrderService();
    networktype : OrderService = new OrderService();
    billingmode : OrderService = new OrderService();
    cpu : OrderService = new OrderService();
    diskmounthostid : OrderService = new OrderService();
    username : OrderService = new OrderService();
    diskstepsize : OrderService = new OrderService();
    settingtype : OrderService = new OrderService();
    bootstorage : OrderService = new OrderService();
    bootsize : OrderService = new OrderService();
    timelineunit : OrderService = new OrderService();
    securitygroup : OrderService = new OrderService();
    diskinsname : OrderService = new OrderService();
    diskmounthostname : OrderService = new OrderService();
    storage : OrderService = new OrderService();
    instancename : OrderService = new OrderService();
    mem : OrderService = new OrderService();
    startupsource : OrderService = new OrderService();
    timeline : OrderService = new OrderService();
    diskmaxsize : OrderService = new OrderService();
    storagesize : OrderService = new OrderService();
    disksize : OrderService = new OrderService();
    zone : OrderService = new OrderService();
    password : OrderService = new OrderService();
    platform : OrderService = new OrderService();
    os : OrderService = new OrderService();
}

class SendModule {
    imagetype : VlueList = new VlueList();
    diskinitialsize : VlueList = new VlueList();
    disktype : VlueList = new VlueList();
    networktype : VlueList = new VlueList();
    billingmode : VlueList = new VlueList();
    cpu : VlueList = new VlueList();
    diskmounthostid : VlueList = new VlueList();
    username : VlueList = new VlueList();
    diskstepsize : VlueList = new VlueList();
    settingtype : VlueList = new VlueList();
    bootstorage : VlueList = new VlueList();
    bootsize : VlueList = new VlueList();
    timelineunit : VlueList = new VlueList();
    securitygroup : VlueList = new VlueList();
    diskinsname : VlueList = new VlueList();
    diskmounthostname : VlueList = new VlueList();
    storage : VlueList = new VlueList();
    instancename : VlueList = new VlueList();
    mem : VlueList = new VlueList();
    startupsource : VlueList = new VlueList();
    timeline : VlueList = new VlueList();
    diskmaxsize : VlueList = new VlueList();
    storagesize : VlueList = new VlueList();
    disksize : VlueList = new VlueList();
    zone : VlueList = new VlueList();
    password : VlueList = new VlueList();
    platform : VlueList = new VlueList();
    os : VlueList = new VlueList();
}

class SkuMap {
    productId:string = "";
    serviceName:string = "";
    serviceType:number = 0;
    skuId:string = "";
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

export {
    VlueList,
    OrderService,
    SendModule,
    TimeLineData,
    SkuMap,
    ProMap,
    BillingInfo,
    OrderList
}