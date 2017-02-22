

export class CostPandectItem{

 
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

//其他三个统计图
export class Consume{
    amount:number = 0;
    id:string = null;
    month : number =0;
    name : string = null;
}
export class  Chart{
 
    datas:Array<number> = null;
    colors:Array<any> = null;
    labels:Array<any> = null;
    options:any = null;
    setAllDatas(datas:Array<number>,colors:Array<any>,labels:Array<any>,options?:any){
        this.datas = datas;
        this.colors = colors;
        this.labels = labels;
        if(options){
            this.options = options;
        }
    }
}