import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, dictPipe } from '../../../../architecture';

import { PlatformDetailService } from '../service/pf-mng-detail.service';
import { ZoneListService } from '../service/cl-mng-cre-step-3.service';
import { StorageListService } from '../service/cl-mng-cre-step-4.service';


import { ClMngCommonService } from '../service/cl-mng-common.service';

//model
import { Platform } from '../model/platform.model';
import { ZoneListModel } from '../model/cre-step3.model';
import { StorageModel } from '../model/cre-step4.model';


@Component({
    templateUrl: '../template/pf-mng-detail.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})
export class PfDetailComponent implements OnInit {
    constructor(private layoutService: LayoutService,
        private route: Router,
        private router: ActivatedRoute,
        private zoneListService: ZoneListService,
        private storageListService:StorageListService,
        private platformDetailService: PlatformDetailService,
        private commonService: ClMngCommonService,
        private location: Location,
        private dictPipe: dictPipe,
    ) {
    }
    @ViewChild('removeConfirm')
    removeConfirm: ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('updateZonePop')
    updateZonePop: PopupComponent;

    @ViewChild('updateZoneResourcePop')
    updateZoneResourcePop: PopupComponent;

    @ViewChild('updateStoragePop')
    updateStoragePop: PopupComponent;

    @ViewChild('updateStoraeResourcePop')
    updateStoraeResourcePop: PopupComponent;


    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";
    // 云平台状态
    platFormStatus: Array<any> = new Array<any>();
    Tabels = [
        { name: '基本信息', active: true },
        { name: '可用区与配额', active: false },
        { name: '存储区与配额', active: false }
    ]
    platformName: string;
    platformType: string;
    platformTypes: Array<any> = new Array<any>();
    platformVersion: Array<any> = new Array<any>();
    regions: Array<any> = new Array<any>();
    platform: Platform = new Platform();
    //可用区列表
    zoneList: Array<ZoneListModel>;
    updateZoneList: Array<ZoneListModel>;
    //初始化
    ngOnInit() {
        let id: string;
        this.router.params.forEach((params: Params) => {
            id = params['id'];
            this.platformType = params['type'];
            this.platformName = params['name'];
            console.log(this.platformType);
        })
        //获取云平台类型列表
        this.layoutService.show();
        this.commonService.getPlatFormTypes()
            .then(
            res => {
                console.log(res);
                this.platformTypes = res;
            }
            ).then(() => {
                this.platformDetailService.getPlatform(id)
                    .then(
                    res => {
                        console.log('platform basic', res);
                        this.platform = res.resultContent;
                        this.platformTypes.forEach(ele => {
                            if (ele.value == this.platform.platformType) {
                                ele.isSelected = true;
                                this.getVersion(ele.code);
                            }
                        })
                        this.getZoneList();
                        this.getStorageList();
                        this.layoutService.hide();
                    }
                    )
            })
            .catch(
            err => {
                console.error('err');
                this.layoutService.hide();
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_INFO_ERROR');
            }
            )
        //获取区域列表
        this.commonService.getRegion()
            .then(

            res => {
                console.log('region', res);
                this.regions = res;
            }
            ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', '获取区域信息错误');
            }
            )

    }
    //切换TAB
    changeTab(item, index) {
        this.Tabels.forEach((ele) => {
            ele.active = false;
        })
        item.active = true;
    }
    //选择平台类型
    choosePlatFormType(item, index) {
        for (let i = 0; i < this.platformTypes.length; i++) {
            this.platformTypes[i].isSelected = false;
        }
        this.platformTypes[index].isSelected = true;
        this.platform.platformType = item.value;
        console.log(item);
        this.platform.version = '';
        this.getVersion(item.code);
    }
    //获取版本版本
    getVersion(code) {
        this.commonService.getVersion(code).then(
            res => {
                console.log(res);
                this.platformVersion = res
                this.platform.platformType = this.platformVersion[0].value;
            }
        ).catch(
            err => {
                console.error('err');
                this.notice.open('COMMON.ERROR', 'PF_MNG2.GET_VERSION_ERROR');
            }
            )
    }
    /////////////////////////////////////////////////////////////////////////////////////可用区
    //获取可用区列表
    getZoneList() {
        this.layoutService.show();
        this.zoneListService.getZone(this.platform.id).then(
            res => {
                this.zoneList = res.resultContent;
                this.zoneList.forEach(ele => {
                    ele.quotaPercentage =
                        ele.quotaPercentage ? ele.quotaPercentage : 0;
                    ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                })
                console.log('zoneList',res);
                this.layoutService.hide();
            }
        ).catch(err => {
            console.error('获取可用区列表出错', err)
            this.layoutService.hide();
        })

    }   
    //启用可用区
    enableZone(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.enableZone(id).then(res => {
            console.log(res)
            this.getZoneList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('启用可用区失败', err);
            this.layoutService.hide();
        })
    }
    //禁用可用区
    suspendZone(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.suspendZone(id).then(res => {
            console.log(res)
            this.getZoneList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('禁用可用区失败', err);
        })
    }
    //更多操作
    tempZoneList: Array<ZoneListModel>=new Array<ZoneListModel>();
    editZone(zone, idx) {
        console.log(zone);
        console.log(this.tempZoneList);
        this.tempZoneList[idx]=new ZoneListModel();
        Object.assign(this.tempZoneList[idx], zone)
        this.zoneList[idx].isEdit = true;
    }
    saveZone(zone) {
        console.log(this.zoneList);
        this.zoneList.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        this.zoneListService.putZone(this.platform.id,this.zoneList).then(res => {
            console.log(res);
            this.getZoneList();
            zone.isEdit = false;
        }).catch(err => {
            console.error(err);
        })
    }
    cancelEdit(zone,idx) {
        console.log(this.tempZoneList[idx]);
        Object.assign(zone, this.tempZoneList[idx]);
        this.tempZoneList[idx]=new ZoneListModel();
        zone.isEdit = false;
    }

    //更新可用区弹出框
    updateZone() {
        this.platformDetailService.getUpdateZoneList(this.platform.id).then(
            res => {
                this.updateZoneList = res.resultContent;
                if (this.updateZoneList.length == 0) {
                    this.notice.open('oo', '暂时没有可同步可用区信息')
                } else {
                    this.updateZoneList.forEach(ele => {
                        if (ele.quotaPercentage) {
                            ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                        }
                    })
                    console.log('同步', res);
                    this.updateZonePop.open('同步可用区信息')
                }
            }
        ).catch(err => {
            console.error('获取更新可用区列表出错', err)
        })
    }
    //同步可用区
    otUpdateZone() {
        this.platformDetailService.putUpdateZoneList(this.updateZoneList).then(
            res => {
                console.log('同步', res);
                this.getZoneList();
            }
        ).catch(err => {
            console.error('获取更新可用区列表出错', err)
        })
    }
    //同步资源get
    countZoneResource: Array<ZoneListModel>;
    updateResourcePop(zoneId) {
        console.log(zoneId);
        this.platformDetailService.getUpdateZone(zoneId).then(
            res => {
                console.log('同步计算资源', res);
                if (res.resultCode == 100) {
                    if (res.resultContent && res.resultContent.length > 0) {
                        this.countZoneResource = res.resultContent;
                        this.updateZoneResourcePop.open('同步计算资源');
                    } else {
                        this.notice.open('oo', '暂时没有可同步计算资源信息')
                    }

                }
            }
        ).catch(err => {
            console.error('获取同步计算资源出错', err)
        })
    }
    otUpdateResource() {
        this.platformDetailService.putUpdateZone(this.countZoneResource).then(
            res => {
                console.log('put同步计算资源', res);
                this.getZoneList();
            }
        ).catch(err => {
            console.error('put同步计算资源出错', err)
        })
    }
    ccf() {

    }
    /////////////////////////////////////////////////////////////////////////////////////////////存储区
    //获取存储区列表
    storageList: Array<StorageModel> = new Array<StorageModel>();
    getStorageList(){
        this.layoutService.show();
         this.storageListService.getStorage(this.platform.id).then(
            res => {
                this.storageList = res.resultContent;
                this.storageList.forEach(ele => {
                    ele.quota=
                        ele.quota?ele.quota:0;
                    ele.quotaPercentDisplay = ele.quota * 100;                    
                })
                //Openstack类型同步volumeType信息
                // if (this.platformType == '0') {
                //     this.service.getvolumeType(platFormId).then(
                //         res => {
                //             console.log(res);
                //         }
                //     ).catch(err => {
                //         console.error(err);
                //     });
                // }
                console.log('sorageList',this.storageList);
                this.layoutService.hide();
            }
        ).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
            }
            )
    }
    //启用存储区
    enableStorage(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.enableStorage(id).then(res => {
            console.log(res)
            this.getStorageList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('启用存储区失败', err);
            this.layoutService.hide();
        })
    }
    //禁用存储区
    suspendStorage(id: string) {
        console.log(id);
        this.layoutService.show();
        this.platformDetailService.suspendStorage(id).then(res => {
            console.log(res)
            this.getStorageList();
            this.layoutService.hide();
        }).catch(err => {
            console.error('禁用存储区失败', err);
        })
    }
    //更多操作
    tempStorageList: Array<StorageModel>=new Array<StorageModel>();
    editStorage(storage, idx) {
        console.log(storage);
        console.log(this.tempStorageList);
        this.tempStorageList[idx]=new StorageModel();
        Object.assign(this.tempStorageList[idx], storage)
        this.storageList[idx].isEdit = true;
    }
    saveStorage(storage) {
        console.log(this.tempStorageList);
        this.storageList.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        this.layoutService.show();
        this.storageListService.putStorage(this.platform.id,this.storageList).then(res => {
            console.log(res);
            this.getStorageList();
            storage.isEdit = false;
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    cancelEditStorage(storage,idx) {
        console.log(this.tempStorageList[idx]);
        Object.assign(storage, this.tempStorageList[idx]);
        this.tempStorageList[idx]=new StorageModel();
        storage.isEdit = false;
    }

    //更新存储区弹出框
    updateStorageList:Array<StorageModel>
    updateStorageListPop() {
        this.platformDetailService.getUpdateStorageList(this.platform.id).then(
            res => {
                this.updateStorageList = res.resultContent;
                if (this.updateStorageList.length == 0) {
                    this.notice.open('oo', '暂时没有可同步可用区信息')
                } else {
                    this.updateStorageList.forEach(ele => {
                        // if (ele.quotaPercentage) {
                        //     ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                        // }
                    })
                    console.log('同步', res);
                    this.updateStoragePop.open('同步可用区信息')
                }
            }
        ).catch(err => {
            console.error('获取更新可用区列表出错', err)
        })
    }
    //同步存储区
    otUpdateStorageList() {
        // this.platformDetailService.putUpdateZoneList(this.updateZoneList).then(
        //     res => {
        //         console.log('同步', res);
        //         this.getZoneList();
        //     }
        // ).catch(err => {
        //     console.error('获取更新可用区列表出错', err)
        // })
    }
    //同步存储后端get
    countStorageResource: Array<StorageModel>;
    updateStorage(zoneId) {
        console.log(zoneId);
        // this.platformDetailService.getUpdateZone(zoneId).then(
        //     res => {
        //         console.log('同步计算资源', res);
        //         if (res.resultCode == 100) {
        //             if (res.resultContent && res.resultContent.length > 0) {
        //                 this.countZoneResource = res.resultContent;
        //                 this.updateResource.open('同步计算资源');
        //             } else {
        //                 this.notice.open('oo', '暂时没有可同步计算资源信息')
        //             }

        //         }
        //     }
        // ).catch(err => {
        //     console.error('获取同步计算资源出错', err)
        // })
    }
    //同步存储后端put
    otUpdateStorage() {
        // this.platformDetailService.putUpdateZone(this.countZoneResource).then(
        //     res => {
        //         console.log('put同步计算资源', res);
        //         this.getZoneList();
        //     }
        // ).catch(err => {
        //     console.error('put同步计算资源出错', err)
        // })
    }
    //返回
    back() {
        this.location.back();
    }
    goList() {
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    save() {
        console.log(this.platform);
        if (!this.platform.name) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.PLATFORM_NAME_REQUIRED');
        }
        if (!this.platform.dataCenter) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.DATA_CENTER_REQUIRED');
        }
        if (!this.platform.uri) {
            return this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.ADDRESS_REQUIRED');
        }
        this.layoutService.show();
        this.platformDetailService.putPlatform(this.platform).then(res => {
            console.log(res);
            this.layoutService.hide();
            this.location.back();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }

}
