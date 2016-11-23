export class EntProdMngTemplate {
    isSelected: boolean = false;
    id: string = '';
    name:string = '';

    enterpriseId: string;
    enterpriseName: string;

    regionId: string = '';
    regionName: string = '';

    
    serviceName : string = '';
    billingCycl : string = '';//计价方式
    billingCycleDisplay : string = ''; //显示的方式，需要查数据字典

    status : string = '';
    statusDisplay : string = '';

    description: string;

    platformName :string = '';

}