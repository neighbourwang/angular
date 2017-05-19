import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';
//  *ngIf="_obj.instanceName"
@Component({
	selector:'sql-view'
	,template:`
	<ul>
		<li>区域: {{_obj.platform}}</li>

		<li>可用区: {{_obj.zone}}</li>

		<li>产品名称: {{_obj.instanceName}}</li>

		<li>数据库类型: {{_obj.type}}</li>

		<li>数据库版本:{{_obj.version}}</li>
	</ul>
	`
})
export class SqlViewComponent implements OnInit{
	@Input()
	private values:any;//

    private  specList=[];
	private _obj:{
		platform:string,//区域
		zone:string;//可用区
		//无ip地址和操作系统
		type:string;//密码
		version:string;//密码
		instanceName:string;//实例名称
	}		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;
			this._obj = {
			platform:getProperty(this.specList.find(n=>n.attrCode == 'PLATFORM'))
			,zone:getProperty(this.specList.find(n=>n.attrCode == 'ZONE'))
			,type:getProperty(this.specList.find(n=>n.attrCode == 'DBTYPE'))
			,version:getProperty(this.specList.find(n=>n.attrCode == 'DBVERSION'))
			,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'INSTANCENAME'))
			};
		}
	}
}