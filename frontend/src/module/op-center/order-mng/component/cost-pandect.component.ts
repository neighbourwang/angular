import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {OrderDetailItem,CostManageItem,TimeCaculater,UserInfo,CostPandectItem, CommonKeyValue,BillInfo,ConsumeSum,Time,Chart,CostPandectParam,SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { OrderMngService,CreatChartService} from '../service';
import * as _ from 'underscore';

@Component({
	selector: 'cost-pandect',
	templateUrl: '../template/cost-pandect.component.html',
	styleUrls: ['../style/cost-pandect.less','../style/order-mng-detail.less'],
	providers: [OrderMngService,CreatChartService]
})
export class CostPandectComponent implements OnInit{
	//企业消费概览
    sumChart =new Chart();

    historyChart=new Chart();

    topChart =new Chart();

    topIncreaseChart =new Chart();

@ViewChild("notice")
  	private _notice: NoticeComponent;

size:number=12; 
isRoot = false;

currentYear :number;
currentMonth : number;
lastDay:number;
_param:CostPandectParam = new CostPandectParam();
private timeCaculater :TimeCaculater = new TimeCaculater();
private _years=[];
private _months=[];
private userTypeLoader:ItemLoader<UserInfo>= null;


//企业下拉列表
private enterpriseLoader : ItemLoader<{id:string;name:string}>= null;

private allServiceLoader:ItemLoader<CostPandectItem> = null;//表格-所有服务
private increaseServiceLoader:ItemLoader<CostPandectItem> = null;//表格-新增服务
private isAllService:string ='1';//1是所有服务，2是新增服务

private consumeLoader:ItemLoader<ConsumeSum> = null;//消费概览

private totalConsumeLoader:ItemLoader<CommonKeyValue> = null;//消费趋势-总消费
private increseConsumeLoader:ItemLoader<CommonKeyValue> = null;//消费趋势-新增消费

private topConsumeLoader:ItemLoader<BillInfo> = null;//TOP5消费总额-所有企业
private topConsumeDepartmentLoader:ItemLoader<BillInfo> = null;//TOP5消费总额-某个企业

private topIncreseConsumeLoader:ItemLoader<BillInfo> = null;//TOP5消费增长总额
private topIncreseConsumeDepartmentLoader:ItemLoader<BillInfo> = null;//TOP5消费增长总额-某个企业

private downLoadItemLoader:ItemLoader<CostManageItem> = null;//下载账单表格数据
private downLoadHandler:ItemLoader<CostManageItem> = null;//下载账单表格数据

	//已购服务详情加载
	private _orderDetailLoader: ItemLoader<OrderDetailItem> = null;
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi,
        private service:OrderMngService,
        private chartService:CreatChartService){

        this.currentYear = this.timeCaculater.getCurrentYear();
        this.currentMonth = this.timeCaculater.getCurrentMonth();
        this._param.year = this.currentYear.toString(); 
        this._param.month = (this.currentMonth-1).toString(); 
        
        this.sumChart = this.chartService.creatSumChart();
        this.historyChart = this.chartService.createHstoryBar();
        this.topChart = this.chartService.createTopBar();
        this.topIncreaseChart = this.chartService.createTopIncreaseBar();

        this.enterpriseLoader = new ItemLoader<{id:string;name:string}> (false,'企业列表加载错误','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);
        this.userTypeLoader = new ItemLoader<UserInfo> (false,'用户类型加载出错','op-center.order-mng.ent-type.get',this.restApiCfg,this.restApi);
        this.downLoadItemLoader = new ItemLoader<CostManageItem> (false,'下载账单数据加载出错','op-center.order-mng.cost-manage.post',this.restApiCfg,this.restApi);
       	this.downLoadItemLoader.MapFunc =(source:Array<any>,target:Array<CostManageItem>)=>{
			for(let item of source){
				let obj = new CostManageItem();
				target.push(obj);
				obj.id=item.id;
				obj.startTime = item.startTime;
				obj.endTime = item.endTime;
				obj.money = item.amount;
				obj.endDate = item.billDate;
				obj.sentDate = item.sendDate;
				obj.status = item.status;
			}
		}
        this.downLoadHandler = new ItemLoader<CostManageItem> (false,'下载出错','op-center.order-mng.cost-pandect.bill-download.post',this.restApiCfg,this.restApi);


        this.userTypeLoader.MapFunc = (source:Array<any>, target:Array<UserInfo>)=>{
                let obj = new UserInfo();
                for(let item of source){
                obj.enterpriseId = item.enterpriseId;
				obj.enterpriseName = item.enterpriseName;
                obj.roleName = item.roles[0].roleName;
                }
				
                target.push(obj);
			
		}

        this.allServiceLoader = new ItemLoader<CostPandectItem> (false,'消费总览所有服务列表加载错误','op-center.order-mng.cost-pandect.all-service.post',this.restApiCfg,this.restApi);
        this.increaseServiceLoader = new ItemLoader<CostPandectItem> (false,'消费总览新增服务列表加载错误','op-center.order-mng.cost-pandect.increase-service.post',this.restApiCfg,this.restApi);

        this.allServiceLoader.Trait = (target:Array<CostPandectItem>)=>{
            for(let item of target){
                if(item.priceDetails){
                    for(let priceDetailItem of item.priceDetails){
                        if(priceDetailItem.billName=='一次性费用'){
                            priceDetailItem.isShow = false;
                           
                            // priceDetailItem.amount = Number(priceDetailItem.amount.toFixed(2));
                            item.total_amount=item.total_amount-priceDetailItem.amount;
                            item.total_amount = Number(item.total_amount.toFixed(2));

                        }else{    
                            priceDetailItem.isShow = true;
                        }
                    }
                }
            } 
        }
        this.increaseServiceLoader.Trait = (target:Array<CostPandectItem>)=>{
            for(let item of target){
                if(item.priceDetails){
                    for(let priceDetailItem of item.priceDetails){
                        if(priceDetailItem.billName=='一次性费用'){
                            priceDetailItem.isShow = false;
                            item.total_amount=item.total_amount-priceDetailItem.amount;
                            item.total_amount = Number(item.total_amount.toFixed(2));
                        }else{                      
                            priceDetailItem.isShow = true;
                        }
                    }
                }
            } 
        }

 //已购服务详情加载
		this._orderDetailLoader = new ItemLoader<OrderDetailItem>(false, "ORDER_MNG.ORDER_DETAILS_DATA_FAILED", "op-center.order-mng.order-detail.get", restApiCfg, restApi);
		this._orderDetailLoader.MapFunc = (source: Array<any>, target: Array<OrderDetailItem>) => {
			for (let item of source) {
				let obj: OrderDetailItem = _.extendOwn(new OrderDetailItem(), item)
				target.push(obj);
				if(item.itemList&&item.itemList[0].specList){
					let getProperty = _.property("attrDisplayValue");
					 if(item.productType==0){
						obj.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'INSTANCENAME'));
					}else{
						obj.instanceName = getProperty(item.itemList[0].specList.find(n=>n.attrCode == 'DISKINSNAME'));
					}
				}
			}
		};

    	this._orderDetailLoader.FirstItem = new OrderDetailItem();

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
        // this.consumeLoader.FakeDataFunc=(target:Array<ConsumeSum>)=>{
        //     let item = new ConsumeSum();
        //     item.dbOrderPriceSum = 121;
        //     item.diskOrderPriceSum = 98;
        //     item.physicalMachineOrderPriceSum = 32;
        //     item.vmOrderPriceSum = 145;
        // }
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
        
        this.loadYears();
        this.loadMonths();
        this.loadLastDay();
        this.loadUserType();
	}
isRootUser(){
    let item = this.userTypeLoader.FirstItem;
    if(item.roleName&&item.roleName=='ENTERPRISE_ADMIN')
        this.isRoot = true;
}
 loadYears(){
        this._years = this.timeCaculater.getYears();
    }
    loadMonths(){
        this._months = this.timeCaculater.getMonths(Number(this._param.year));
    }
    loadLastDay(){
        this.lastDay = this.timeCaculater.getLastDay(Number(this._param.year),Number(this._param.month));
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
//判断用户是普通用户还是管理员
    loadUserType(){
        this.layoutService.show();
        this.userTypeLoader.Go()
            .then(sucess=>{
                let item = this.userTypeLoader.FirstItem;
                this.isRootUser();
                this.search_chart();
                this.layoutService.hide();
            })
            .catch(err=>{
                this.layoutService.hide();
                this.showMsg(err);
            })
     
        
    }
    
showDetail(item:CostPandectItem){
     let orderItemId= item.id;
     this._orderDetailLoader.Go(null, [{ key: "subinstanceCode", value: orderItemId }])
			.then(success => {
				this.layoutService.hide();
				$('#orderDetail').modal('show');
			})
			.catch(err => {
				this.layoutService.hide();
				this.showMsg(err);
			})
    }		

loadTopChart(){
    
    let month:string;
   let enterprises : Array<{key:string;value:string;}>=[];
    month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
    let param ={
            endTime: this._param.year+'-'+month+'-'+this.lastDay+' 23:59:59',
            startTime:this._param.year+'-'+month+'-01'+' 00:00:00',
            ids:[]
        };
    enterprises.push({key:this.userTypeLoader.FirstItem.enterpriseId,value:this.userTypeLoader.FirstItem.enterpriseName});     

    

     param.ids = enterprises;

     this.topConsumeLoad(param);
     this.topIncreseConsumeLoad(param);
}


//发送请求，处理参数，展示
consumeLoad(){
    this.layoutService.show();
    let month:string;
    let sumIds :Array<{key:String;value:string}> =[];
     month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
    let param={
            endTime: this._param.year+'-'+month+'-'+this.lastDay+' 23:59:59',
            startTime:this._param.year+'-'+month+'-01'+' 00:00:00',
            ids:[]
        };
   
    sumIds = [{key:this.userTypeLoader.FirstItem.enterpriseId,value:this.userTypeLoader.FirstItem.enterpriseName}];
    param.ids = sumIds;

    this.consumeLoader.Go(null,null,param)
     .then(success=>{
             this.chartService.toSumDatas(this.consumeLoader.FirstItem,this.sumChart);   
            this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}

totalconsumeLoad(){
    this.layoutService.show();
    let month:string;
    let historyIds:Array<string>=[];
     month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
     let param={
        endTime: this._param.year+'-'+month+'-'+this.lastDay+' 23:59:59',
        ids:[],
        size:this.size// Number(this._param.month)
    };

 
    historyIds = [this.userTypeLoader.FirstItem.enterpriseId];

     param.ids = historyIds;

    this.totalConsumeLoader.Go(null,null,param)
     .then(success=>{
        this.increaseConsumeLoad(param);
    })
   .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}
increaseConsumeLoad(param:any){
    this.increseConsumeLoader.Go(null,null,param)
     .then(success=>{
        this.chartService.toHistoryData(this.totalConsumeLoader.Items,this.increseConsumeLoader.Items,this.historyChart);
        this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}
topConsumeLoad(param:any){
    this.layoutService.show();
        this.topConsumeDepartmentLoader.Go(null,null,param)
        .then(success=>{
            this.chartService.topToDatas(this.topConsumeDepartmentLoader.Items,this.topChart);
            this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        })      
}

topIncreseConsumeLoad(param:any){
    this.layoutService.show();
        this.topIncreseConsumeDepartmentLoader.Go(null,null,param)
        .then(success=>{
                 this.chartService.topToDatas(this.topIncreseConsumeDepartmentLoader.Items,this.topIncreaseChart);
                this.layoutService.hide();
        })
        .catch(err=>{
            this.layoutService.hide();
            this.showMsg(err);
        })    
}

search_chart(){
    this.consumeLoad();

    //消费趋势
    this.totalconsumeLoad();

    //两个TOP图
    this.loadTopChart();

    this.loadService();
}


//进入账单管理页面
costManage(){
    this.router.navigateByUrl("op-center/order-mng/cost-manage");
}



showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}
  loadService(){
    //     {
    //   "endTime": "2017-03-07T03:36:22.668Z",
    //   "idList": [
    //     "string"
    //   ],
    //   "startTime": "2017-03-07T03:36:22.668Z"
    // }

    this.layoutService.show();
    let ids:Array<string>=[];
    let month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
  
    ids.push(this.userTypeLoader.FirstItem.enterpriseId);
   

        let param =     {
        "endTime": this._param.year+'-'+month+'-'+this.lastDay+' 23:59:59',
        "idList": ids,
        "startTime":this._param.year+'-'+month+'-01'+' 00:00:00'
    };
        if( this.isAllService =='1'){//所有服务
            this.allServiceLoader.Go(null,null,param)
                .then(success=>{    
                    this.layoutService.hide();
                })
                .catch(err=>{
                    this.layoutService.hide();
                    this.showMsg(err);
                })
        }else{//新增服务
            this.increaseServiceLoader.Go(null,null,param)
                .then(success=>{   
                    this.layoutService.hide();
                })
                .catch(err=>{
                    this.layoutService.hide();
                    this.showMsg(err);
                })
        }
    
    }	

        //选择所有企业
    isNullEnterprise(){
        if(this._param.enterpriseId==null||this._param.enterpriseId=='null')
            return true;
        return false;
        
    }

    download(){
         this._param.year = this.currentYear.toString(); 
         this.loadYears();
         this.showDownLoad();
        $('#downloadDialog').modal('show');

//         {
//   "enterpiseSubinstanceSearchCondition": {
//     "endTime": "2017-03-28T02:28:20.794Z",
//     "idList": [
//       "string"
//     ],
//     "startTime": "2017-03-28T02:28:20.794Z"
//   },
//   "id": "string"
// }
    }
    showDownLoad(){
    	let param;
		let endTime = this._param.year+'-12-31'+' 23:59:59';
		let startTime = this._param.year+'-01-01'+' 00:00:00';
		param={
  			"billEndTime": null,
  			"billStartTime": null,
  			"idList": [this.userTypeLoader.FirstItem.enterpriseId],
			"sendEndTime": endTime,
  			"sendStartTime": startTime
		}
		// param = _.extend({},this._param);
		this.layoutService.show();
		this.downLoadItemLoader.Go(null,null,param)
		.then(success=>{
			this.layoutService.hide();
		})
	.catch(err=>{
		this.layoutService.hide();
		this.showMsg(err);
	})
}

acceptDownload(item:CostManageItem){
    let filename = '账单';
	let endTime = this._param.year+'-12-31'+' 23:59:59';
	let startTime = this._param.year+'-01-01'+' 00:00:00';
    let param = {
                "enterpiseSubinstanceSearchCondition": {
                    "endTime": endTime,
                    "idList": [this.userTypeLoader.FirstItem.enterpriseId],//或者[item.tenantId]
                    "startTime": startTime
                },
                "id": item.id
            }
    this.layoutService.show();
    this.service.download(filename,param)
    .then(success=>{
            // alert("success");
			this.layoutService.hide();
		})
	.catch(err=>{
		this.layoutService.hide();
		this.showMsg(err);
	})
}

}