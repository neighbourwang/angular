
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
        private LayoutService: LayoutService,
        private service:CreateProdStepService,
        private ProdDirListService:ProdDirListService,
        private PostProduct: PostProduct
    ) { }

    @ViewChild('notice')
    notice:NoticeComponent;


    enterpriseList = new Array();
    ngOnInit() {
       console.log(this.service.product);
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
    }

    //选择企业
    selectEnterprise(ent, index) {
        // ent.selected = !ent.selected;
        // this.product.productEnterpiseReqs = this.enterpriseList.filter((ele) => {
        //     if (ele.selected == true) {
        //         return ele;
        //     }
        // });
        this.service.product.productEnterpiseReqs.push(ent);
        this.enterpriseList.splice(index,1);
        console.log(this.service.product.productEnterpiseReqs)
    }
    //
    unSelected(ent,index){
        this.enterpriseList.push(ent);
        this.service.product.productEnterpiseReqs.splice(index,1);
    }


    next() {
        this.service.product.serviceId=this.service.productDir.serviceId;
        console.log(this.service.product);
        this.PostProduct.postProduct(this.service.product).then(response => {
            console.log('产品', response);
            this.LayoutService.hide();
            // if (response && 100 == response.resultCode) {
            this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
            // } else {

            // }
        }).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }
}
