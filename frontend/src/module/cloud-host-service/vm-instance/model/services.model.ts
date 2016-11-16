
class VlueList {
    attrValueId?: string = "";
    attrValueCode?: string = "";
    attrDisplayValue?: string = "";
    attrValue?: any;
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
    bootsize: OrderService = new OrderService();
    bootstorage: OrderService = new OrderService();
    cpu: OrderService = new OrderService();
    disk: OrderService = new OrderService();
    imagetype: OrderService = new OrderService();
    instancename: OrderService = new OrderService();
    mem: OrderService = new OrderService();
    networktype: OrderService = new OrderService();
    os: OrderService = new OrderService();
    password: OrderService = new OrderService();
    platform: OrderService = new OrderService();
    securitygroup: OrderService = new OrderService();
    settingtype: OrderService = new OrderService();
    startupsource: OrderService = new OrderService();
    storage: OrderService = new OrderService();
    storagesize: OrderService = new OrderService();
    // stroagesize: OrderService = new OrderService();
    timeline: OrderService = new OrderService();
    timelineunit: OrderService = new OrderService();
    username: OrderService = new OrderService();
    zone: OrderService = new OrderService();
}

class SendModule {
    bootsize: VlueList = new VlueList();
    bootstorage: VlueList = new VlueList();
    cpu: VlueList = new VlueList();
    disk: VlueList = new VlueList();
    imagetype: VlueList = new VlueList();
    instancename: VlueList = new VlueList();
    mem: VlueList = new VlueList();
    networktype: VlueList = new VlueList();
    os: VlueList = new VlueList();
    password: VlueList = new VlueList();
    platform: VlueList = new VlueList();
    securitygroup: VlueList = new VlueList();
    settingtype: VlueList = new VlueList();
    startupsource: VlueList = new VlueList();
    storage: VlueList = new VlueList();
    storagesize: VlueList = new VlueList();
    // stroagesize: VlueList = new VlueList();
    timeline: VlueList = new VlueList();
    timelineunit: VlueList = new VlueList();
    username: VlueList = new VlueList();
    zone: OrderService = new OrderService()
}

class TimeLineData {
    code :string ;
    displayValue :string;
    field :string;
    owner :string;
    value :string;
}

export {
    VlueList,
    OrderService,
    SendModule,
    TimeLineData,
    OrderList
}