import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../model'
import * as _ from 'underscore';

@Component({
	selector:'vm-view'
	,template:`
	<ul>		
		<li *ngIf="_obj.platform">区域: {{_obj.platform}}</li>

		<li *ngIf="_obj.zone">{{ 'COMMON.AVAILABLE_ZONE' | translate }}: {{_obj.zone}}</li>

		<li *ngIf="_obj.cpu&&_obj.mem&&_obj.bootstorage">实例规格: 
		<span *ngIf="_obj.cpu">CPU:{{_obj.cpu}}/</span> 
		<span *ngIf="_obj.mem">内存：{{_obj.mem}}/</span> 
		<span *ngIf="_obj.bootstorage">启动盘：{{_obj.bootstorage}}</span></li>

		<li *ngIf="_obj.privateIp||_obj.publicIp">IP地址:{{_obj.privateIp}} {{_obj.publicIp}}</li>

		<li *ngIf="_obj.osType">操作系统:{{_obj.osType}}</li>

		<li *ngIf="_obj.password">密码: {{_obj.password}} </li>
		
		<li *ngIf="_obj.instanceName">实例名称: {{_obj.instanceName}}</li>
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