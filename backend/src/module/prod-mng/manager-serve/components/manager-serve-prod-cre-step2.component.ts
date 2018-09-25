import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent,CountBarComponent } from '../../../../architecture';

//model 
// service;
import { ManagerServeProdService } from '../service/manager-serve-prod.service';

@Component({
    templateUrl: '../template/manager-serve-prod-cre-step2.html',
    styleUrls: [],
    providers: []
})

export class ManagerServeProdCreStep2Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:ManagerServeProdService,
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('basicCyclePrice')
    basicCyclePrice:CountBarComponent;

    ngOnInit() {
        console.log(this.service.managerServeProduct);
        // if(this.service.managerServeProduct.billingType=='3'){
        //     this.basicCyclePrice.unEdit();
        //     // this.billByTimes();
        // }
    }
    //按次计费
    billByTimes(){
        this.service.managerServeProduct.billingCycle=null;
        this.basicCyclePrice.unEdit();
    }
    //包年包月计费
    billByYear(){
        this.basicCyclePrice.editable();        
    }    
    //同步counterBar
    outputValue(e, num) {
        this.service.managerServeProduct[num] = e;
    }
    // 下一步
    ccf() { }
    previous(){
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step1"]);        
    }
    next() {
        if(!this.service.managerServeProduct.billingType){
            this.notice.open('COMMON.OPERATION_ERROR','PROD_MNG.PLEASE_SELECT_VALUATION_TYPE');
            return;
        }
        if(this.service.managerServeProduct.billingType=='0'&&!this.service.managerServeProduct.billingCycle){
            this.notice.open('COMMON.OPERATION_ERROR','PROD_MNG.PLEASE_SELECT_VALUATION_CYCLE');
            return;
        }
        this.service.managerServeProduct.basicCyclePrice=
            this.service.managerServeProduct.basicCyclePrice?this.service.managerServeProduct.basicCyclePrice:0;        
        this.service.managerServeProduct.oneTimePrice=
            this.service.managerServeProduct.oneTimePrice?this.service.managerServeProduct.oneTimePrice:0;       
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step3"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
