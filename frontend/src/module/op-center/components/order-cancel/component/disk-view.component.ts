import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from '../../../order-mng/model'
import * as _ from 'underscore';

@Component({
	selector:'disk-view'
	,template:`
	<ul>
		<li>区域: {{_obj.platform}}</li>
		<li>可用区: {{_obj.zone}}</li>
		<li>云硬盘类型: {{_obj.storage}}</li>
		<li>云硬盘容量: {{_obj.capacity}}</li>
	</ul>
	`
})
export class DiskViewComponent implements OnInit{
	@Input()
	private values:Array<SubInstanceAttrPair>;

	private _obj:{//diskInstanceName:string;云硬盘实例名称
		platform:string;//区域
		zone:string;//可用区
		storage:string;//云硬盘类型
		capacity:string;//云硬盘容量
		//vmName:string挂载云主机
	}//PLATFORM,ZONE,STORAGE,DISKSIZE,DISKINSNAME

	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		this._obj = {
			// diskInstanceName: getProperty(this.values.find(n=>n.attrCode == "DISKINSNAME"))
			 platform:getProperty(this.values.find(n=>n.attrCode == 'PLATFORM'))
			,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
			,storage:getProperty(this.values.find(n=>n.attrCode == 'STORAGE'))
			,capacity: getProperty(this.values.find(n=>n.attrCode == 'DISKSIZE'))
			// ,vmName: getProperty(this.values.find(n=>n.attrCode == 'DISKMOUNTHOSTNAME')) || 'COMMON.NONE'
			
		};

		console.log('disk init', this.values);//.instanceName = 
	}
}