﻿import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ItemLoader,RestApiCfg,RestApi,LayoutService, NoticeComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEst, ResourceQuota, CertMethod } from '../model'
import { EntEstCreService, Paging } from '../service/ent-est-cre.service'
import * as _ from 'underscore';

@Component({
	selector:'ent-est-cre'
	,templateUrl:'../template/ent-est-cre.component.html'
	,styleUrls:['../style/ent-est-mng.component.less']
	,providers:[
		EntEstCreService
		]
})
export class EntEstCreComponent implements OnInit{
	@ViewChild('notice')
    notice: NoticeComponent;

	noticeTitle = "";
    noticeMsg = "";

	private entEst: EntEst = null;
	private currencyTypes : Array<SystemDictionary> = null;
	private resourceQuotas: Paging<ResourceQuota> = new Paging<ResourceQuota>();
	private isLocal:boolean = true;

    private  nameCheckLoader: ItemLoader<{code:string;name:string}> = null;//重名判断
	private ADflag: string = "";
	private isSameName:number = 0;//0初始状态，1名称不相同，2名称相同

	constructor(
		private router: Router,
		private service: EntEstCreService,
		private layoutService: LayoutService,
		private sysDicService: SystemDictionaryService,
		private restApiCfg:RestApiCfg,
   		 private restApi:RestApi,
		){
			 this.nameCheckLoader = new ItemLoader<{code:string;name:string}>(false,'企业重名判断错误','ent-mng.ent-est-mng.ent-mng-cre.check-name.post',restApiCfg,restApi);
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
	}

	selectAD(){
		console.log('ad selected');
		this.isLocal = false;
		this.clearEntEst(); 
		this.entEst.BasicInfo.certMethod = CertMethod.AD;
	}

	isADSelected(){
		console.log('isAdSelected', this.isLocal);
          if(this.isLocal == false){	  
			  return true;
		  }
		  return false;
	}
	//清空基本信息数据
	clearEntEst(){	
		if(this.entEst && this.entEst!= null){
			  this.entEst.BasicInfo.certUrl = "";
			  this.entEst.BasicInfo.password = "";
			  this.entEst.BasicInfo.description="";
			  this.entEst.BasicInfo.platformIds = [];
		}	
	}

	checkName(){
		let param ={
			name:this.entEst.BasicInfo.name
		}
		if(param.name==null||param.name=='null'){
			this.isSameName=2;
		}else{
			this.nameCheckLoader.Go(null,null,param)
		.then(succeuss=>{
			if(this.nameCheckLoader.code==10001004){
				this.isSameName = 1;//10001004值是代表重名检查通过，允许创建
			}else{
				this.isSameName = 2;
			}
		})
		.catch(err=>{
			this.isSameName = 0;
			this.showError(err);
		})
		}
		
	}
	

	// //非空验证
	// validate(){
	// 	let checkList:Array<any> = [
	// 	{
	// 		"name":"" //名称
	// 		,'value':this.entEst.BasicInfo.name
	// 		,"op":"*"
	// 	},
	// 	{
	// 		"name":""//认证方式
	// 		,"value":this.entEst.BasicInfo.certMethod
	// 		,"op":"*"
	// 	}
	// 	];

	// 	if(this.isADSelected())
	// 	{
	// 		checkList = checkList.concat([
	// 			{
	// 				"name":""//URL地址
	// 				,"value":this.entEst.BasicInfo.certUrl
	// 				,"op":"*"
	// 			},
	// 			{
	// 				"name":""//AD名称
	// 				,"value":this.entEst.BasicInfo.adname
	// 				,"op":"*"
	// 			},
	// 			{
	// 				"name":""//用户名(Full DN)
	// 				,"value":this.entEst.BasicInfo.contactorName
	// 				,"op":"*"
	// 			},
	// 			{
	// 				"name":""//密码
	// 				,"value":this.entEst.BasicInfo.password
	// 				,"op":"*"
	// 			}
	// 			,
	// 			{
	// 				"name":""//登录账户属性名称
	// 				,"value":this.entEst.BasicInfo.loginProp
	// 				,"op":"*"
	// 			}]
	// 			);
	// 	}

	// 	checkList = checkList.concat([
	// 		{
	// 			"name":""//可创建浮动IP数量
	// 			,"value":this.entEst.ResourceQuota.floatIpQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可创建镜像数量
	// 			,"value":this.entEst.ResourceQuota.imageQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可用内存数量
	// 			,"value":this.entEst.ResourceQuota.memroyQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可创建物理机数量
	// 			,"value":this.entEst.ResourceQuota.physicalQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可创建快照数量
	// 			,"value":this.entEst.ResourceQuota.snapShotQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可用存储额度
	// 			,"value":this.entEst.ResourceQuota.storageQuota
	// 			,"op":"*"
	// 		},
	// 		{
	// 			"name":""//可使用vCPU数量
	// 			,"value":this.entEst.ResourceQuota.vcpuQuota
	// 			,"op":"*"
	// 		}]);

    //     alert(this.entEst.ResourceQuota.floatIpQuota);
	// 	let notValid = checkList.find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

	// 	if(notValid !== void 0)
	// 	{
	// 		this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
	// 		return false;
	// 	}

	// 	if(_.isEmpty(this.entEst.BasicInfo.platformIds))
	// 	{
	// 		this.showMsg('ENT_MNG.SELECT_PLATFORM');
	// 		return false;
	// 	}


	// 	return true;
	// }

  outputValue(e,name){
	  if(name=='vcpuQuota'){
		  this.entEst.ResourceQuota.vcpuQuota=e;
	  }
	   if(name=='memroyQuota'){
		  this.entEst.ResourceQuota.memroyQuota=e;
	  }
	   if(name=='physicalQuota'){
		  this.entEst.ResourceQuota.physicalQuota=e;
	  }
	   if(name=='storageQuota'){
		  this.entEst.ResourceQuota.storageQuota=e;
	  }
	   if(name=='snapShotQuota'){
		  this.entEst.ResourceQuota.snapShotQuota=e;
	  }
	   if(name=='imageQuota'){
		  this.entEst.ResourceQuota.imageQuota=e;
	  }
	   if(name=='floatIpQuota'){
		  this.entEst.ResourceQuota.floatIpQuota=e;
	  }
    console.log(e);
}
//    //非负整数验证
// 	validateInterger(){
// 		let checkList:Array<any>=[];

// 		checkList = checkList.concat([
// 			{
// 				"name":"可创建浮动IP数量"//可创建浮动IP数量
// 				,"value":this.entEst.ResourceQuota.floatIpQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可创建镜像数量"//可创建镜像数量
// 				,"value":this.entEst.ResourceQuota.imageQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可使用内存数量"//可用内存数量
// 				,"value":this.entEst.ResourceQuota.memroyQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可创建物理机数量"//可创建物理机数量
// 				,"value":this.entEst.ResourceQuota.physicalQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可创建快照数量"//可创建快照数量
// 				,"value":this.entEst.ResourceQuota.snapShotQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可使用存储额度"//可用存储额度
// 				,"value":this.entEst.ResourceQuota.storageQuota
// 				,"op":"integer"
// 			},
// 			{
// 				"name":"可使用vCPU数量"//可使用vCPU数量
// 				,"value":this.entEst.ResourceQuota.vcpuQuota
// 				,"op":"integer"
// 			}]);

// 		let notValid = checkList.find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

// 		if(notValid !== void 0)
// 		{
// 			this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
// 			return false;
// 		}

// 		if(_.isEmpty(this.entEst.BasicInfo.platformIds))
// 		{
// 			this.showMsg('ENT_MNG.SELECT_PLATFORM');
// 			return false;
// 		}


// 		return true;
// 	}
   
	showMsg(msg: string)
	{
		this.notice.open("COMMON.SYSTEM_PROMPT", msg);
	}

	//创建企业
	create(){
		this.entEst.BasicInfo.platformIds
			= this.resourceQuotas.items.filter(n=>n.checked).map(n=>n.platformId);
		    if(this.entEst.BasicInfo.platformIds.length==0||this.entEst.BasicInfo.platformIds==null){
				this.showMsg("请选择平台配额!");
				return;
			}
				
			if(this.isSameName!=1){
				this.showMsg("该用户已存在！");
			}else if(this.validateMaxPlatform()){
				this.layoutService.show();
				this.service.createEnterpise(this.entEst).then(ret=>{
				this.layoutService.hide();
				this.returnToList();
			})
			.catch(err=>{
				this.layoutService.hide();
				console.log('创建企业失败', err);
				this.notice.open("COMMON.PROMPT", "ENT_MNG.FAIL_TO_CREATE_ENTERPRISE");
			})
		}
	
	}

   validateMaxPlatform(){
	    let totalVcpu:number=0;
		let totalMemory :number=0;
		let totalStorageQuota:number=0;
	
		for(let item of this.resourceQuotas.items){
			if(item.checked){
				totalVcpu+=item.cpu;
				totalMemory+=item.memory;
				totalStorageQuota+=item.storageQuota;
			}
		}
		if(this.entEst.ResourceQuota.vcpuQuota>totalVcpu){
			this.showMsg("vCPU数量不能大于可分配vCPU数量！");
			return false;
		}else if(this.entEst.ResourceQuota.memroyQuota>totalMemory){
			this.showMsg( "可使用内存数量不能大于可分配内存！");
			return false;
		}else if(this.entEst.ResourceQuota.storageQuota>totalStorageQuota){
			this.showMsg("可使用存储额度不能大于可分配存储！");
			return false;
		}
		return true;

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

	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.resourceQuotas.totalPages ? this.resourceQuotas.totalPages : page;

		if (this.resourceQuotas.currentPage == page) {
		  return;
		}

		this.resourceQuotas.currentPage = page;
		this.loadResourceQuotas();
	}

	loadResourceQuotas(){
		this.service.loadResourceQuotas(this.resourceQuotas
			,this.showError
			,this);

	}


  private okCallback:Function = null;
  okClicked(){
    console.log('okClicked');
    if(this.okCallback)
    {
      console.log('okCallback()');
      this.okCallback();
      this.okCallback = null;
    }
  }

  //验证AD测试数据
  validateCertModify():boolean{
    let notValid = [
    {
      "name":""//URL地址
      ,'value':this.entEst.BasicInfo.certUrl
      ,"op":"*"
    },
    {
      "name":""//用户名
      ,'value':this.entEst.BasicInfo.contactorName
      ,"op":"*"
    },
    {
      "name":""//密码
      ,'value':this.entEst.BasicInfo.password
      ,"op":"*"
    }].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

    if(notValid !== void 0)
    {
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      return false;
    }
    else
      return true;
  }

    //测试AD信息
	testAD(): any {
		if (this.validateCertModify()) {
		this.layoutService.show();
		this.service.testAD(this.entEst).then(res => {
			this.layoutService.hide();
			if (res && res.resultCode == "100") {
				console.log("AD测试成功", res);
				this.ADflag = "true";
			} else {
				console.log("AD测试失败", res);
				//this.showMsg("AD测试失败");
				this.ADflag = "false";
				return;
			}
		})
		.catch(err => {
			console.log("AD测试异常", err);
			this.layoutService.hide();
			//this.showMsg("AD测试失败");
			this.ADflag = "false";
		});
	}
}

return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }

 
}