import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';
//  *ngIf="_obj.instanceName"
@Component({
	selector:'middleware-view'
	,template:`
	<ul>
		<li *ngIf="_obj.username">用户名: {{_obj.username}}</li>

		<li *ngIf="_obj.type">中间件类型: {{_obj.type}}</li>

		<li *ngIf="_obj.version">中间件版本:{{_obj.version}}</li>
	</ul>
	`
	// ,styleUrls: ['../style/common-style.less']
})
export class MiddleWareViewComponent implements OnInit{
	@Input()
	private values:any;//

    private  specList=[];
	private _obj:{
		username:string;
		type:string;//密码
		version:string;//密码
	}		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;		
		}else if(this.values&&this.values.orderItems[0]){
			this.specList = this.values.orderItems[0].specList;
		}
		
		if(this.specList!=null){
			this._obj = {
			username:getProperty(this.specList.find(n=>n.attrCode == 'WEBLOGICACCOUNT'))
            ,type:getProperty(this.specList.find(n=>n.attrCode == 'MIDDLEWARETYPE'||n.attrCode == 'WEBLOGICTYPE'))
			,version:getProperty(this.specList.find(n=>n.attrCode == 'MIDDLEWAREVERSION'||n.attrCode == 'WEBLOGICVERSION'))
            }

		}
	}
}