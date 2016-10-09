import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, ValidationService, NoticeComponent } from '../../../../architecture';
import { EntEstBasicInfo } from '../model/ent-est-basic-info'
import { EntEstCreService } from '../service/ent-est-cre.service'
import { CurrencyType } from "../model/currency";

@Component({
	selector:'ent-est-cre-step-01'
	,templateUrl:'../template/ent-est-cre-step-01.component.html'
	,styleUrls:[]
	,providers:[
		EntEstCreService
		,ValidationService
		]
})
export class EntEstCreStep01Component implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEstBasicInfo:EntEstBasicInfo;
	private currencyTypes : CurrencyType[] = [];
	constructor(
		private router: Router,
		private service: EntEstCreService,
		private validation : ValidationService
		){

	}
	ngOnInit(){
		this.entEstBasicInfo = this.service.getEntEst().BasicInfo;
		this.service.loadCurrencyTypes(this.currencyTypes, null);
	}

	next(){
		if(!this.validate())
			return;

      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-02");
	}

	showMsg(msg: string)
	{
		this.notice.open("系统提示", msg);
	}

	validate():boolean{

		let funcMap :any = {
			"*":{
				"func":this.validation.isBlank
				,"msg":"不能为空"
			}
			,"email":{ 
				"func": this.validation.isEmail
				,"msg": "邮箱地址无效"
			}
		};

		let func = function(name:string, val:any, op:string){
			if(funcMap[op].func(val))
			{
				return name + funcMap[op].msg;
			}
			else
				return "";
		}

		let notValids = [
		{
			"name":"名称"
			,'value':this.entEstBasicInfo.name
			,"op":"*"
		}].filter(n=>func(n.name, n.value, n.op) != "")

		if(notValids.length > 0)
		{
			let notValid = notValids.shift();
			this.showMsg(func(notValid.name, notValid.value, notValid.op));
			return false;
		}

		return true;
	}

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}
}