import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';

@Component({
	selector:'vm-view'
	,template:`
	<ul>		
		<li>区域: {{_obj.platform}}</li>
		<li>{{ 'COMMON.AVAILABLE_ZONE' | translate }}: {{_obj.zone}}</li>
		<li>实例规格: CPU:{{_obj.cpu}}/内存：{{_obj.mem}}/启动盘：{{_obj.bootstorage}}</li>
		<li>IP地址: {{_obj.privateIp}}{{_obj.publicIp}}</li>
		<li>操作系统:{{_obj.osType}}</li>
		<li>密码: {{_obj.password}}</li>
		<li>实例名称: {{_obj.instanceName}}</li>
	</ul>
	`
})
export class VmViewComponent implements OnInit{
	@Input()
	private values:SubInstanceItemResp;//

    private  specList:Array<SubInstanceAttrPair>=[];
	private _obj:{
		platform:string,//区域
		zone:string;//可用区
		cpu:string;//实例规格（cpu,内存,启动盘）
		mem:string;
		bootstorage:string;
		privateIp:string;
		publicIp:string;
		osType:string;
		//无ip地址和操作系统
		password:string;//密码
		instanceName:string;//实例名称
	}
// if(vm.attrCode== "PLATFORM"||vm.attrCode== "ZONE"||vm.attrCode== "CPU"||vm.attrCode== "MEM"||vm.attrCode== "BOOTSIZE"||vm.attrCode== "PASSWORD"||vm.attrCode== "INSTANCENAME")
		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		// alert("1111111");
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;
			this._obj = {
			platform:getProperty(this.specList.find(n=>n.attrCode == 'PLATFORM'))//this.values.platform
			,zone:getProperty(this.specList.find(n=>n.attrCode == 'ZONE'))
			,cpu: getProperty(this.specList.find(n=>n.attrCode == 'CPU'))
			,mem: getProperty(this.specList.find(n=>n.attrCode == 'MEM'))
			,bootstorage:getProperty(this.specList.find(n=>n.attrCode == 'BOOTSIZE'))//启动盘容量
			,privateIp:this.values.privateIp
			,publicIp:this.values.publicIp
			,osType:this.values.osType
			,password:getProperty(this.specList.find(n=>n.attrCode == 'PASSWORD'))
			,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'INSTANCENAME'))
			};
		}
		
		
		if(this._obj.password&&this._obj.password!=null){
			this._obj.password='已设置';
		}else{
			this._obj.password='未设置';
		}

		console.log('vm-view init', this.values);//.instanceName = 
	}
}