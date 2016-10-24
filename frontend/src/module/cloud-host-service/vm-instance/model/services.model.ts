
class VlueList {
    id: string;
    code: string;
    displayName: string;
    value: string
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
    bootsize : OrderService = new OrderService();
    bootstorage : OrderService = new OrderService();
    boottype : OrderService = new OrderService();
    cpu : OrderService = new OrderService();
    imagetype : OrderService = new OrderService();
    mem : OrderService = new OrderService();
    os : OrderService = new OrderService();
    osversion : OrderService = new OrderService();
    region : OrderService = new OrderService();
    storage : OrderService = new OrderService();
    storagetype : OrderService = new OrderService();
    timeline : OrderService = new OrderService();
    zone : OrderService = new OrderService();
}

export {
    VlueList,
    OrderService,
    OrderList
}