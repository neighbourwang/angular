

export class CostPandectItem{
    id:string;
    subinstanceCode : string;//已购服务编号
    productName : string;//产品名称
    num:string;//购买数量
    priceDetails:Array<SubInstancePriceDetail>=[];//费用类型，可能存在多种费用类型
    total_amount:string;//应付金额
 
}
export class  TimeCaculater{
    private date : Date = new Date();

    private currentYear:number;
	private currentMonth:number;

	private years:Array<{id:number;name:number;}>=[];
	private months:Array<{id:number;name:number;}>=[];

   getCurrentYear(){
		this.currentYear = this.date.getFullYear();
		return this.currentYear;
	}

	getCurrentMonth(){
		this.currentMonth = this.date.getMonth()+1;
		return this.currentMonth;
	} 

//年份下拉列表
	getYears(){
        if(this.years.length>0){
            this.years.splice(0,this.years.length);
        }
		for(let i = 1999; i<=this.currentYear ; i++){
			let year = {id:i,name:i};
        	this.years.push(year);
		}
        return this.years;
	}
//月份下拉列表
	getMonths(year:number){
        if(this.months.length>0){
            this.months.splice(0,this.months.length);
        }
        let _months :number; 
   
        if( this.currentYear== year){
            _months = this.currentMonth-1;
        }
        else{
            _months = 12;
        }
        for(let i = 1; i<=_months ; i++){
                let month = {id:i,name:i};
                this.months.push(month);
        }
        return this.months;
	}

	getLastDay(year:number,month:number){
		 return new Date(year,month,0).getDate();
	}
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

export class CostManageItem{

     id:string;
     
     startTime:string;
     endTime:string;//记账周期

     money:string;//账单金额
     endDate:string;//账单生成日
     sentDate:string;//账单发送日
     status:string;//账单状态
     statusName:string;//用于显示

    adjustAmount:string;//调整金额

    adjustReason:string;//调整项目
}

