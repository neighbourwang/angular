/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
// import { Config} from '../model/config';
import { Config } from '../../../../architecture/components/countBar/config/config';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';

// import {  } from '../service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
// import { ProdListService } from '../service/prodList.service';
import { ProdDirListService } from '../service/prodDirList.service';
import { PostProduct } from '../service/postProd.service';
//model
import { Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';
//mockup
// import {}

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
        private PostProduct:PostProduct
    ) { }

    enterpriseList = new Array();
    prodDirList = new Array();
    prodDir = new ProductDir();
    prodDirId:string;
    product=new Product();
    basicCyclePriceBar=new Config();
    oneTimePriceBar=new Config();
    extendCyclePriceBar=new Config();
    unitPriceBar=new Config();   
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
            this.prodDirId=response.resultContent[0].id;
            // } else {
            this.getProdDirDetail(this.prodDirId);    
            // }
        }).catch(err => {
            console.error(err)
        })

        this.product.billingType="1";
        
    }

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
    selectProdDir(){
        console.log(this.prodDirId);
        setTimeout(()=>{
            console.log(this.prodDirId);
            this.getProdDirDetail(this.prodDirId);
        },100);
        
    }
    //选择企业
    selectEnterprise(ent, index) {
        ent.selected=!ent.selected;
       this.product.productEnterpiseReqs= this.enterpriseList.filter((ele)=>{
            if(ele.selected==true){
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
        // this.prodDir.platformList = this._platformlist.filter(function (ele) {
        //     for (let zone of ele.zoneList) {
        //         if (zone.selected == true) {
        //             return ele;
        //         }
        //     }
        // })
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        console.log(idx,idxx);
        console.log(this.prodDir.platformInfo);
        this.prodDir.platformInfo[idx].zoneList[idxx].selected = !this.prodDir.platformInfo[idx].zoneList[idxx].selected;        
        // this.product.productPlatformReqs= 
        //  let list=this.prodDir.platformInfo.filter(function (ele) {
        //     for (let zone of ele.zoneList) {                
        //         if (zone.selected == true) {
        //             let returnPlatform:{
        //                 id:string,
        //                 name:string,
        //                 zones:[
        //                     {
        //                         skuId:string,
        //                         name:string
        //                     }
        //                 ]
        //             };
        //             // returnPlatform.zones=[];
        //             returnPlatform.id= ele.platformId,
        //             returnPlatform.name= ele.platformName,
        //             returnPlatform.zones.push({
        //                 skuId:zone.skuId,
        //                 name:zone.zoneName
        //             })
        //             return returnPlatform;
        //         }
        //     }
        // })
        // console.log(list);
    }





    cancel() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

    onSubmit() {
        console.log(this.product);
        this.PostProduct.postProduct(this.product).then(response => {
            console.log('产品', response);
            if (response && 100 == response.resultCode) {
                this.router.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
            } else {

            }
        }).catch(err => {
            console.error(err)
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
        this.product[num]=e;
    }

    postProd() {

    }
}
