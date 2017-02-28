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
        
        this.enterpriseLoader = new ItemLoader<{id:string;name:string}> (false,'COMMON.ENTPRISE_OPTIONS_DATA_ERROR','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);
        this.orderItemLoader = new ItemLoader<CostPandectItem> (false,'ORDER_MNG.ERROR_LOADING_CONSUMPTION_LIST','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);

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

    
       	this.consumeLoader = new ItemLoader<ConsumeSum>(false, 'ORDER_MNG.CONSUMER_OVERVIEW_FAILED', "op-center.order-mng.cost-pandect.consume.post", this.restApiCfg, this.restApi);

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
        // this.consumeLoader.FakeDataFunc=(target:Array<ConsumeSum>)=>{
        //     let item = new ConsumeSum();
        //     item.dbOrderPriceSum = 121;
        //     item.diskOrderPriceSum = 98;
        //     item.physicalMachineOrderPriceSum = 32;
        //     item.vmOrderPriceSum = 145;
        // }
        this.totalConsumeLoader = new ItemLoader<CommonKeyValue>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.total.post", this.restApiCfg, this.restApi);

        // this.totalConsumeLoader.MapFunc = (source:Array<any>, target:Array<Consume>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);
		// 	}
		// }
        this.increseConsumeLoader = new ItemLoader<CommonKeyValue>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.increase.post", this.restApiCfg, this.restApi);
        this.topConsumeLoader = new ItemLoader<BillInfo>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.enterprise-top.post", this.restApiCfg, this.restApi);
        this.topConsumeDepartmentLoader = new ItemLoader<BillInfo>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.department-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeLoader = new ItemLoader<BillInfo>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.increase-enterprise-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeDepartmentLoader = new ItemLoader<BillInfo>(false, 'ORDER_MNG.DATA_LOADING_FAILED', "op-center.order-mng.cost-pandect.increase-department-top.post", this.restApiCfg, this.restApi);


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

    let enterprises : Array<{key:string;}>=[];

    let historyIds:Array<string>=[];

    let sumIds :Array<{key:String;value:string}> =[];

    if(this._param.enterpriseId==null||this._param.enterpriseId=='null'){    
            for(let item of this.enterpriseLoader.Items){
                let ent = {key:item.id};
                enterprises.push(ent);
                sumIds.push({key:item.id,value:item.name});
                historyIds.push(item.id);
            }       
    }
    else{
        enterprises.push({key:this._param.enterpriseId});
        let item = this.enterpriseLoader.Items.find(n=>n.id==this._param.enterpriseId);
        sumIds.push({key:this._param.enterpriseId,value:AdminListItem.name});
    }

    

    let param={
        endTime: this._param.year+'-'+this._param.month+'-'+this.lastDay+' 23:59:59',
        ids:[],
        size:Number(this._param.month)
    };

    
     param.ids = historyIds;


     this._param.month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
    
     let topParam ={
            endTime: this._param.year+'-'+this._param.month+'-'+this.lastDay+' 23:59:59',
            startTime:this._param.year+'-'+this._param.month+'-01'+' 00:00:00',
            ids:[]
        };
    topParam.ids = sumIds;
  

     this.consumeLoad(topParam);
     this.totalconsumeLoad(param);
     this.increseConsumeLoad(param);


     topParam.ids = enterprises;

     this.topConsumeLoad(topParam);
     this.topIncreseConsumeLoad(topParam);
}

consumeLoad(param:any){
    this.layoutService.show();
    this.consumeLoader.Go(null,null,param)
     .then(success=>{
         this.toSumDatas(this.consumeLoader.FirstItem,this.d_chart);
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
        this.toHistoryData(this.totalConsumeLoader.Items,this.b_chart);
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
        this.toIncreaseHistoryData(this.increseConsumeLoader.Items,this.b_chart);
        this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}
topConsumeLoad(param:any){
    this.layoutService.show();
    if(this._param.enterpriseId==null||this._param.enterpriseId=='null'){
        this.topConsumeLoader.Go(null,null,param)
        .then(success=>{
            this.topToDatas(this.h_chart,this.topConsumeLoader.Items);
            this.ent_hbar=[{
                        label:'消费总额',
                        data: this.h_chart.datas
                         
                    }];
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

            	this.ent_hbar=[{
                        label:'消费总额',
                        data: this.h_chart.datas
                         
                    }];
     
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
      if(this._param.enterpriseId==null||this._param.enterpriseId=='null'){
        this.topIncreseConsumeLoader.Go(null,null,param)
        .then(success=>{
              this.topToDatas(this.h_chart2,this.topIncreseConsumeLoader.Items);
            	this.ent_hbar2=[{
                        label:'消费总额',
                        data: this.h_chart2.datas
                         
                    }];
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
            	this.ent_hbar2=[{
                        label:'消费总额',
                        data: this.h_chart2.datas
                         
                    }];
               this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        }) 
    }
    
}

toSumDatas(source:any,target:Chart){
    let datas:Array<number>=[];
    let labels:Array<string>=[];
    if(source){
            datas.push(source.physicalMachineOrderPriceSum);
            datas.push(source.dbOrderPriceSum);
            datas.push(source.diskOrderPriceSum);
            datas.push(source.vmOrderPriceSum);  
            labels.push('物理机：'+source.physicalMachineOrderPriceSum);
            labels.push('数据库：'+source.dbOrderPriceSum);
            labels.push('云硬盘：'+source.diskOrderPriceSum);
            labels.push('云主机：'+source.vmOrderPriceSum); 
    }
    target.datas.splice(0,target.datas.length);
    target.labels.splice(0,target.labels.length);
    target.datas = datas;
    target.labels = labels;
}

toHistoryData(source:Array<any>,target:Chart){
    let datas:Array<number>=[];
    let labels :Array<string>=[];
    if(source){
        for(let item of source){
            datas.push(item.doubleValue);
            labels.push(item.num+'月');
        }
    }
    target.datas.splice(0,target.datas.length);
    target.labels.splice(0,target.labels.length);
    target.datas = datas;
    target.labels = labels;
}
toIncreaseHistoryData(source:Array<any>,target:Chart){
    let datas:Array<number>=[];
    if(source){
        for(let item of source){
            datas.push(item.doubleValue);
        }
    }
    target.datas2.splice(0,target.datas.length);
    target.datas2 = datas;
}
topToDatas(target:Chart,items:Array<any>){
    let datas:Array<number> = [];
    let labels:Array<string>=[];
    // for(let i = 0;i<items.length;i++){
    //     datas[i] = items[i].amount;
    // }
    if(items.length>0){
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
    this.loadChart();
}

setCommonDatas(){
  //this.loadChart();  wei-qi.huang@hpe.com
    this.d_chart.datas =[12,60,134,22];
    //_datas = [this.consumeLoader.FirstItem.physicalMachineOrderPriceSum,this.consumeLoader.FirstItem.dbOrderPriceSum,this.consumeLoader.FirstItem.diskOrderPriceSum,this.consumeLoader.FirstItem.vmOrderPriceSum];
    this.d_chart.colors = ["#08C895","#82B6B2","#6F7DC8","#2BD2C8"];
    this.d_chart.labels = [
                        '物理机：'+this.d_chart.datas[0],
                        '数据库：'+ this.d_chart.datas[1],
                        '云硬盘：'+ this.d_chart.datas[2],
                        '云主机：'+ this.d_chart.datas[3],
                    ];

       this.ent_dht=[{
                        data: this.d_chart.datas,
                        borderWidth:[
                            0,0,0,0
                        ]
                    }];
          this.d_chart.colors = [
            {
                backgroundColor:this.d_chart.colors
            }
        ];
    //消费趋势
    this.b_chart.datas = [22,55,42,71,159,99];
    this.b_chart.datas2 = [232,155,142,271,159,69];

   
   this.b_chart.colors = [
                {
                    backgroundColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ],
                    borderColor: [
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8',
                        '#2BD2C8'
                    ]
                },{

                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                }
            ];

    this.b_chart.labels = ["1月", "2月", "3月", "4月", "5月", "6月"];
    this.b_chart.options = {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true

                    }]
                }
            };


	this.ent_bar=[{
                        type: "bar",
                        label: "总消费",
                        data: this.b_chart.datas,
                         
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
                            data: this.b_chart.datas2,
                            spanGaps: false,
                        }
                   ];


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





//进入账单管理页面
costManage(){
    this.router.navigateByUrl("op-center/order-mng/cost-manage");
}



showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	
}