import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';

@Component({
	selector:'service-view'
	,template:`
	<ul>	
		<li *ngIf="_obj.instanceName">管理服务名称: {{_obj.instanceName}}</li>
	</ul>
	`
})
export class ServiceViewComponent implements OnInit{
	@Input()
	private values:any;//

    private  specList=[];
	private _obj:{
	    region:string;
		zone:string;//可用区
        instanceId:string;
		instanceName:string;//实例名称
        remark:string;//备注信息   
	}
// if(vm.attrCode== "PLATFORM"||vm.attrCode== "ZONE"||vm.attrCode== "CPU"||vm.attrCode== "MEM"||vm.attrCode== "BOOTSIZE"||vm.attrCode== "PASSWORD"||vm.attrCode== "INSTANCENAME")
		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		// alert("1111111");
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;
		
		}else if(this.values&&this.values.orderItems[0]){
			this.specList = this.values.orderItems[0].specList;
		}
		
		if(this.specList!=null){
			this._obj = {
		     region:getProperty(this.specList.find(n=>n.attrCode == 'REGION'))
			,zone:getProperty(this.specList.find(n=>n.attrCode == 'ZONE'))  
			,instanceId:getProperty(this.specList.find(n=>n.attrCode == 'INSTANCEID'))
			,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'INSTANCENAME'))
            ,remark:getProperty(this.specList.find(n=>n.attrCode == 'REMARK'))
			};
		}
	}
}