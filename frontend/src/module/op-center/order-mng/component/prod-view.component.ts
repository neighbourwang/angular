import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from './../model';
import * as _ from 'underscore';

@Component({
	selector:'prod-view'
	,template:`
	<ul>
		<li>区域: </li>
		<li>可用区: </li>
		<li>实例规格: </li>
		<li>IP地址: </li>
		<li>操作系统: </li>
		<li>密码: </li>
		<li>实例名称: </li>
	</ul>
	`
})
export class ProdViewComponent implements OnInit{
	@Input()
	private values:Array<SubInstanceAttrPair>;

	private _obj:{
		diskInstanceName:string;
		zone:string;
		capacity:string;
		vmName:string
	}

	ngOnInit(){
		// let getProperty = _.property("attrDisplayValue");
		// this._obj = {
		// 	diskInstanceName: getProperty(this.values.find(n=>n.attrCode == "DISKINSNAME"))
		// 	,capacity: getProperty(this.values.find(n=>n.attrCode == 'DISKINITIALSIZE'))
		// 	,vmName: getProperty(this.values.find(n=>n.attrCode == 'DISKMOUNTHOSTNAME')) || 'COMMON.NONE'
		// 	,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
		// };
	}
}