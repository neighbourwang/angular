
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

// service;
import { ProdDirListService } from '../service/prodDirList.service';

import { CreateProdStepService } from '../service/createProdStep.service';

import { PostProduct } from '../service/postProd.service';

@Component({
    templateUrl: '../template/prod-mng-cre-step-04.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdMngCreStep4Component implements OnInit {

    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private layoutService: LayoutService,
        private service: CreateProdStepService,
        private ProdDirListService: ProdDirListService,
        private PostProduct: PostProduct
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;
    
    platformIdList = new Array();
    //平台列表是否发生改变
    isPlatformChange: boolean=false;
    ngOnInit() {        
        //获取企业列表
        this.service.product.productPlatformReqs.forEach(ele => {
            this.platformIdList.push(ele.platformId)
        });
        console.log('compare',this.service.comparePlatIdList);
        //获取平台列表是否发生改变        
        if(this.service.comparePlatIdList.length==0||this.service.comparePlatIdList.length!=this.platformIdList.length){
            this.isPlatformChange=true;
        }else{
            this.platformIdList.sort();
            this.service.comparePlatIdList.sort();
            for(let i=0;i<this.service.comparePlatIdList.length;i++){
                for(let j=0;j<this.platformIdList.length;i++){
                    if(this.service.comparePlatIdList[i]!=this.platformIdList[j]){
                        this.isPlatformChange=true;
                        return;
                    }
                }
                if(i=this.service.comparePlatIdList.length){
                    return this.isPlatformChange=false;
                }
            }
        }
        //请求企业列表
        console.log(this.isPlatformChange);
        if (this.isPlatformChange) {
            this.service.product.productEnterpiseReqs = [];
            this.service.product.enterpriseListForSelect=[];
            this.layoutService.show();
            this.service.getEnterpriseList(this.platformIdList).then(response => {
                console.log('企业', response);                
                this.layoutService.hide();
                if (!response.resultContent || response.resultContent.length == 0) {
                    this.notice.open('提示', '根据所选平台列表暂时没有对应的可供发布企业');
                }else{
                    // if (response && 100 == response.resultCode) {
                //比对ID列表更新为上次请求的ID的列表；
                this.service.comparePlatIdList=JSON.parse(JSON.stringify(this.platformIdList));
                this.service.product.enterpriseListForSelect = response.resultContent
                this.service.product.enterpriseListForSelect.forEach(ele=>{
                    ele.selected=false;
                });
                // } else {

                // }
                }
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        }
    }

    //选择企业
    selectEnterprise(ent, index) {
        ent.selected=!ent.selected;
        console.log(ent);        
        this.service.product.productEnterpiseReqs = this.service.product.enterpriseListForSelect.filter((ele) => {
            if (ele.selected == true) {
                return ele;
            }
        });
        // console.log(ent,index)
        // this.service.product.productEnterpiseReqs.push(ent);
        // this.service.product.enterpriseListForSelect.splice(index, 1);
        // console.log(this.service.product.productEnterpiseReqs)
    }
    //
    unSelected(e, index) {
        // this.service.product.enterpriseListForSelect.push(ent);
        // this.service.product.productEnterpiseReqs.splice(index, 1);
        this.service.product.enterpriseListForSelect.map(ele=>{
           if(ele.id==e.id){
               ele.selected=false;
           } 
        })
        this.service.product.productEnterpiseReqs.splice(index,1);
    }


    next() {
        // if (this.service.product.productEnterpiseReqs.length == 0) {
        //     this.notice.open('操作错误', '企业列表为空');
        //     return;
        // }
        this.service.product.serviceId = this.service.productDir.serviceId;
        this.service.product.billingType =
            this.service.productDir.serviceType == '0' ? '0' : '1';
        console.log(this.service.product);
        this.layoutService.show();
        this.PostProduct.postProduct(this.service.product).then(response => {
            console.log('产品', response);
            this.layoutService.hide();
            // if (response && 100 == response.resultCode) {
            this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
            // } else {

            // }
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }
}
