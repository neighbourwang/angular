

export class CostPandectItem{
    id:string;
    orderNo : string;
    name: string;//产品名称
    payWay:string;//付款方式
    department:string;//部门
    buyer: string;//购买人
    charge: string;//应付金额
    status:string;//支付状态
 
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
}