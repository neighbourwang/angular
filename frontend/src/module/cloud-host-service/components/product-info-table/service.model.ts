interface RelatedList {
	productBillingItem: BillingModle;
	instanceId: string;
    instanceCode: string;
    specList: SpecList[];
    specification: string;
    status: number;
    createDate: number;
    expireDate: number;
    buyer: string;
    department: string;
    enterprise: string;
    instanceName: string;
    platform: string;
    zone: string;
    type: number;
    productType: string;
    extendType: string;
    quantity: number;
    period: number;
    relatedSubInstanceList: RelatedList[];
    relatedOrderList: RelatedList[];
    itemList: ItemList[];
}

interface BillingModle {
   	billingId: string;
    billingMode: number;
    basePrice: number;
    periodType: number;
    basicPrice: number;
    cyclePrice: number;
    unitPrice: number;
    unitType: number;
}

interface ItemList {
	status: number;
    quantity: number;
    createDate: string;
    expireDate: string;
    period: number;
    serviceType: number;
    billingInfo : BillingModle;
    specList: SpecList[];
    instanceName: string;
    buyer: string;
    departmentName: string;

}

interface SpecList{
	attrCode: string;
    attrDisplayName: string;
    attrValueCode: string;
    attrDisplayValue: string;
    valueUnit: string;
    attrOrderSeq: string;
    description: string
} 

export {
    RelatedList,
    ItemList,
    BillingModle,
    SpecList
}