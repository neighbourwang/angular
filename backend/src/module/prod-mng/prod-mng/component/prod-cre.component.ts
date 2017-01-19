/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, NoticeComponent, CountBarComponent } from '../../../../architecture';

// service;
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
import { ProdDirListService } from '../service/prodDirList.service';
import { PostProduct } from '../service/postProd.service';
//model
import { Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';

@Component({
    selector: 'prod-cre',
    templateUrl: '../template/prod-cre.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdCreComponent implements OnInit, OnChanges {
    constructor(
        private router: Router,
        private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        private ProdDirListService: ProdDirListService,
        private LayoutService: LayoutService,        
        private PostProduct: PostProduct
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    enterpriseList = new Array();
    prodDirList = new Array();
    prodDir = new ProductDir();
    prodDirId: string;
    product = new Product();
    vmProdDir: boolean;
    diskProdDir: boolean;
    ngOnInit() {
        //获取企业列表
        
        this.ProdDirListService.getEnterpriseList().then(response => {
            console.log('企业', response);
            
            // if (response && 100 == response.resultCode) {
            this.enterpriseList = response.resultContent;
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
        //获取产品目录下拉列表 
        this.LayoutService.show();       
        this.ProdDirListService.getProdDirList().then(response => {
            
            console.log('目录', response);
            // if (response && 100 == response.resultCode) {
            this.prodDirList = response.resultContent;
            this.prodDirId = response.resultContent[0].id;
            this.product.serviceId = response.resultContent[0].id;
            if (response.resultContent[0].code == 'VITRUALMACHINE_SERVICE') {
                this.vmProdDir = true;
                this.getVmProdDirDetail(this.prodDirId);
            } else if (response.resultContent[0].code == 'VITRUALDISK_SERVICE') {
                this.vmProdDir = false;
                this.getVmProdDirDetail(this.prodDirId);
                // this.getDiskProdDirDetail(this.prodDirId);
            }
            // } else {

            // }
            this.LayoutService.hide();
        }).catch(err => {
            console.error(err)
            this.LayoutService.hide();
        })
    }
    //获取VM产品目录详情
    getVmProdDirDetail(id) {
        this.prodDir = new ProductDir();
        this.LayoutService.show();
        this.ProdDirDetailService.getVmProdDirDetail(id).then(response => {
            console.log('VM产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
                this.LayoutService.hide();
            } else {

            }
        }).catch(err => {
            console.error(err)
            this.LayoutService.hide();
        })
    }
    //获取DISK产品目录详情
    getDiskProdDirDetail(id) {
        this.prodDir = new ProductDir();
        this.LayoutService.show();
        this.ProdDirDetailService.getDiskProdDirDetail(id).then(response => {
            console.log('DISK产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
                this.LayoutService.hide();
            } else {

            }
        }).catch(err => {
            console.error(err)
            this.LayoutService.hide();
        })
    }
    //初始化产品信息
    initProduct() {
        this.product.basicCyclePrice = 0;
        this.product.billingCycle = '';
        this.product.billingType = '';
        this.product.extendCyclePrice = 0;
        // this.product.name='';
        this.product.oneTimePrice = 0;
        this.product.productEnterpiseReqs = [];
        this.product.productPlatformReqs = [];
        // this.product.serviceId='';
        this.product.unitPrice = 0;
        this.product.desc = ''
    }
    //选择产品目录
    selectProdDir(id) {
        let prodDir: any = this.prodDirList.find((prodDir) => prodDir.id == id)
        // this.initProduct() ;
        this.product.serviceId = id;
        this.product.productPlatformReqs = [];
        if (prodDir.code == 'VITRUALMACHINE_SERVICE') {
            this.vmProdDir = true;
            this.getVmProdDirDetail(this.prodDirId);
        } else if (prodDir.code == 'VITRUALDISK_SERVICE') {
            this.vmProdDir = false;
            this.getVmProdDirDetail(this.prodDirId);
            // this.getDiskProdDirDetail(this.prodDirId);
        }
    }
    //选择企业
    selectEnterprise(ent, index) {
        // ent.selected = !ent.selected;
        // this.product.productEnterpiseReqs = this.enterpriseList.filter((ele) => {
        //     if (ele.selected == true) {
        //         return ele;
        //     }
        // });
        this.product.productEnterpiseReqs.push(ent);
        this.enterpriseList.splice(index,1);
        console.log(this.product.productEnterpiseReqs)
    }
    //
    unSelected(ent,index){
        this.enterpriseList.push(ent);
        this.product.productEnterpiseReqs.splice(index,1);
    }
    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        for (let plate of this.prodDir.platformInfo) {
            for (let zone of plate.zoneList) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.product.productPlatformReqs = this.prodDir.platformInfo.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.product.productPlatformReqs);
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        console.log(idx, idxx);        
        this.prodDir.platformInfo[idx].zoneList[idxx].selected = !this.prodDir.platformInfo[idx].zoneList[idxx].selected;
        this.product.productPlatformReqs = this.prodDir.platformInfo.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        if(this.product.productPlatformReqs.length==0){
            this.selectAllZone=false;
        }
        console.log(this.product.productPlatformReqs);
    }
    //选择全部存储后端
    selectAllStorage: boolean = false;
    selectAllStorages() {
        this.selectAllStorage = !this.selectAllStorage;
        for (let plate of this.prodDir.platformList) {
            for (let storage of plate.storages) {
                storage.selected = this.selectAllStorage;
                // console.log(zone.storageList);
            }
        }
        this.getProductPlatformReqs();
    }
    //选择存储后端
    selectStorage(idx, idxx) {
        console.log(idx, idxx);
        this.prodDir.platformList[idx].storages[idxx].selected = !this.prodDir.platformList[idx].storages[idxx].selected;
        console.log(this.prodDir.platformList[idx].storages[idxx].selected);
        this.getProductPlatformReqs();
    }
    //获取Post产品平台信息
    getProductPlatformReqs() {
        let findPlateform: boolean = false;
        for (let plateform of this.prodDir.platformList) {
            let list = [];
            for (let storage of plateform.storages) {
                if (storage.selected == true) {
                    findPlateform = true;
                    list.push(storage);
                }
            }
            console.log(list);
            if (list.length > 0) {
                if (this.product.productPlatformReqs.length == 0) {
                    this.product.productPlatformReqs.push({
                        platformId: plateform.platformId,
                        platformName: plateform.platformName,
                        zoneList: list
                    });
                } else {
                    for (let p of this.product.productPlatformReqs) {
                        if (p.platformId != plateform.platformId) {
                            console.log('diff');
                            this.product.productPlatformReqs.push({
                                platformId: plateform.platformId,
                                platformName: plateform.platformName,
                                zoneList: list
                            });
                        } else {
                            console.log('same');
                            this.product.productPlatformReqs.forEach((p) => {
                                if (p.platformId == plateform.platformId) {
                                    p.zoneList = list;
                                }
                            })
                        }
                    }
                }

            }

        }
        if (!findPlateform) {
            this.product.productPlatformReqs = [];
            this.selectAllStorage=false;
        }
        console.log(this.product.productPlatformReqs);
    }



    cancel() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

    valid() {


    }


    onSubmit() {
        console.log(this.product);
        if(!this.vmProdDir){
            // this.selectAllStorages();
            console.log(this.product);
            this.product.productPlatformReqs=this.prodDir.platformInfo;
        }
        if (!this.product.name || this.product.name.trim() == "") {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.INPUT_PRODUCT_NAME'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.INPUT_PRODUCT_NAME=>请输入产品名称 


            return;
        }
        if (!this.product.billingType) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_COUNT_MODE'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_COUNT_MODE=>请选择计费模式 


            return;
        }
        if (!this.product.billingCycle) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_COUNT_CYCLE'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_COUNT_CYCLE=>请选择计费周期 


            return;
        }
        if (this.product.productPlatformReqs.length < 1) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PLATFORM'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PLATFORM=>请选择可用平台 


            return;
        }

        console.log("dd");
        this.LayoutService.show();
        
        this.PostProduct.postProduct(this.product).then(response => {
            console.log('产品', response);
            this.LayoutService.hide();
            // if (response && 100 == response.resultCode) {
            this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
            // } else {

            // }
        }).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }
    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let key in changes) {
            let item = changes[key];
            console.log(item);
        }
    }


    outputValue(e, num) {
        console.log(e);
        console.log(num);
        this.product[num] = e;
    }

}
