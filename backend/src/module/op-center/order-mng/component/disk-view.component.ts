import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair } from './../model';
import * as _ from 'underscore';

@Component({
	selector:'disk-view'
	,template:`
	<ul>
		<li>{{ 'COMMON.CLOUD_HARD_DISK' | translate }}{{ 'COMMON.INSTANCE' | translate }}{{ 'COMMON.NAME' | translate }}:{{_obj.diskInstanceName | translate}}</li>
		<li>{{ 'COMMON.AVAILABLE_ZONE' | translate }}:{{_obj.zone}}</li>
		<li>{{ 'COMMON.CAPATITY' | translate }}:{{_obj.capacity}}</li>
		<li>{{ 'COMMON.MOUNT' | translate }}{{ 'COMMON.CLOUD_HOSTING' | translate }}{{ 'COMMON.NAME' | translate }}：{{_obj.vmName | translate}}</li>
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
			diskInstanceName: getProperty(this.values.find(n=>n.attrCode == "DISKINSNAME"))
			,capacity: getProperty(this.values.find(n=>n.attrCode == 'DISKSIZE'))
			,vmName: getProperty(this.values.find(n=>n.attrCode == 'DISKMOUNTHOSTNAME')) || 'COMMON.NONE'
			,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
		};

		console.log('disk init', this.values);//.instanceName = 
	}
}