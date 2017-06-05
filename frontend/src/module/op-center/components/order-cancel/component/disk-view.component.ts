import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from '../../../order-mng/model';
import * as _ from 'underscore';

@Component({
	selector:'disk-view'
	,template:`
	<ul>
		<li  *ngIf="_obj.platform" >区域: {{_obj.platform}}</li>

		<li  *ngIf="_obj.zone" >可用区: {{_obj.zone}}</li>

		<li  *ngIf="_obj.storage" >云硬盘类型: {{_obj.storage}}</li>

		<li  *ngIf="_obj.capacity" >云硬盘容量: {{_obj.capacity}}</li>

		<li  *ngIf="_obj.instanceName" ><span style="display:block;width:150px;word-wrap:break-word;">实例名称: {{_obj.instanceName}}</span></li>
	</ul>
	`
	,styleUrls: ['../style/common-style.less']
})
export class DiskViewComponent implements OnInit{
	@Input()
	private values:any;
	private  specList=[];

	private _obj:{//diskInstanceName:string;云硬盘实例名称
		platform:string;//区域
		zone:string;//可用区
		storage:string;//云硬盘类型
		capacity:string;//云硬盘容量
		instanceName:string;//实例名称
		//vmName:string挂载云主机
	}//PLATFORM,ZONE,STORAGE,DISKSIZE,DISKINSNAME

	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;
		}else if(this.values&&this.values.orderItems[0]){
			this.specList = this.values.orderItems[0].specList;
		}
		if(this.specList!=null){
			this._obj = {
				// diskInstanceName: getProperty(this.values.find(n=>n.attrCode == "DISKINSNAME"))
				platform:getProperty(this.specList.find(n=>n.attrCode == 'PLATFORM'))
				,zone:getProperty(this.specList.find(n=>n.attrCode == 'ZONE'))
				,storage:getProperty(this.specList.find(n=>n.attrCode == 'STORAGE'))
				,capacity: getProperty(this.specList.find(n=>n.attrCode == 'DISKSIZE'))
				,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'DISKINSNAME'))
			};
		}
		
	}
}