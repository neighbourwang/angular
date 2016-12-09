
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
    platform : OrderService = new OrderService();
    zone : OrderService = new OrderService();
    diskinitialsize : OrderService = new OrderService();
    disktype : OrderService = new OrderService();
    diskmounthostid : OrderService = new OrderService();
    diskmaxsize : OrderService = new OrderService();
    disksize : OrderService = new OrderService();
    diskstepsize : OrderService = new OrderService();
    storage : OrderService = new OrderService();
    diskinsname : OrderService = new OrderService();
    diskmounthostname : OrderService = new OrderService();
}

class SendModule {
    platform : VlueList = new VlueList();
    zone : VlueList = new VlueList();
    diskinitialsize : VlueList = new VlueList();
    disktype : VlueList = new VlueList();
    diskmounthostid : VlueList = new VlueList();
    diskmaxsize : VlueList = new VlueList();
    disksize : VlueList = new VlueList();
    diskstepsize : VlueList = new VlueList();
    storage : VlueList = new VlueList();
    diskinsname : VlueList = new VlueList();
    diskmounthostname : VlueList = new VlueList();
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
    SkuMap,
    BillingInfo,
    ProMap,
    TimeLineData,
    OrderList
}