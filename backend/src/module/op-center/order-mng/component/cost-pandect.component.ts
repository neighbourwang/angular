import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { CostPandectItem, CommonKeyValue,BillInfo,ConsumeSum,Time,Chart,CostPandectParam,SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-pandect',
	templateUrl: '../template/cost-pandect.component.html',
	styleUrls: ['../style/cost-pandect.less'],
	providers: []
})
export class CostPandectComponent implements OnInit{
	//企业消费概览
    d_chart = new Chart();
    ent_dht:any;

    b_chart = new Chart();
    ent_bar:any;

    h_chart = new Chart();
    ent_hbar:any;
    h_chart2 = new Chart();
    ent_hbar2:any;

@ViewChild("notice")
  	private _notice: NoticeComponent;

currentYear :number;
currentMonth : number;
lastDay:number;
_param:CostPandectParam = new CostPandectParam();
private _years:Array<Time>=[];
private _months:Array<Time>=[];
//企业下拉列表
private enterpriseLoader : ItemLoader<{id:string;name:string}>= null;

//订单类型
private _orderTypeDic:DicLoader = null;
//订购人
private _buyerLoader:ItemLoader<{id:string; name:string}> = null;

private orderItemLoader:ItemLoader<CostPandectItem> = null;//表格

private consumeLoader:ItemLoader<ConsumeSum> = null;//消费概览

private totalConsumeLoader:ItemLoader<CommonKeyValue> = null;//消费趋势-总消费
private increseConsumeLoader:ItemLoader<CommonKeyValue> = null;//消费趋势-新增消费

private topConsumeLoader:ItemLoader<BillInfo> = null;//TOP5消费总额-所有企业
private topConsumeDepartmentLoader:ItemLoader<BillInfo> = null;//TOP5消费总额-某个企业

private topIncreseConsumeLoader:ItemLoader<BillInfo> = null;//TOP5消费增长总额
private topIncreseConsumeDepartmentLoader:ItemLoader<BillInfo> = null;//TOP5消费增长总额-某个企业
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
        
        this.enterpriseLoader = new ItemLoader<{id:string;name:string}> (false,'企业列表加载错误','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);
        this.orderItemLoader = new ItemLoader<CostPandectItem> (false,'消费总览列表加载错误','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);

          this.orderItemLoader.MapFunc = (source:Array<any>, target:Array<CostPandectItem>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
			}
		}

        //订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, 'ORDER_MNG.BUYER_DATA_ERROR', "check-center.submiter-list.get", this.restApiCfg, this.restApi);

        this._buyerLoader.MapFunc = (source:Array<any>, target:Array<{id:string;name:string}>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
				obj.id = item.key;
				obj.name = item.value;
			}
		}

        this._orderTypeDic = new DicLoader(restApiCfg, restApi, "ORDER", "TYPE");

    
       	this.consumeLoader = new ItemLoader<ConsumeSum>(false, '消费概览加载失败', "op-center.order-mng.cost-pandect.consume.post", this.restApiCfg, this.restApi);

        // this.consumeLoader.MapFunc = (source:Array<any>, target:Array<ConsumeSum>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
        //         obj.dbOrderPriceSum = item.dbOrderPriceSum;
        //         obj.diskOrderPriceSum = item.diskOrderPriceSum;
        //         obj.physicalMachineOrderPriceSum = item.physicalMachineOrderPriceSum;
        //         obj.vmOrderPriceSum = item.vmOrderPriceSum;
		// 		target.push(obj);
		// 	}
		// }
        this.consumeLoader.FakeDataFunc=(target:Array<ConsumeSum>)=>{
            let item = new ConsumeSum();
            item.dbOrderPriceSum = 121;
            item.diskOrderPriceSum = 98;
            item.physicalMachineOrderPriceSum = 32;
            item.vmOrderPriceSum = 145;
        }
        this.totalConsumeLoader = new ItemLoader<CommonKeyValue>(false, '消费趋势-总消费加载失败', "op-center.order-mng.cost-pandect.total.post", this.restApiCfg, this.restApi);

        // this.totalConsumeLoader.MapFunc = (source:Array<any>, target:Array<Consume>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);
		// 	}
		// }
        this.increseConsumeLoader = new ItemLoader<CommonKeyValue>(false, '消费趋势-新增消费加载失败', "op-center.order-mng.cost-pandect.increase.post", this.restApiCfg, this.restApi);
        this.topConsumeLoader = new ItemLoader<BillInfo>(false, 'TOP5消费排名加载失败', "op-center.order-mng.cost-pandect.enterprise-top.post", this.restApiCfg, this.restApi);
        this.topConsumeDepartmentLoader = new ItemLoader<BillInfo>(false, 'TOP5消费排名加载失败', "op-center.order-mng.cost-pandect.department-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeLoader = new ItemLoader<BillInfo>(false, 'TOP5新增消费排名加载失败', "op-center.order-mng.cost-pandect.increase-enterprise-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeDepartmentLoader = new ItemLoader<BillInfo>(false, 'TOP5新增消费排名加载失败', "op-center.order-mng.cost-pandect.increase-department-top.post", this.restApiCfg, this.restApi);


}
	ngOnInit(){
        this.layoutService.show();
        this.getCurrentTime();
        this.getTimeData();//时间下拉列表
        this.loadEnterprise();
        // this.search_chart();
        // this._buyerLoader.Go(null, [{key:"departmentId", value:null}])
        // .then(success=>{
        //    this._orderTypeDic.Go();
        // })
        // .catch(err=>{
		// 	this.layoutService.hide();
		// 	this.showMsg(err);
		// });
		this.layoutService.hide();
	}
getCurrentTime(){
    let date = new Date();
    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth()+1;
}

getTimeData(){
    
    for(let i = 1999; i<=this.currentYear ; i++){
        let _year = new Time(i.toString(),i.toString());
        this._years.push(_year);  
    }

    
}
getMonths(){
    this._months.splice(0,this._months.length);
    this._param.month = null;
    let months :number; 
   
    if( this.currentYear== Number(this._param.year)){
         months = this.currentMonth;
    }
    else{
        months = 12;
    }
        for(let i = 1; i<=months ; i++){
            let _month = new Time(i.toString(),i.toString());

            this._months.push(_month);  
   }
}

getLastDay(){
     this.lastDay = new Date(Number(this._param.year),Number(this._param.month),0).getDate();
    //  alert(this.lastDay);
}


	loadEnterprise():Promise<any>{
		return new Promise((resolve, reject)=>{
			this.enterpriseLoader.Go()
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			})
		});
	}

loadChart(){
    let _endTime : string;
    this._param.month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
     let param ={
            endTime: this._param.year+'-'+this._param.month+'-'+this.lastDay+' 23:59:59',
            startTime:this._param.year+'-'+this._param.month+'-01'+' 00:00:00',
            ids:[]
        }
    let enterprises : Array<{key:string;}>=[];

    if(this._param.enterpriseId==null){    
            for(let item of this.enterpriseLoader.Items){
                let ent = {key:item.id};
                enterprises.push(ent);
            }       
    }
    else{
        enterprises.push({key:this._param.enterpriseId});
    }
     param.ids = enterprises;
     //this.consumeLoad(param);
     //this.totalconsumeLoad(param);
     //this.increseConsumeLoad(param);
     this.topConsumeLoad(param);
     this.topIncreseConsumeLoad(param);
}

consumeLoad(param:any){
    this.layoutService.show();
    this.consumeLoader.Go(null,null,param)
     .then(success=>{
         console.log(this.consumeLoader.FirstItem);
        this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}

totalconsumeLoad(param:any){
    this.layoutService.show();
    this.totalConsumeLoader.Go(null,null,param)
     .then(success=>{
       this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}
increseConsumeLoad(param:any){
    this.layoutService.show();
    this.increseConsumeLoader.Go(null,null,param)
     .then(success=>{
        this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}
topConsumeLoad(param:any){
    this.layoutService.show();
    if(this._param.enterpriseId==null){
        this.topConsumeLoader.Go(null,null,param)
        .then(success=>{
            this.topToDatas(this.h_chart,this.topConsumeLoader.Items);
             this.h_chart.datas = [13,15,24,50];
            	this.ent_hbar=[{
                        label:'消费总额',
                        data: this.h_chart.datas
                         
                    }];
           this.h_chart.labels = ["云主机", "云硬盘", "数据库", "物理机"];
            this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        })
    }else{
        this.topConsumeDepartmentLoader.Go(null,null,param)
        .then(success=>{
           this.topToDatas(this.h_chart,this.topConsumeDepartmentLoader.Items);
             this.h_chart.datas = [13,15,24,50];
            	this.ent_hbar=[{
                        label:'消费总额',
                        data: this.h_chart.datas
                         
                    }];
            this.h_chart.labels = ["云主机", "云硬盘", "数据库", "物理机"];
     
            this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        }) 
    }
    
     
}

topIncreseConsumeLoad(param:any){
    this.layoutService.show();
      if(this._param.enterpriseId==null){
        this.topIncreseConsumeLoader.Go(null,null,param)
        .then(success=>{
               this.topToDatas(this.h_chart2,this.topIncreseConsumeLoader.Items);
               this.h_chart2.datas = [13,15,24,50];
            	this.ent_hbar2=[{
                        label:'消费总额',
                        data: this.h_chart2.datas
                         
                    }];
                    this.h_chart2.labels = ["云主机", "云硬盘", "数据库", "物理机"];
             this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        })
    }else{
        this.topIncreseConsumeDepartmentLoader.Go(null,null,param)
        .then(success=>{
                this.topToDatas(this.h_chart2,this.topIncreseConsumeDepartmentLoader.Items);
                 this.h_chart2.datas = [13,15,24,50];
            	this.ent_hbar2=[{
                        label:'消费总额',
                        data: this.h_chart2.datas
                         
                    }];
                    this.h_chart2.labels = ["云主机", "云硬盘", "数据库", "物理机"];
               this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        }) 
    }
    
}


topToDatas(target:Chart,items:Array<any>){
    let datas:Array<number> = [];
    let labels:Array<string>=[];
    // for(let i = 0;i<items.length;i++){
    //     datas[i] = items[i].amount;
    // }
    if(items.length>=0){
        for(let item of items){
        datas.push(item.amount);
        labels.push(item.name);
    }
    }    
   target.datas = datas;
   target.labels = labels;
}


search_chart(){
    this.setCommonDatas();
   
    //this.loadChart();
    
//     _datas = [this.consumeLoader.FirstItem.physicalMachineOrderPriceSum,this.consumeLoader.FirstItem.dbOrderPriceSum,this.consumeLoader.FirstItem.diskOrderPriceSum,this.consumeLoader.FirstItem.vmOrderPriceSum];
//     _colors = ["#08C895","#82B6B2","#6F7DC8","#2BD2C8"];
//     _labels = [
//                         '物理机：'+25,
//                         '数据库：'+ 57,
//                         '云硬盘：'+ 173,
//                         '云主机：'+ 200,
//                     ];
//     this.dht_chart(_datas,_colors,_labels);

//    _datas = this.toDatas(this.totalConsumeLoader.Items);
//    _colors = [
//                 {
//                     backgroundColor: [
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8'
//                     ],
//                     borderColor: [
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8',
//                         '#2BD2C8'
//                     ]
//                 },{

//                     backgroundColor: "rgba(75,192,192,0.4)",
//                     borderColor: "rgba(75,192,192,1)",
//                     pointBorderColor: "rgba(75,192,192,1)",
//                     pointBackgroundColor: "#fff",
//                     pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                     pointHoverBorderColor: "rgba(220,220,220,1)",
//                 }
//             ];

//     _labels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
//     _options = {
//                 scales: {
//                     xAxes: [{
//                         display: false
//                     }],
//                     yAxes: [{
//                         stacked: true

//                     }]
//                 }
//             };
//     this.bar_chart(_datas,_colors,_labels,_options);

}

//部门消费概览
 dht_chart(datas:Array<number>,colors:Array<any>,lables:Array<any>,options?:any){
         this.ent_dht=[{
                        data: datas,
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];
          this.d_chart.colors = [
            {
                backgroundColor:colors
            }
        ];

        this.d_chart.labels=lables;
    }
setCommonDatas(){
     this.h_chart.datas = [13,15,24,50];
    this.ent_hbar=[{
        label:'消费总额',
        data: this.h_chart.datas
                         
     }];
    this.h_chart.labels = ["云主机", "云硬盘", "数据库", "物理机"];
   
        this.h_chart.colors  = [
                {
                    backgroundColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ],
                    borderColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ]
                }
            ];
            this.h_chart.options={
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            }
            };
         this.h_chart2.datas = [13,15,24,50];
            this.ent_hbar2=[{
            label:'消费总额',
            data: this.h_chart2.datas
                         
     }];
    this.h_chart2.labels = ["云主机", "云硬盘", "数据库", "物理机"];
             this.h_chart2.colors  = [
                {
                    backgroundColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ],
                    borderColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ]
                }
            ];
            this.h_chart2.options={
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
                                }]
                            }
            };
}


//部门消费趋势
bar_chart(datas:Array<number>,colors:Array<any>,lables:Array<any>,options?:any){
        //消费趋势
	this.ent_bar=[{
                        type: "bar",
                        label: "总消费",
                        data:datas,
                         
                    },{   type: 'line',
                            label: "新增消费",
                            fill: false,
                            lineTension: 0.1,
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data:datas,
                            spanGaps: false,
                        }
                   ];
    this.b_chart.colors = colors; 

    this.b_chart.labels = lables;
    
    this.b_chart.options = options;
}


//图表的事件
public chartClicked(e:any):void {
    console.log(e);
}

public chartHovered(e:any):void {
    console.log(e);
}


//进入账单管理页面
costManage(){
    this.router.navigateByUrl("op-center/order-mng/cost-manage");
}



showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}