import { Input, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NoticeComponent,PopupComponent,DicLoader,ItemLoader, RestApi, RestApiCfg, LayoutService, ConfirmComponent } from '../../../../architecture';
import {CostSetItem,CostSetInfo} from '../model'

import * as _ from 'underscore';

@Component({
	selector: 'cost-set-list',
	templateUrl: '../template/cost-set-list.component.html',
	styleUrls: ['../style/cost-set-list.less'],
	providers: []
})
export class CostSetListComponent implements OnInit{

@ViewChild("notice")
  	private _notice: NoticeComponent;

 @ViewChild("defaultSetDailog") defaultSetDailog;

 // @ViewChild("entSetDailog") entSetDailog;

 popupItem:any;
  
//当前选择的行
private selectedItem: CostSetItem = null;

private costItemLoader:ItemLoader<CostSetItem> = null;
private defaultItemLoader:ItemLoader<CostSetInfo> = null;
private entItemLoader:ItemLoader<CostSetInfo> = null;

private entSaveLoader:ItemLoader<CostSetInfo> = null;
private defaultSaveLoader:ItemLoader<CostSetInfo> = null;

private ids=[];	
private flag :boolean = true;//true代表企业设置，false代表默认设置
	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private restApiCfg:RestApiCfg,
		private restApi:RestApi){
       		this.costItemLoader = new ItemLoader<CostSetItem>(false, '费用设置列表加载失败', "op-center.order-set.cost-set-list.post", this.restApiCfg, this.restApi);
			this.costItemLoader.MapFunc=(source:Array<any>,target:Array<CostSetItem>)=>{
			for(let item of source){
				let obj=_.extend({},item);
				target.push(obj);
				obj.enterpriseId = item.id;
				obj.name = item.name;
				obj.payway = item.payType;
				obj.cicleTime = item.billPeriod;
				obj.endDate = item.billCreateDate;
				obj.sentDate = item.billSendDate;
			}
			
		}
		
		this.costItemLoader.Trait = (target:Array<CostSetItem>)=>{
			for(let item of target){
				this.ids.push(item.enterpriseId);
			}
		}

			this.defaultItemLoader = new ItemLoader<CostSetInfo>(false, '默认费用设置信息加载失败', "op-center.order-set.default-set-list.post", this.restApiCfg, this.restApi);
			this.entItemLoader = new ItemLoader<CostSetInfo>(false, '企业费用设置信息加载失败', "op-center.order-set.ent-set-list.post", this.restApiCfg, this.restApi);
		
 		//企业设置保存
		this.entSaveLoader = new ItemLoader<CostSetInfo>(false, '企业费用设置保存失败', "op-center.order-set.ent-set-save.post", this.restApiCfg, this.restApi);

        // this.entSaveLoader.MapFunc = (source:Array<any>, target:Array<CostSetInfo>)=>{
		// 	for(let item of source)
		// 	{
		// 		let obj=_.extend({}, item) ;
		// 		target.push(obj);
		
		// 	}
		// }
		 //默认设置保存
		this.defaultSaveLoader = new ItemLoader<CostSetInfo>(false, '默认费用设置保存失败', "op-center.order-set.default-set-save.post", this.restApiCfg, this.restApi);

        this.defaultSaveLoader.MapFunc = (source:Array<any>, target:Array<CostSetInfo>)=>{
			for(let item of source)
			{
				let obj=_.extend({}, item) ;
				target.push(obj);
		
			}
		}
}
	ngOnInit(){
        this.layoutService.show();
        
        this.search(1);
		this.layoutService.hide();
	}

	search(page:number){
		const pageSize= 10;
		let param = {
			"currentPage": page,
			"pageSize": pageSize,
			"totalPage": 0,
			"totalRecords": 0
		}
		this.layoutService.show();
		this.costItemLoader.Go(null,null,param)
		.then(succeuss=>{
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
		})
	}

//企业默认设置按钮
entSet(){
	// $('#costSetDefault').modal('show');
	if(this.selectedItem == null){
		this.showMsg("请先选择企业！");
	}else{
		this.layoutService.show();
		this.flag = true;
		let param =[this.selectedItem.enterpriseId];
		this.entItemLoader.Go(null,null,param)
		.then(succeuss=>{
			 this.popupItem = this.entItemLoader.FirstItem;//  在这里改变值
			this.defaultSetDailog.open();
			this.layoutService.hide();
		})
		.catch(err=>{
			this.layoutService.hide();
		})
		this.defaultSetDailog.open('企业费用设置');
	}
	
}

//默认默认设置按钮
defaultSet(){
	// $('#costSetEnt').modal('show');
	this.layoutService.show();
	this.flag = false;
	let param = this.ids;
	this.defaultItemLoader.Go(null,null,param)
	.then(succeuss=>{
		this.popupItem = this.defaultItemLoader.FirstItem;//  在这里改变值
		this.defaultSetDailog.open();
		this.layoutService.hide();
	})
	.catch(err=>{
		this.layoutService.hide();
	})
	this.defaultSetDailog.open('默认费用设置');
}

popupComplete(data) {
	if(this.flag){
		this.entSave(data);
	}else{
		this.defalutSave(data);
	}
	
	console.log("组件里发来的数据:",data)
}

acceptEntSet(){

}

cancelEntSet(){

}

showMsg(msg: string)
	{
		this._notice.open("COMMON.SYSTEM_PROMPT", msg);
	}
selectItem(selectedItem:CostSetItem){
	this.selectedItem = selectedItem;
}

entSave(param:any){
	this.entSaveLoader.Go(null,null,param)
		.then(succeuss=>{
			this.defaultSetDailog.close();
		})
		.catch(err=>{
			this.showMsg(err);
		})
}

defalutSave(param:any){
	this.defaultSaveLoader.Go(null,null,param)
		.then(succeuss=>{
			this.defaultSetDailog.close();
		})
		.catch(err=>{
			this.showMsg(err);
		})
}
}