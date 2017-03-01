
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';


// service;
import { CreateProdStepService } from '../service/createProdStep.service';

//model
import { Product } from '../model/product.model';
import { ProductDir, vmPlateform, diskPlateform } from '../model/prodDir.model';

@Component({
    templateUrl: '../template/prod-mng-cre-step-03.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdMngCreStep3Component implements OnInit {

    @ViewChild('notice')
    notice:NoticeComponent;

    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: CreateProdStepService
    ) { }
    prodDirType: string;
    selectAllZone: boolean = true;
    selectAllStorage: boolean = true;
    tempVmProdDirPlatformList: Array<vmPlateform>;
    tempDiskProdDirPlatformList: Array<diskPlateform>;
    ngOnInit() {
        //获取平台类型
        console.log(this.service.product);
        this.prodDirType = this.service.productDir.serviceType;
        if (this.prodDirType == '0') {
            this.tempVmProdDirPlatformList = this.service.productDir.platformInfo;
            for (let plate of this.tempVmProdDirPlatformList) {
                if (!plate) { continue }
                for (let zone of plate.zoneList) {
                    if (zone.selected == false) {
                        this.selectAllZone = false;
                        return;
                    }
                }
            }
        } else if (this.prodDirType == '1') {            
            this.tempDiskProdDirPlatformList = this.service.productDir.platformList;
            for (let plate of this.tempDiskProdDirPlatformList) {
                if (!plate) { continue }
                for (let storage of plate.zoneList) {
                    if (storage.selected == false) {
                        this.selectAllStorage = false;
                        return;
                    }
                }
            }
        }

    }
    //云主机
    //可用区全选 
    selectAllZones() {
        this.service.product.productPlatformReqs=[];
        this.selectAllZone = !this.selectAllZone;
        for (let plate of this.tempVmProdDirPlatformList) {
            if (!plate) { continue }
            for (let zone of plate.zoneList) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.service.product.productPlatformReqs = this.tempVmProdDirPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.service.product.productPlatformReqs);
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        this.service.product.productPlatformReqs=[];
        console.log(idx, idxx);
        this.tempVmProdDirPlatformList[idx].zoneList[idxx].selected = !this.tempVmProdDirPlatformList[idx].zoneList[idxx].selected;
        this.service.product.productPlatformReqs = this.tempVmProdDirPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        //判断是for可用区全选
        if(this.service.product.productPlatformReqs.length != this.tempVmProdDirPlatformList.length){
            this.selectAllZone=false;
            return;
        }
        this.selectAllZone=true;
        for(let platform of this.tempVmProdDirPlatformList){
            for(let zone of platform.zoneList){
                if(zone.selected==false){
                   return this.selectAllZone=false;                           
                }
            }                
        }
        console.log(this.service.product.productPlatformReqs);
    }
    //云硬盘
    //云硬盘产品平台
    //选择全部存储后端    
    selectAllStorages() {
        this.service.product.productPlatformReqs=[];
        this.selectAllStorage = !this.selectAllStorage;
        for (let plate of this.tempDiskProdDirPlatformList) {
            for (let storage of plate.zoneList) {
                storage.selected = this.selectAllStorage;
                // console.log(zone.storageList);
            }
        }
        this.service.product.productPlatformReqs = this.tempDiskProdDirPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.service.product.productPlatformReqs);
    }
    //选择存储后端
    selectStorage(idx, idxx) {
        this.service.product.productPlatformReqs=[];
        console.log(idx, idxx);
        this.tempDiskProdDirPlatformList[idx].zoneList[idxx].selected = !this.tempDiskProdDirPlatformList[idx].zoneList[idxx].selected;
        console.log(this.tempDiskProdDirPlatformList[idx].zoneList[idxx].selected);
        this.service.product.productPlatformReqs = this.tempDiskProdDirPlatformList.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        // this.selectAllStorage = 
        //     this.service.product.productPlatformReqs.length == this.tempDiskProdDirPlatformList.length?true:false;
        // console.log(this.service.product.productPlatformReqs);
        //判断是for存储区全选
        if(this.service.product.productPlatformReqs.length != this.tempVmProdDirPlatformList.length){
            this.selectAllStorage=false;
            return;
        }
        this.selectAllStorage=true;
        for(let platform of this.tempVmProdDirPlatformList){
            for(let zone of platform.zoneList){
                if(zone.selected==false){
                   return this.selectAllStorage=false;                           
                }
            }                
        }
        console.log(this.service.product.productPlatformReqs);
    }

    next() { 
        if(this.service.product.productPlatformReqs.length==0){
             this.notice.open('COMMON.OPERATION_ERROR','PROD_MNG.PLATFORM_LIST_IS_EMPTY'); 
             return; 
        }       
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-4"]);
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-2"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
