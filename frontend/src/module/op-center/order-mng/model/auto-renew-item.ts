export class AutoRenewItem{
    zone: string = null;
    platform: string = null;
    instanceName: string = null;
    billingMode: string = null;
    password: string = null;
    serviceType: number = null;
    expireDate: string = null;
    oneTimePrice: number = null;
    price: number = null;
    periodType: number = null;
    autoRenewalCycle: number = 1;
    settingType: string = null;
    extendType: number = null;
    serivceRenewWayProductItems: Array<SerivceRenewWayProductItem> = [];

    pushSerivceRenewWayProductItem() {
        let serivceRenewWayProductItem = new SerivceRenewWayProductItem();
        this.serivceRenewWayProductItems.push(serivceRenewWayProductItem);
    }

    clearSerivceRenewWayProductItems(){
        this.serivceRenewWayProductItems = [];
    }
}

export class SerivceRenewWayProductItem{
    billingInfo:BillingInfo = new BillingInfo();
}

export class BillingInfo{
    periodType: number = null;
    billingCycle: number = null;
    cyclePrice: number = null;
    extendType: number = null;

    extendTypeToPeriodType() {
        let periodTypeMap = {
            '3': 1,
            '5': 2,
        }
        this.extendType = periodTypeMap[String(this.periodType)];
    }
}