import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { PlatformEditService } from './platform-edit.service';

//model
import { Product, platform } from '../../prod-mng/model/product.model';
import { ProductDir, Platform } from '../../prod-mng/model/prodDir.model';


@Component({
    selector: 'platform-edit',
    templateUrl: './platform-edit.component.html',
    styleUrls: ['./platform-edit.component.less'],
    providers: []
})
export class PlatformEditComponent implements OnInit {

    @Input() type: string;
    @Input() servicePlatformList: Array<Platform>;

    @Input() productPlatformList: Array<platform>;
    @Input() resultPlatformList: Array<platform>;

    @Output() complete = new EventEmitter();

    constructor(
        private layoutService: LayoutService,
        private service: PlatformEditService
    ) { }

    selectAllZone: boolean;
    selectAllZoneDisabled: boolean = false;
    ngOnInit() {
        console.log(this.type);
        //获取已选择平台可用区信息；
        console.log(this.productPlatformList);
        console.log(this.servicePlatformList);
        for (let prodPlat of this.productPlatformList) {
            for (let servPlat of this.servicePlatformList) {
                if (prodPlat.platformId == servPlat.platformId) {
                    for (let servZone of servPlat.zoneList) {
                        servZone.selected = false;
                        servZone.disable = false;
                        for (let prodZone of prodPlat.zoneList) {
                            if (servZone.zoneId == prodZone.zoneId) {
                                servZone.selected = true;
                                servZone.disable = true;
                            }
                        }
                    }
                }
            }
        }
        //是否全选
        if (this.productPlatformList.length != this.servicePlatformList.length) {
            this.selectAllZone = false;
            return;
        }
        this.selectAllZone = true;
        for (let platform of this.servicePlatformList) {
            for (let zone of platform.zoneList) {
                if (zone.selected == false) {
                    return this.selectAllZone = false;
                }
            }
        }
        this.selectAllZoneDisabled = true;
    }
    //云主机
    //可用区全选 
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        for (let plate of this.servicePlatformList) {
            if (!plate) { continue }
            for (let zone of plate.zoneList) {
                if (!zone.disable) zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.resultPlatformList = this.servicePlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        this.complete.emit(this.resultPlatformList);
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        this.servicePlatformList[idx].zoneList[idxx].selected = !this.servicePlatformList[idx].zoneList[idxx].selected;
        this.resultPlatformList = this.servicePlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.resultPlatformList);
        this.complete.emit(this.resultPlatformList);
        //判断是for可用区全选
        if (this.servicePlatformList.length != this.resultPlatformList.length) {
            this.selectAllZone = false;
            return;
        }
        this.selectAllZone = true;
        for (let platform of this.servicePlatformList) {
            for (let zone of platform.zoneList) {
                if (zone.selected == false) {
                    return this.selectAllZone = false;
                }
            }
        }

    }
    //云硬盘
    //云硬盘产品平台
    //选择全部存储后端

}
