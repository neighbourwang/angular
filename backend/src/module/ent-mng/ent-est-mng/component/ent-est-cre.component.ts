import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEst, ResourceQuota, CertMethod } from '../model'
import { EntEstCreService, Paging } from '../service/ent-est-cre.service'
import * as _ from 'underscore';

@Component({
	selector:'ent-est-cre'
	,templateUrl:'../template/ent-est-cre.component.html'
	,styleUrls:['../style/ent-est-mng.component.css']
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreComponent implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	private entEst: EntEst = null;
	private currencyTypes : Array<SystemDictionary> = null;
	private resourceQuotas: Paging<ResourceQuota> = new Paging<ResourceQuota>();
	private isLocal:boolean = true;

	constructor(
		private router: Router,
		private service: EntEstCreService,
		private sysDicService: SystemDictionaryService
		){

	}
	ngOnInit(){
		this.entEst = new EntEst();
		this.loadResourceQuotas();
	}

	showError(msg:any) {
	    this.notice.open(msg.title, msg.desc);
	}

	selectLocal(){
		this.isLocal = true;
		this.clearEntEst();
		this.entEst.BasicInfo.certMethod = CertMethod.Local;	    
		this.isADSelected();
	}

	selectAD(){
		this.isLocal = false;
		this.clearEntEst();
		this.entEst.BasicInfo.certMethod = CertMethod.AD;
		this.isADSelected();
	}

	isADSelected(){
          if(this.isLocal == false){	  
			  return true;
		  }
		  return false;
	}
	//清空基本信息数据
	clearEntEst(){	
		if(this.entEst && this.entEst!= null){
 			  this.entEst.BasicInfo.name="";
			  this.entEst.BasicInfo.contactorName="";
			  this.entEst.BasicInfo.certUrl = "";
			  this.entEst.BasicInfo.password = "";
			  this.entEst.BasicInfo.description="";
			  this.entEst.BasicInfo.platformIds = [];
		}	
	}

	//数据验证
	validate(){
		let checkList:Array<any> = [
		{
			"name":"名称"
			,'value':this.entEst.BasicInfo.name
			,"op":"*"
		},
		{
			"name":"认证方式"
			,"value":this.entEst.BasicInfo.certMethod
			,"op":"*"
		}
		];

		if(this.isADSelected())
		{
			checkList = checkList.concat([
				{
					"name":"URL地址"
					,"value":this.entEst.BasicInfo.certUrl
					,"op":"*"
				},
				{
					"name":"用户名(Full DN)"
					,"value":this.entEst.BasicInfo.contactorName
					,"op":"*"
				},
				{
					"name":"密码"
					,"value":this.entEst.BasicInfo.password
					,"op":"*"
				}
				,
				{
					"name":"登录账户属性名称"
					,"value":this.entEst.BasicInfo.accountAttribute
					,"op":"*"
				}]
				);
		}

		checkList = checkList.concat([
		{
			"name":"可创建浮动IP数量"
			,"value":this.entEst.ResourceQuota.floatIpQuota
			,"op":"*"
		},
		{
			"name":"可创建镜像数量"
			,"value":this.entEst.ResourceQuota.imageQuota
			,"op":"*"
		},
		{
			"name":"可用内存数量"
			,"value":this.entEst.ResourceQuota.memroyQuota
			,"op":"*"
		},
		{
			"name":"可创建物理机数量"
			,"value":this.entEst.ResourceQuota.physicalQuota
			,"op":"*"
		},
		{
			"name":"可创建快照数量"
			,"value":this.entEst.ResourceQuota.snapShotQuota
			,"op":"*"
		},
		{
			"name":"可用存储额度"
			,"value":this.entEst.ResourceQuota.storageQuota
			,"op":"*"
		},
		{
			"name":" 可使用vCPU数量"
			,"value":this.entEst.ResourceQuota.vcpuQuota
			,"op":"*"
		}]);

		let notValid = checkList.find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

		if(notValid !== void 0)
		{
			this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
			return false;
		}

		if(_.isEmpty(this.entEst.BasicInfo.platformIds))
		{
			this.showMsg('请选择平台');
			return false;
		}
		return true;
	}

	showMsg(msg: string)
	{
		this.notice.open("系统提示", msg);
	}

	//创建企业
	create(){
		this.entEst.BasicInfo.platformIds
			= this.entEst.BasicInfo.platformIds.concat(this.resourceQuotas.items.filter(n=>n.checked).map(n=>n.platformId));
		if(this.validate())
		{
			this.service.createEnterpise(this.entEst).then(ret=>{
				this.returnToList();
			})
			.catch(err=>{
				console.log('创建企业失败', err);
				this.notice.open("创建企业", "创建企业失败");
			})
		}
	}

	cancel(){
		this.returnToList();
	}

	returnToList(){
    	this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

	//上传文件
	fileSelected(event:any){
		console.log('fileSelected');

		let files = event.srcElement.files;

		console.log('files', files);//上传的文件
	}

	loadResourceQuotas(){
		this.service.loadResourceQuotas(this.resourceQuotas
			,this.showError
			,this);

	}




}