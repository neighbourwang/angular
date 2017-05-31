import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {SubInstanceAttrPair,SubInstanceItemResp } from '../../../order-mng/model';

import * as _ from 'underscore';

@Component({
	selector:'machine-view'
	,template:`
	<ul>	
		<li  *ngIf="_obj.platform&&values.showSpecList" >区域: {{_obj.platform}}</li>

		<li  *ngIf="_obj.resourcePool&&values.showSpecList" >资源池: {{_obj.resourcePool}}</li>	

		<li  *ngIf="_obj.cpu.length>0" >CPU:
			<ul *ngFor="let cpuItem of _obj.cpu">
		   		<li class="pdl20">{{cpuItem.specName}} {{cpuItem.specValue}}x{{cpuItem.number}}</li>
		   </ul>
		</li>

		<li  *ngIf="_obj.mem.length>0" >内存:
			<ul *ngFor="let memItem of _obj.mem">
		   		<li class="pdl20">{{memItem.specName}} {{memItem.specValue}}x{{memItem.number}}</li>
		   </ul>
		</li>

		<li  *ngIf="_obj.disk.length>0" >磁盘信息:
		   <ul *ngFor="let diskItem of _obj.disk">
		   		<li class="pdl20">{{diskItem.specName}} {{diskItem.specValue}}x{{diskItem.number}}</li>
		   </ul>
		</li>

		<li  *ngIf="_obj.networkCard.length>0" >网卡: 
			<ul *ngFor="let networkCardItem of _obj.networkCard">
		   		<li class="pdl20">{{networkCardItem.specValue}}x{{networkCardItem.number}}</li>
		   </ul>
		</li>

		<li  *ngIf="_obj.otherInfo.length>0" >其他: 
			<ul *ngFor="let otherInfoItem of _obj.otherInfo">
		   		<li class="pdl20">{{otherInfoItem.specName}} {{otherInfoItem.specValue}}x{{otherInfoItem.number}}</li>
		   </ul>
		</li>

		<li  *ngIf="_obj.privateIp&&values.showSpecList" >IP地址:  {{_obj.privateIp}}{{_obj.publicIp}}</li>

		<li  *ngIf="_obj.osType&&values.showSpecList" >操作系统: {{_obj.osType}}</li>

		<li  *ngIf="_obj.password&&values.showSpecList" >密码: {{_obj.password}}</li>

		<li  *ngIf="_obj.instanceName&&values.showSpecList" >实例名称: {{_obj.instanceName}}</li>
	</ul>

	`
})

export class MachineViewComponent implements OnInit{
	@Input()
	private values:any;//SubInstanceItemResp1

    private  specList=[];
	private _obj:{
		platform:string,//区域
		resourcePool:string;//资源池
		cpu:Array<any>;//cpu
		mem:Array<any>;//内存
		disk:Array<any>;//磁盘信息
		networkCard:Array<any>;//网卡
		otherInfo:Array<any>;//其他

		privateIp:string;
		publicIp:string;
		osType:string;
		password:string;//密码
		instanceName:string;//实例名称
	}
// if(vm.attrCode== "PLATFORM"||vm.attrCode== "ZONE"||vm.attrCode== "CPU"||vm.attrCode== "MEM"||vm.attrCode== "BOOTSIZE"||vm.attrCode== "PASSWORD"||vm.attrCode== "INSTANCENAME")
		
	ngOnInit(){
		let getProperty = _.property("attrDisplayValue");
		// alert("1111111");
		//SubInstanceItemResp1
		if(this.values&&this.values.specList){
			this.specList = this.values.specList;	
		}else if(this.values&&this.values.orderItems[0]){
			this.specList = this.values.orderItems[0].specList;
		}
		
		if(this.specList!=null){
			this._obj = {
			platform:getProperty(this.specList.find(n=>n.attrCode == 'REGION'))//无
			,resourcePool:getProperty(this.specList.find(n=>n.attrCode == 'RESOURCEPOOL'))
			,cpu: []
			,mem: []
			,disk: []
			,networkCard:[]
			,otherInfo:[]
			,privateIp:this.values.privateIp//无
			,publicIp:this.values.publicIp//无
			,osType:getProperty(this.specList.find(n=>n.attrCode == 'OSYSTEM'))//this.values.osType
			,password:getProperty(this.specList.find(n=>n.attrCode == 'PASSWORD'))
			,instanceName: getProperty(this.specList.find(n=>n.attrCode == 'INSTANCENAME'))
			};
		}
		if(this.values.pmEntity){
			this._obj.cpu=this.values.pmEntity.partsEntitys.filter(item=>item.partsName=='CPU')
			this._obj.mem=this.values.pmEntity.partsEntitys.filter(item=>item.partsName=='内存')
			this._obj.disk=this.values.pmEntity.partsEntitys.filter(item=>item.partsName=='磁盘')
			this._obj.networkCard=this.values.pmEntity.partsEntitys.filter(item=>item.partsName=='网卡')
			this._obj.otherInfo=this.values.pmEntity.partsEntitys.filter(item=>item.partsName=='HBA')
		}
		// this._obj.cpu=[{'specName':'Xeon E5 2560','specValue':'2GHZ','number':'2'}];
		   
		if(this._obj.password&&this._obj.password!=null){
			this._obj.password='已设置';
		}else{
			this._obj.password='未设置';
		}
		if(this._obj.platform&&this._obj.platform!=null){
			this.values.platformStr = this._obj.platform;
		}
		
	}
}