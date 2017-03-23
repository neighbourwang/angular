import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from './../model';
import * as _ from 'underscore';

@Component({
	selector:'vm-view'
	,template:`
	<ul>
		
		<li>区域: {{_obj.instanceName}}</li>
		<li>可用区: {{_obj.zone}}</li>
		<li>实例规格: CPU:{{_obj.cpu}}/内存：{{_obj.mem}}/启动盘：{{_obj.bootstorage}}</li>
		<li>密码: {{_obj.password}}</li>
		<li>实例名称： {{_obj.instanceName}}</li>
	</ul>
	`
})
export class VmViewComponent implements OnInit{
	@Input()
	private values:Array<SubInstanceAttrPair>;

	private _obj:{
		platform:string,//区域
		zone:string;//可用区
		cpu:string;//实例规格（cpu,内存,启动盘）
		mem:string;
		bootstorage:string;
		//无ip地址和操作系统
		password:string;//密码
		instanceName:string;//实例名称
	}
// if(vm.attrCode== "PLATFORM"||vm.attrCode== "ZONE"||vm.attrCode== "CPU"||vm.attrCode== "MEM"||vm.attrCode== "BOOTSTORAGE"||vm.attrCode== "PASSWORD"||vm.attrCode== "INSTANCENAME")
		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		this._obj = {
			platform:getProperty(this.values.find(n=>n.attrCode == "PLATFORM"))
			,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
			,cpu: getProperty(this.values.find(n=>n.attrCode == 'CPU'))
			,mem: getProperty(this.values.find(n=>n.attrCode == 'MEM'))
			,bootstorage:getProperty(this.values.find(n=>n.attrCode == 'BOOTSTORAGE'))
			,password:getProperty(this.values.find(n=>n.attrCode == 'PASSWORD'))
			,instanceName: getProperty(this.values.find(n=>n.attrCode == "INSTANCENAME"))
		};

		console.log('vm-view init', this.values);//.instanceName = 
	}
}