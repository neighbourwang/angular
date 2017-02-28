import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as _ from 'underscore';

@Component({
	selector:'vm-view'
	,template:`
	<ul>
		<li>{{ 'CHECK_CENTER.INSTANCE_NAME' | translate }}: {{_obj.instanceName}}</li>
		<li>{{ 'COMMON.AVAILABLE_ZONE' | translate }}: {{_obj.zone}}</li>
		<li>CPU:{{_obj.cpu}}</li>
		<li>{{ 'COMMON.RAM' | translate }}: {{_obj.mem}}</li>

	</ul>
	`
})
export class VmViewComponent implements OnInit{
	@Input()
	private values:Array<{attrCode:string;attrDisplayName:string;attrDisplayValue:string}>;

	private _obj:{instanceName:string;
		zone:string;
		cpu:string;
		mem:string
	}

	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		this._obj = {
			instanceName: getProperty(this.values.find(n=>n.attrCode == "INSTANCENAME"))
			,cpu: getProperty(this.values.find(n=>n.attrCode == 'CPU'))
			,mem: getProperty(this.values.find(n=>n.attrCode == 'MEM'))
			,zone:getProperty(this.values.find(n=>n.attrCode == 'ZONE'))
		};

		console.log('vm-view init', this.values);//.instanceName = 
	}
}