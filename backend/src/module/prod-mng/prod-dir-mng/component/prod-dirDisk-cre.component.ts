/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, ValidationService, NoticeComponent, CountBarComponent } from '../../../../architecture';

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
        private LayoutService: LayoutService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    prodDir:ProdDirDisk 
    _platformlist: Array<platform> = new Array<platform>();

    pageTitle:string='';
    type:string;
    serviceId:string;
    ngOnInit() {
        this.prodDir= new ProdDirDisk();
        this.route.params.forEach((params: Params) => {
            this.type = params['type'];
            if (this.type == 'new') {
                this.serviceId=params['id'];
                console.log(this.serviceId);
            } 
        })
        if(this.type=='new'){
            this.getPlateForm();            
        }else{
             this.pageTitle='PROD_MNG.EDIT_PRODUCT_CATALOG'
             this.getProdDirDetail(this.serviceId);
        }
    }
    //获取平台列表;
    getPlateForm() {
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
                            zone.storageId = zone.storageItem[0].storageId;
                            for (let storage of zone.storageItem) {
                                storage.selected = false;
                            }
                            // console.log(zone.storageList);
                            zone.storageItem[0].selected = true;
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

    selectStorage(id,idx,idxxx) {
        console.log(id,idx,idxxx)
                for (let storage of this._platformlist[idx].platformInfo[idxxx].storageItem) {
                    if (storage.storageId == id) {
                        storage.selected = true;
                    } else {
                        storage.selected = false;
                    }
                }
    }
    getProdDirDetail(id) {
        this.ProdDirDetailService.getVmProdDirDetail(id).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    console.log('diskdetail',response);
                    if(response.resultContent){
                        this.prodDir = response.resultContent;
                    }
                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
        })
        console.log(this.prodDir);
    }
    //同步countBar数据
    outputValue(e, arg) {
        this.prodDir.specification[arg] = e;
        if(arg!='maxSize'){
            this.prodDir.specification.maxSize=
                this.prodDir.specification.maxSize?this.prodDir.specification.maxSize:0;
            this.prodDir.specification.initialSize=
                this.prodDir.specification.initialSize?this.prodDir.specification.initialSize:0;
            this.prodDir.specification.stepSize=
                this.prodDir.specification.stepSize?this.prodDir.specification.stepSize:1;
            const beyond = (this.prodDir.specification.maxSize - this.prodDir.specification.initialSize)%this.prodDir.specification.stepSize;
            if( beyond !== 0)  this.prodDir.specification.maxSize = 
            (this.prodDir.specification.stepSize/2 <= beyond) ? this.prodDir.specification.maxSize - beyond + this.prodDir.specification.stepSize : this.prodDir.specification.maxSize - beyond;
        }        
    }
    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        console.log(this.selectAllZone);
        for (let plate of this._platformlist) {
            if (!plate.platformInfo) continue;
            for (let zone of plate.platformInfo) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            if (ele.platformInfo) {
                for (let zone of ele.platformInfo) {
                    if (zone.selected == true) {
                        return ele;
                    }
                }
            }

        })
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        console.log(idx)
        console.log(idxx)
        this._platformlist[idx].platformInfo[idxx].selected = !this._platformlist[idx].platformInfo[idxx].selected;
        console.log(this._platformlist[idx]);
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            if (ele.platformInfo) {
                for (let zone of ele.platformInfo) {
                    if (zone.selected == true) {
                        return ele;
                    }
                }
            }

        })
        console.log(this.prodDir.platformList);
        if (this.prodDir.platformList.length !=this._platformlist.length) {
            this.selectAllZone = false;
            return;
        }
        this.selectAllZone=true;
        for(let platform of this._platformlist){
            for(let zone of platform.platformInfo){
                if(zone.selected==false){
                   return this.selectAllZone=false;                           
                }
            }                
        }        
    }

    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        //重新刷新选择平台
        this.prodDir.platformList=[];
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            if (ele.platformInfo) {
                for (let zone of ele.platformInfo) {
                    if (zone.selected == true) {
                        return ele;
                    }
                }
            }

        })
        console.log(this.prodDir);
        if (!this.prodDir.serviceName) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.INPUT_PRODUCT_CAT'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.INPUT_PRODUCT_CAT=>请输入产品目录名称 
            return;
        }
        if (this.prodDir.specification.maxSize == 0 || this.prodDir.specification.stepSize == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.PRODUCT_SPEC_ERROR'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.PRODUCT_SPEC_ERROR=>产品规格数据设置错误 


            return;
        }
        if (this.prodDir.platformList.length == 0) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PLATFORM'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PLATFORM=>请选择可用平台 


            return;
        }
        this.LayoutService.show();
        this.CreateProdDirService.postDiskProdDir(this.prodDir).then(response => {
            console.log(response)
            this.LayoutService.hide();
            this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
        }).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }


}
