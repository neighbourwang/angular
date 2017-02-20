import { Input, Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import { Consume,ConsumeSum,Time,Chart,CostPandectParam,SubInstanceResp, AdminListItem, DepartmentItem, Platform, ProductType, SubRegion, OrderMngParam} from '../model'

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

_param:CostPandectParam = new CostPandectParam();
private _years:Array<Time>=[];
private _months:Array<Time>=[];
//企业下拉列表
private enterpriseLoader : ItemLoader<{id:string;name:string}>= null;

//订单类型
private _orderTypeDic:DicLoader = null;
//订购人
private _buyerLoader:ItemLoader<{id:string; name:string}> = null;

private consumeLoader:ItemLoader<ConsumeSum> = null;//消费概览

private totalConsumeLoader:ItemLoader<Consume> = null;//消费趋势-总消费
private increseConsumeLoader:ItemLoader<Consume> = null;//消费趋势-新增消费

private topConsumeLoader:ItemLoader<Consume> = null;//TOP5消费总额-所有企业
private topConsumeDepartmentLoader:ItemLoader<Consume> = null;//TOP5消费总额-某个企业

private topIncreseConsumeLoader:ItemLoader<Consume> = null;//TOP5消费增长总额
private topIncreseConsumeDepartmentLoader:ItemLoader<Consume> = null;//TOP5消费增长总额-某个企业
	
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
        
        this.enterpriseLoader = new ItemLoader<{id:string;name:string}> (false,'企业列表加载错误','op-center.order-mng.ent-list.get',this.restApiCfg,this.restApi);

        //订购人加载
		this._buyerLoader = new ItemLoader<{id:string; name:string}>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "check-center.submiter-list.get", this.restApiCfg, this.restApi);

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

    
       	this.consumeLoader = new ItemLoader<ConsumeSum>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.consume.post", this.restApiCfg, this.restApi);

        // this.consumeLoader.MapFunc = (source:Array<any>, target:Array<ConsumeSum>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);
		// 	}
		// }
        this.totalConsumeLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.total.post", this.restApiCfg, this.restApi);

        // this.totalConsumeLoader.MapFunc = (source:Array<any>, target:Array<Consume>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);
		// 	}
		// }
        this.increseConsumeLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.increase.post", this.restApiCfg, this.restApi);
        this.topConsumeLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.enterprise-top.post", this.restApiCfg, this.restApi);
        this.topConsumeDepartmentLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.department-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.increase-enterprise-top.post", this.restApiCfg, this.restApi);
        this.topIncreseConsumeDepartmentLoader = new ItemLoader<Consume>(false, 'ORDER_MNG.SUBSCRIBER_LIST_DATA_FAILED', "op-center.order-mng.cost-pandect.increase-department-top.post", this.restApiCfg, this.restApi);


}
	ngOnInit(){
        this.layoutService.show();
        this.getTimeData();//时间下拉列表
        this.loadEnterprise();
        this.search_chart();
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

getTimeData(){
    for(let i = 1999; i<=2017 ; i++){
        let _year = new Time(i.toString(),i.toString());
        this._years.push(_year);  
    }
     for(let i = 1; i<=12 ; i++){
        let _month = new Time(i.toString(),i.toString());
        this._months.push(_month);  
    }
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
    this.layoutService.show();
    this.consumeLoader.Go()
    .then(success=>{

        this.totalConsumeLoader.Go();
    })
    .then(success=>{

        this.increseConsumeLoader.Go();
    })
    .then(success=>{

        this.layoutService.hide();
    })
    .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
    })
}

loadTopChart(){
    if(this._param.enterprise = null){

    }
}

search_chart(){
    let _datas:Array<number> = null;
    let _colors:Array<any> = null;
    let _labels:Array<any> = null;
    let _options:any = null;
    _datas = [25,57,173,200];
    _colors = ["#08C895","#82B6B2","#6F7DC8","#2BD2C8"];
    _labels = [
                        '物理机：'+25,
                        '数据库：'+ 57,
                        '云硬盘：'+ 173,
                        '云主机：'+ 200,
                    ];
    this.dht_chart(_datas,_colors,_labels);

   _datas = [65, 89, 80, 81, 56, 55, 40];
   _colors = [
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

    _labels = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"];
    _options = {
                scales: {
                    xAxes: [{
                        display: false
                    }],
                    yAxes: [{
                        stacked: true

                    }]
                }
            };
this.bar_chart(_datas,_colors,_labels,_options);

_datas =  [65, 59, 80, 81, 56];
_labels = ["云主机", "云硬盘", "数据库", "物理机"];
_colors = [
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
_options={
                    scales: {
                        xAxes: [{
                             stacked: true
                        }],
                        yAxes: [{
                            stacked: true
                        }]
                    }
                };

this.h_chart3(_datas,_colors,_labels,_options);
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

//TOP5
h_chart3(datas:Array<number>,colors:Array<any>,lables:Array<any>,options?:any){
	this.ent_hbar=[{
                        label:'消费总额',
                        data: datas
                         
                    }];
    this.ent_hbar2=[{
                        label:'消费总额',
                        data: datas
                         
                    }];
    this.h_chart.colors = colors; 
    this.h_chart2.colors = colors; 
    this.h_chart.labels = lables;
    this.h_chart2.labels =lables;
    
    this.h_chart.options = options;
    this.h_chart2.options = options;
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