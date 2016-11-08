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
        private PostProduct: PostProduct
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    enterpriseList = new Array();
    prodDirList = new Array();
    prodDir = new ProductDir();
    prodDirId: string;
    product = new Product();
    ngOnInit() {
        console.log('init');
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
        this.ProdDirListService.getProdDirList().then(response => {
            console.log('目录', response);
            // if (response && 100 == response.resultCode) {
            this.prodDirList = response.resultContent;
            this.prodDirId = response.resultContent[0].id;
            this.product.serviceId = response.resultContent[0].id;
            // } else {
            this.getProdDirDetail(this.prodDirId);
            // }
        }).catch(err => {
            console.error(err)
        })
    }
    //获取产品目录详情
    getProdDirDetail(id) {
        this.ProdDirDetailService.getVmProdDirDetail(id).then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    //选择产品目录
    DiskProduct: boolean;
    selectProdDir(id) {
        console.log(id);
        console.log(this.prodDirId);
        this.product.serviceId = id;
        this.getProdDirDetail(id);
    }
    //选择企业
    selectEnterprise(ent, index) {
        ent.selected = !ent.selected;
        this.product.productEnterpiseReqs = this.enterpriseList.filter((ele) => {
            if (ele.selected == true) {
                return ele;
            }
        })
        console.log(this.product.productEnterpiseReqs)
    }

    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        console.log(this.selectAllZone);
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
        console.log(this.prodDir.platformInfo);
        this.prodDir.platformInfo[idx].zoneList[idxx].selected = !this.prodDir.platformInfo[idx].zoneList[idxx].selected;
        this.product.productPlatformReqs = this.prodDir.platformInfo.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.product.productPlatformReqs);
    }





    cancel() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

    valid() {


    }


    onSubmit() {
        console.log(this.product);
        if (!this.product.name || this.product.name.trim() == "") {
            this.notice.open('操作错误', '请输入产品名称');
            return;
        }
        if (!this.product.billingType) {
            this.notice.open('操作错误', '请选择计费模式');
            return;
        }
        if (!this.product.billingCycle) {
            this.notice.open('操作错误', '请选择计费周期');
            return;
        }
        if (this.product.productPlatformReqs.length < 1) {
            this.notice.open('操作错误', '请选择可用平台');
            return;
        }

        console.log("dd");
        // this.PostProduct.postProduct(this.product).then(response => {
        //     console.log('产品', response);
        //     if (response && 100 == response.resultCode) {
        //         this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
        //     } else {

        //     }
        // }).catch(err => {
        //     console.error(err)
        // })
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
