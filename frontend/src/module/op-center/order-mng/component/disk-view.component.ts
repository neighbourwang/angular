import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from './../model';
import * as _ from 'underscore';

@Component({
	selector:'disk-view'
	,template:`
	<ul>
		<li>云硬盘实例名称:{{_obj.diskInstanceName}}</li>
		<li>可用区:{{_obj.zone}}</li>
		<li>容量:{{_obj.capacity}}</li>
		<li>挂载云主机名称：{{_obj.vmName}}</li>
	</ul>
	`
})
export class DiskViewComponent implements OnInit{
	@Input()
	private values:Array<SubInstanceAttrPair>;

	private _obj:{diskInstanceName:string;
		zone:string;
		capacity:string;
		vmName:string
	}

	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		this._obj = {
			diskInstanceName: getProperty(this.values.find(n=>n.attrCode == "INSTANCENAME"))
			,capacity: getProperty(this.values.find(n=>n.attrCode == 'CPU'))
			,vmName: getProperty(this.values.find(n=>n.attrCode == 'MEM')) || '无'
			,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
		};

		console.log('disk init', this.values);//.instanceName = 
	}
}