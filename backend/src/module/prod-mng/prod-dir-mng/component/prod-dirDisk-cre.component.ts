/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, ValidationService, NoticeComponent, CountBarComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { ProdDirDetailService } from '../service/prod-dir-detail.service';
import { CreateProdDirService } from '../service/prod-dir-new.service';
//model
import { ProdDirDisk, platform, storageItem } from '../model/prodDirDisk.model';

@Component({
    selector: 'prod-dirdisk-cre',
    templateUrl: '../template/prod-dirDisk-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirDiskCreComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ProdDirDetailService: ProdDirDetailService,
        private CreateProdDirService: CreateProdDirService,
        private LayoutService: LayoutService,
        private v: Validation
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    prodDir: ProdDirDisk
    _platformlist: Array<platform> = new Array<platform>();

    pageTitle: string = '';
    type: string;
    serviceId: string;
    ngOnInit() {
        this.prodDir = new ProdDirDisk();
        this.route.params.forEach((params: Params) => {
            this.type = params['type'];
            if (this.type == 'edit') {
                this.serviceId = params['id'];
                console.log(this.serviceId);
            }
        })
        if (this.type == 'new') {
            this.pageTitle = "PROD_MNG.CREATE_PRODUCT_CATALOG";
            this.getPlateForm();
        } else {
            this.pageTitle = 'PROD_MNG.EDIT_PRODUCT_CATALOG'
            this.getProdDirDetail(this.serviceId);
        }
    }
    //获取平台列表;
    getPlateForm() {
        this.LayoutService.show();
        this.CreateProdDirService.getDiskPlateForms().then(
            response => {
                console.log('PINGTAI', response);
                if (response && 100 == response.resultCode) {
                    // let resultContent = response.resultContent;
                    this._platformlist = response.resultContent;
                    for (let plate of this._platformlist) {
                        if (!plate.platformInfo) continue;
                        for (let zone of plate.platformInfo) {
                            zone.selected = false;
                            // zone.storageId = zone.storageItem[0].storageId;
                            for (let storage of zone.storageItem) {
                                storage.selected = false;
                            }
                            // console.log(zone.storageList);
                            // zone.storageItem[0].selected = true;
                        }
                    }
                } else {

                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }

    //获取启动盘信息
    selectStorage(idx, idxx, idxxx) {
        console.log(idx, idxx, idxxx)
        // this._platformlist[idx].platformInfo[idxx].storageItem[idxxx].selected=!this._platformlist[idx].platformInfo[idxx].storageItem[idxxx].selected
        // for (let storage of this._platformlist[idx].platformInfo[idxxx].storageItem) {
        //     if (storage.storageId == id) {
        //         storage.selected = true;
        //     } else {
        //         storage.selected = false;
        //     }
        // }
    }
    getProdDirDetail(id) {
        this.LayoutService.show();
        this.ProdDirDetailService.getDiskProdDirDetail(id).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    console.log('diskdetail', response);
                    if (response.resultContent) {
                        this.prodDir = response.resultContent;
                        this._platformlist = JSON.parse(JSON.stringify(this.prodDir.platformList));
                        for (let platform of this._platformlist) {
                            for (let zone of platform.platformInfo) {
                                for (let storage of zone.storageItem) {
                                    if (storage.selected) {
                                        storage.disable = storage.selected;
                                    } else {
                                        storage.selected = false;
                                    }
                                }
                            }
                        }
                    }
                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.LayoutService.hide();            
        })
        console.log(this.prodDir);
    }
    //同步countBar数据
    outputValue(e, arg) {
        this.prodDir.specification[arg] = e;
        if (arg != 'maxSize') {
            this.prodDir.specification.maxSize =
                this.prodDir.specification.maxSize ? this.prodDir.specification.maxSize : 0;
            this.prodDir.specification.initialSize =
                this.prodDir.specification.initialSize ? this.prodDir.specification.initialSize : 0;
            this.prodDir.specification.stepSize =
                this.prodDir.specification.stepSize ? this.prodDir.specification.stepSize : 1;
            const beyond = (this.prodDir.specification.maxSize - this.prodDir.specification.initialSize) % this.prodDir.specification.stepSize;
            if (beyond !== 0) this.prodDir.specification.maxSize =
                (this.prodDir.specification.stepSize / 2 <= beyond) ? this.prodDir.specification.maxSize - beyond + this.prodDir.specification.stepSize : this.prodDir.specification.maxSize - beyond;
        }
    }
    //选择全部可用区
    // selectAllZone: boolean = false;
    // selectAllZones() {
    //     this.selectAllZone = !this.selectAllZone;
    //     console.log(this.selectAllZone);
    //     for (let plate of this._platformlist) {
    //         if (!plate.platformInfo) continue;
    //         for (let zone of plate.platformInfo) {
    //             zone.selected = this.selectAllZone;
    //             // console.log(zone.storageList);
    //         }
    //     }
    //     this.prodDir.platformList = this._platformlist.filter(function (ele) {
    //         if (ele.platformInfo) {
    //             for (let zone of ele.platformInfo) {
    //                 if (zone.selected == true) {
    //                     return ele;
    //                 }
    //             }
    //         }

    //     })
    // }
    //选择平台可用区
    // selectZone(idx, idxx) {
    //     console.log(idx)
    //     console.log(idxx)
    //     this._platformlist[idx].platformInfo[idxx].selected = !this._platformlist[idx].platformInfo[idxx].selected;
    //     console.log(this._platformlist[idx]);
    //     this.prodDir.platformList = this._platformlist.filter(function (ele) {
    //         if (ele.platformInfo) {
    //             for (let zone of ele.platformInfo) {
    //                 if (zone.selected == true) {
    //                     return ele;
    //                 }
    //             }
    //         }

    //     })
    //     console.log(this.prodDir.platformList);
    //     if (this.prodDir.platformList.length != this._platformlist.length) {
    //         this.selectAllZone = false;
    //         return;
    //     }
    //     this.selectAllZone = true;
    //     for (let platform of this._platformlist) {
    //         for (let zone of platform.platformInfo) {
    //             if (zone.selected == false) {
    //                 return this.selectAllZone = false;
    //             }
    //         }
    //     }
    // }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            serviceName: [this.prodDir.serviceName, [this.v.isBase, this.v.isUnBlank], "产品目录名称格式不正确"],

            description: [this.prodDir.description, [this.v.maxLength(68)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        //重新刷新选择平台
        let message = this.checkForm();
        if (message) return;
        if (this.prodDir.specification.maxSize == 0 || this.prodDir.specification.stepSize == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PRODUCT_SPEC_ERROR'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PRODUCT_SPEC_ERROR=>产品规格数据设置错误 
            return;
        }
        this.prodDir.platformList = [];
        this._platformlist.forEach(function (ele) {
            if (ele.platformInfo) {
                for (let zone of ele.platformInfo) {
                    for (let storage of zone.storageItem) {
                        if (storage.selected == true) {
                            zone.selected = true;
                            ele.selected = true;
                        }
                    }
                }
            }
        })
        this.prodDir.platformList =this._platformlist.filter(ele=>{
            if(ele.selected==true){
                return ele;
            }
        });
        console.log('产品目录',this.prodDir);        
        if (this.prodDir.platformList.length == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PLATFORM'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PLATFORM=>请选择可用平台 
            return;
        }
        if (this.type == 'new') {
            this.LayoutService.show();
            this.CreateProdDirService.postDiskProdDir(this.prodDir).then(response => {
                console.log(response)
                this.LayoutService.hide();
                this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
            }).catch(err => {
                console.error(err);
                this.LayoutService.hide();
            })
        } else {
            console.log(this.prodDir);
            this.LayoutService.show();
            this.CreateProdDirService.editDiskProdDir(this.serviceId, this.prodDir).then(response => {
                console.log(response);
                this.LayoutService.hide();
                this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
            }).catch(err => {
                console.error(err);
                this.LayoutService.hide();
            })
        }

    }


}
