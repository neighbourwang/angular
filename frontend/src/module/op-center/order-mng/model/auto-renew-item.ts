export class AutoRenewItem{
    instanceId: string = null;
    zone: string = null;
    platform: string = null;
    instanceName: string = null;
    billingMode: number = null;
    password: string = null;
    serviceType: number = null;
    expireDate: string = null;
    oneTimePrice: number = null;
    price: number = null;
    periodType: number = null;
    autoRenewalCycle: number = 1;
    settingType: string = null;
    extendType: number = null;
    onExtendType: number = null;
    subExtendType: number = null;
    isSelectedType: boolean = false;
    status: string = null;
    serivceRenewWayProductItems: Array<SerivceRenewWayProductItem> = [];
    renewOver: boolean = false;

    pushSerivceRenewWayProductItem() {
        let serivceRenewWayProductItem = new SerivceRenewWayProductItem();
        this.serivceRenewWayProductItems.push(serivceRenewWayProductItem);
    }

    clearSerivceRenewWayProductItems(){
        this.serivceRenewWayProductItems = [];
    }

    extendTypeToPeriodType() {
        let periodTypeMap = {
            '3': 1,
            '5': 2,
        }
        // this.subExtendType = periodTypeMap[String(this.periodType)];
        this.onExtendType = periodTypeMap[String(this.periodType)];
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
    basePrice: number = null;
    basicPrice: number = null;

    extendTypeToPeriodType() {
        let periodTypeMap = {
            '3': 1,
            '5': 2,
        }
        this.extendType = periodTypeMap[String(this.periodType)];
    }
}
