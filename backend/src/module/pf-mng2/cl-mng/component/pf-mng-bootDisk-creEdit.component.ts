import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

//model 
import { BootDiskModel } from '../model/bootDisk.model';

//service
import { BootDiskService } from '../service/platform-mng-bootDisk.service';

@Component({
    templateUrl: '../template/pf-mng-bootDisk-creEdit.component.html',
    styleUrls: [
        '../style/pf-mng.less'
    ],
    providers: []
})

export class bootDiskCreEditComponent implements OnInit {

    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private layoutService: LayoutService,
        private locaton: Location,
        private service: BootDiskService

    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    platformId: string;
    platformType: string;
    selectedZoneId: string;
    validZoneList: Array<any>;
    storageList: Array<any>;
    bootDisk: BootDiskModel;

    isEdit: boolean = false;
    titleName: string;
    ngOnInit() {
        this.bootDisk = new BootDiskModel();
        this.router.params.forEach((params: Params) => {
            this.platformId = params['id'];
            this.bootDisk.platformId = this.platformId;
            this.platformType = params['type'];
            this.isEdit =
                params['isEdit'] ? true : false;
            this.titleName =
                params['isEdit'] ? '设置启动盘' : '编辑启动盘';
        })
        if (!this.isEdit) {
            this.getZoneList(this.platformId);
        } else {
            this.isEdit && this.getStorgeList(this.service.editBootDiskData.zoneId);
            this.bootDisk = this.service.editBootDiskData;
        }
    }
    //获取可用去列表
    getZoneList(id: string) {
        this.service.getEnableZoneList(id).then(res => {
            console.log('zonelist', res);
            this.validZoneList = res.resultContent;
            this.selectedZoneId = this.validZoneList[0].zoneId;
            this.bootDisk.zoneId = this.selectedZoneId;
            this.bootDisk.zoneName = this.validZoneList[0].zoneName;
            this.getStorgeList(this.selectedZoneId);
        }).catch(err => {
            console.error.bind(err);
        })
    }
    //获取可用存储区列表
    getStorgeList(zoneId: string) {
        this.layoutService.show();
        this.service.getEnableStorageList(zoneId).then(res => {
            console.log('storagelist', res.resultContent);
            this.storageList = res.resultContent;
            if (this.isEdit) {
                for (let i = 0; i < this.storageList.length; i++) {
                    for (let selectedStorage of this.bootDisk.storageId) {
                        if (this.storageList[i].storageId == selectedStorage) {
                            this.storageList.splice(i, 1);
                        }
                    }
                }
            }
            this.layoutService.hide();
        }).catch(err => {
            console.error.bind(err);
            this.layoutService.hide();
        })
    }
    //选择可用区
    selectValidZone(e) {
        console.log(e);
        this.bootDisk.zoneName = e.zoneName;
        this.bootDisk.zoneId = e.zoneId;
        this.getStorgeList(e);
        this.bootDisk.storageId = [];
        this.bootDisk.storageName = [];
        // this.bootDisk.storageDisplayName=[];      
    }
    //选择存储区
    selectStorage(storage, idx) {
        console.log(storage);
        console.log(idx);
        console.log(this.storageList);
        if (this.platformType != '0') {
            this.bootDisk.storageName.push(storage.storageName)
            this.bootDisk.storageId.push(storage.storageId)
            // this.bootDisk.storageDisplayName.push(storage.storageDisplayName)
        } else {
            this.bootDisk.storageName[0] = storage.storageName;
            this.bootDisk.storageId[0] = storage.storageId;
            // this.bootDisk.storageDisplayName[0]=storage.storageDisplayName;
        }
        this.storageList.splice(idx, 1);

    }
    //取消选中存储区
    cancelStorage(idxx) {
        this.storageList.push({
            storageId: this.bootDisk.storageId.slice(idxx, 1).toString(),
            storageName: this.bootDisk.storageName.slice(idxx, 1).toString(),
            //    storageDisplayName:this.bootDisk.storageDisplayName.slice(idxx,1).toString() 
        })
        this.bootDisk.storageId.splice(idxx, 1)
        this.bootDisk.storageName.splice(idxx, 1)
        // this.bootDisk.storageDisplayName.splice(idxx,1)
        console.log(this.storageList);
    }
    //保存启动盘
    createBootDisk() {
        if(!this.bootDisk.bootStorageName){
            this.notice.open('操作错误','请输入启动盘名称');
            return;
        }
        if(this.bootDisk.storageId.length==0){
            this.notice.open('操作错误','请选择存储后端');
            return;
        }        
        console.log(this.bootDisk);
        this.layoutService.show();
        if (!this.isEdit) {
            this.service.vmBootDiskNew(this.bootDisk).then(res => {
                console.log(res.resultContent);
                this.layoutService.hide();
                this.locaton.back();
            }).catch(err => {
                console.error.bind(err);
                this.layoutService.hide();
            })
        } else {
            this.service.updateFlavorList(this.bootDisk).then(res => {
                console.log(res.resultContent);
                this.layoutService.hide();
                this.locaton.back();
            }).catch(err => {
                console.error.bind(err);
                this.layoutService.hide();
            })
        }

    }
    //取消
    cancel() {
        this.locaton.back();
    }

    nof(){

    }


}
