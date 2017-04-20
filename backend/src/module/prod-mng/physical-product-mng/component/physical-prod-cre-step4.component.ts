import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;
import { PhysicalProductService } from '../service/physical-prod-cre.service';


@Component({
    templateUrl: '../template/physical-prod-cre-step4.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class PhysicalProdCreStep4Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('regionSelect')
    regionSelect: PopupComponent;

    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            
        })
        if (this.prodDirId) {
           
        }
        this.service.getEnterPriseList().then(res=>{
            console.log(res);
        }).catch(err=>{
            console.error(err);
        })
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
    }
    //
    unSelected(e, index) {
        this.service.product.enterpriseListForSelect.map(ele=>{
           if(ele.id==e.id){
               ele.selected=false;
           } 
        })
        this.service.product.productEnterpiseReqs.splice(index,1);
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous(){
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step3"]);        
    }
    next() {
        console.log(this.service.product);
        // this.route.navigate(["prod-mng/prod-mng/prod-mng"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
