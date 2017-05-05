import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';

@Component({
	selector:'machine-view'
	,template:`
	<ul>		
		<li  *ngIf="_obj.platform" >区域: {{_obj.platform}}</li>

		<li  *ngIf="_obj.resourcePool" >资源池: {{_obj.resourcePool}}</li>

		<li  *ngIf="_obj.cpu" >CPU:{{_obj.cpu}}</li>

		<li  *ngIf="_obj.mem" >内存: {{_obj.mem}}</li>

		<li  *ngIf="_obj.disk" >磁盘信息:{{_obj.disk}}</li>

		<li  *ngIf="_obj.networkCard" >网卡: {{_obj.networkCard}}</li>

		<li  *ngIf="_obj.otherInfo" >其他: {{_obj.otherInfo}}</li>

        <li  *ngIf="_obj.privateIp" >IP地址:  {{_obj.privateIp}}{{_obj.publicIp}}</li>

        <li  *ngIf="_obj.osType" >操作系统: {{_obj.osType}}</li>

        <li  *ngIf="_obj.password" >密码: {{_obj.password}}</li>

		<li  *ngIf="_obj.instanceName" >实例名称: {{_obj.instanceName}}</li>
	</ul>
	`
})
export class MachineViewComponent implements OnInit{
	@Input()
	private values:SubInstanceItemResp;

    private  specList:Array<SubInstanceAttrPair>=[];
	private _obj:{
		platform:string,//区域
		resourcePool:string;//资源池
		cpu:string;//cpu
		mem:string;//内存
		disk:string;//磁盘信息
		networkCard:string;//网卡
		otherInfo:string;//其他
		privateIp:string;
		publicIp:string;
		osType:string;
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
			platform:getProperty(this.specList.find(n=>n.attrCode == 'PLATFORM'))//无
			,resourcePool:getProperty(this.specList.find(n=>n.attrCode == 'RESOURCEPOOL'))
			,cpu: getProperty(this.specList.find(n=>n.attrCode == 'CPU'))//无
			,mem: getProperty(this.specList.find(n=>n.attrCode == 'MEM'))//无
			,disk:getProperty(this.specList.find(n=>n.attrCode == 'BOOTSIZE'))//无
			,networkCard:getProperty(this.specList.find(n=>n.attrCode == 'BOOTSIZE'))//无
			,otherInfo:getProperty(this.specList.find(n=>n.attrCode == 'BOOTSIZE'))//无
			,privateIp:this.values.privateIp//无
			,publicIp:this.values.publicIp//无
			,osType:getProperty(this.specList.find(n=>n.attrCode == 'OSYSTEM'))//this.values.osType
			,password:getProperty(this.specList.find(n=>n.attrCode == 'PASSWORD'))
			,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'INSTANCENAME'))
			};
		}
		
		
		if(this._obj.password&&this._obj.password!=null){
			this._obj.password='已设置';
		}else{
			this._obj.password='未设置';
		}
	}
}