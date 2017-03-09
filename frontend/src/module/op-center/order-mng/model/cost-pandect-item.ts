

export class CostPandectItem{
    id:string;
    orderNo : string;//已购服务编号
    productName : string;//产品名称
    num:string;//购买数量
    priceDetails:Array<SubInstancePriceDetail>;//费用类型，可能存在多种费用类型
    total_amount:string;//应付金额
 
}

export class SubInstancePriceDetail {
amount :number;//金额 
billName:string;/// 计费名称(一次性费用/周期费用等 ,
payUnit:string;//计费单位（次/月/年/季度)
}
export class  Time{
    constructor(id:string,name:string) {
        this.id = id;
        this.name = name;
    }
 
   id:string = null;
   name:string = null;
}

//消费概览 云主机-物理机-数据库-云硬盘
export class  ConsumeSum{
    dbOrderPriceSum : number = 0;//数据库
    diskOrderPriceSum  : number = 0; //云硬盘
    physicalMachineOrderPriceSum :number = 0;//物理机
    vmOrderPriceSum : number = 0; //云主机
}

//TOP统计图
export class BillInfo{
    amount:number = 0;
    id:string = null;
    month : number =0;
    name : string = null;
}

export class CommonKeyValue {
doubleValue:number;//在消费中心中，作为每个月的金额 ,
key:string;
num:string;//在消费中心中，作为月份 ,
value:String;

}
export class  Chart{
 
    datas:Array<number> = [];
    datas2:Array<number> = [];//复合统计图的第二个数据，简单统计图不需要
    colors:Array<any> = [];
    labels:Array<any> = [];
    options:any;
    // setAllDatas(datas:Array<number>,colors:Array<any>,labels:Array<any>,options?:any){
    //     this.datas = datas;
    //     this.colors = colors;
    //     this.labels = labels;
    //     if(options){
    //         this.options = options;
    //     }
    // }
    clear(){
        this.datas = [];
        this.datas2 = [];
        this.colors = [];
        this.labels = [];
        this.options = null;
    }
}