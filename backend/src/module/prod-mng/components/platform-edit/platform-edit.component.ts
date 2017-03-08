import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { PlatformEditService } from './platform-edit.service';

//model
import { Product ,platform} from '../../prod-mng/model/product.model';
import { ProductDir ,vmPlatform, diskPlatform} from '../../prod-mng/model/prodDir.model';


@Component({
	selector: 'platform-edit',
	templateUrl: './platform-edit.component.html',
	styleUrls: ['./platform-edit.component.less'],
	providers: []
})
export class PlatformEditComponent implements OnInit {

    @Input()platformType:string;
	@Input()VmPlatformList:Array<vmPlatform>;
	@Input()DiskPlatformList:Array<diskPlatform>;

    @Input()productPlatformList:Array<platform>;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : PlatformEditService
	) { }

    selectAllZone:boolean;
	ngOnInit() {
        console.log(this.platformType)
	}

     //云主机
    //可用区全选 
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        for (let plate of this.VmPlatformList) {
            if (!plate) { continue }
            for (let zone of plate.zoneList) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.productPlatformList = this.VmPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        this.complete.emit(this.productPlatformList);
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        this.VmPlatformList[idx].zoneList[idxx].selected = !this.VmPlatformList[idx].zoneList[idxx].selected;
        this.productPlatformList = this.VmPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        //判断是for可用区全选
        if(this.VmPlatformList.length != this.productPlatformList.length){
            this.selectAllZone=false;
            return;
        }
        this.selectAllZone=true;
        for(let platform of this.VmPlatformList){
            for(let zone of platform.zoneList){
                if(zone.selected==false){
                   return this.selectAllZone=false;                           
                }
            }                
        }
        this.complete.emit(this.productPlatformList);
    }
    //云硬盘
    //云硬盘产品平台
    //选择全部存储后端 
    selectAllStorage:boolean   
    selectAllStorages() {
        this.selectAllStorage = !this.selectAllStorage;
        for (let plate of this.DiskPlatformList) {
            for (let storage of plate.zoneList) {
                storage.selected = this.selectAllStorage;
                // console.log(zone.storageList);
            }
        }
        this.productPlatformList = this.DiskPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        this.complete.emit(this.productPlatformList);
    }
    //选择存储后端
    selectStorage(idx, idxx) {
        this.DiskPlatformList[idx].zoneList[idxx].selected = !this.DiskPlatformList[idx].zoneList[idxx].selected;
        this.productPlatformList = this.DiskPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        if(this.productPlatformList.length != this.DiskPlatformList.length){
            this.selectAllStorage=false;
            return;
        }
        this.selectAllStorage=true;
        for(let platform of this.DiskPlatformList){
            for(let zone of platform.zoneList){
                if(zone.selected==false){
                   return this.selectAllStorage=false;                           
                }
            }                
        }
        this.complete.emit(this.productPlatformList);
    }

}
