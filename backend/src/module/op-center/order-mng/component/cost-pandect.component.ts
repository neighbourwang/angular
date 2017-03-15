import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { Chart1,CostPandectItem, CommonKeyValue,BillInfo,ConsumeSum,TimeCaculater,Chart,CostPandectParam,SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'
import { CreatChartService} from '../service';
import * as _ from 'underscore';

@Component({
	selector: 'cost-pandect',
	templateUrl: '../template/cost-pandect.component.html',
	styleUrls: ['../style/cost-pandect.less'],
	providers: [CreatChartService]
})
export class CostPandectComponent implements OnInit{
	//企业消费概览
    sumChart =new Chart1();

    historyChart=new Chart1();

    topChart =new Chart1();

    topIncreaseChart =new Chart1();

@ViewChild("notice")
  	private _notice: NoticeComponent;
size:number;

_param:CostPandectParam = new CostPandectParam();
private timeCaculater :TimeCaculater = new TimeCaculater();
private currentYear :number;
private currentMonth : number;
private lastDay:number;
private _years=[];
private _months=[];
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
	
	constructor(
		private layoutService: LayoutService,
        private chartService:CreatChartService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
        
        this.currentYear = this.timeCaculater.getCurrentYear();
        this.currentMonth = this.timeCaculater.getCurrentMonth();
        
        this.sumChart = this.chartService.creatSumChart();
        this.historyChart = this.chartService.createHstoryBar();
        this.topChart = this.chartService.createTopBar();
        this.topIncreaseChart = this.chartService.createTopIncreaseBar();

        this.enterpriseLoader = new ItemLoader<{id:string;name:string}> (false,'COMMON.ENTPRISE_OPTIONS_DATA_ERROR','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);
        this.allServiceLoader = new ItemLoader<CostPandectItem> (false,'ORDER_MNG.ERROR_LOADING_CONSUMPTION_LIST','op-center.order-mng.cost-pandect.all-service.post',this.restApiCfg,this.restApi);
        this.increaseServiceLoader = new ItemLoader<CostPandectItem> (false,'ORDER_MNG.ERROR_LOADING_CONSUMPTION_LIST','op-center.order-mng.cost-pandect.increase-service.post',this.restApiCfg,this.restApi);

        //   this.allServiceLoader.MapFunc = (source:Array<any>, target:Array<CostPandectItem>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);

		// 	}
		// }

    
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
        this.loadYears();
        this.loadEnterprise();
		this.layoutService.hide();
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

    showDetail(orderItemId:string){
            this.router.navigateByUrl(`op-center/order-mng/order-mng-detail/${orderItemId}`);
        }	

    loadTopChart(){
        
        let month:string;
        let enterprises : Array<{key:string;}>=[];
        month = Number(this._param.month)>=10?this._param.month:'0'+this._param.month;
        let param ={
                endTime: this._param.year+'-'+month+'-'+this.lastDay+' 23:59:59',
                startTime:this._param.year+'-'+month+'-01'+' 00:00:00',
                ids:[]
            };
        if(this.isNullEnterprise()){    
                for(let item of this.enterpriseLoader.Items){
                    let ent = {key:item.id};
                    enterprises.push(ent);
                }       
        }
        else{
            enterprises.push({key:this._param.enterpriseId});     
        }

        

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
        if(this._param.enterpriseId==null||this._param.enterpriseId=='null'){    
                for(let item of this.enterpriseLoader.Items){
                    sumIds.push({key:item.id,value:item.name});
                }       
        }
        else{
            let item = this.enterpriseLoader.Items.find(n=>n.id==this._param.enterpriseId);
            sumIds.push({key:this._param.enterpriseId,value:item.name});
        }
    
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
            size:this.size//Number(this._param.month)
        };

        if(this.isNullEnterprise()){    
                for(let item of this.enterpriseLoader.Items){
                    historyIds.push(item.id);
                }       
        }
        else{
                    historyIds.push(this._param.enterpriseId);
        }


        param.ids = historyIds;

        this.totalConsumeLoader.Go(null,null,param)
        .then(success=>{
            this.increseConsumeLoader.Go(null,null,param)
        })
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
        if(this.isNullEnterprise()){
            this.topConsumeLoader.Go(null,null,param)
            .then(success=>{
            this.chartService.topToDatas(this.topConsumeLoader.Items,this.topChart);
                this.layoutService.hide();
            })
            .catch(err=>{
                this.layoutService.hide();
                this.showMsg(err);
            })
        }else{
            this.topConsumeDepartmentLoader.Go(null,null,param)
            .then(success=>{
                let items = this.topConsumeDepartmentLoader.Items;
                this.chartService.topToDatas(items,this.topChart);
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
        if(this.isNullEnterprise()){
            this.topIncreseConsumeLoader.Go(null,null,param)
            .then(success=>{
                this.chartService.topToDatas(this.topIncreseConsumeLoader.Items,this.topIncreaseChart);
                this.layoutService.hide();
            })
            .catch(err=>{
                this.layoutService.hide();
                this.showMsg(err);
            })
        }else{
            this.topIncreseConsumeDepartmentLoader.Go(null,null,param)
            .then(success=>{
                let items = this.topIncreseConsumeDepartmentLoader.Items;
                this.chartService.topToDatas(items,this.topIncreaseChart);
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

    

    search_chart(){

        //消费概览
        this.consumeLoad();

        //消费趋势
        this.totalconsumeLoad();

        //两个TOP图
        this.loadTopChart();

        //加载表格
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

        if(this.isNullEnterprise()){    
                for(let item of this.enterpriseLoader.Items){
                    ids.push(item.id);
                }       
        }
        else{
                    ids.push(this._param.enterpriseId);
        }

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
}