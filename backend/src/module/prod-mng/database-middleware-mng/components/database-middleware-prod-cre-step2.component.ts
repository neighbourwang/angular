import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent,CountBarComponent } from '../../../../architecture';

//model 
// service;
import { DatabaseMiddlewareProdService } from '../service/database-middleware-prod.service';

@Component({
    templateUrl: '../template/database-middleware-prod-cre-step2.component.html',
    styleUrls: [],
    providers: []
})

export class DatabaseMiddlewareProdCreStep2Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:DatabaseMiddlewareProdService,
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('basicCyclePrice')
    basicCyclePrice:CountBarComponent;

    ngOnInit() {
        console.log(this.service.databaseMiddlewareProduct);
        // if(this.service.databaseMiddlewareProduct.billingType=='3'){
        //     this.basicCyclePrice.unEdit();
        //     // this.billByTimes();
        // }
    }    
    //同步counterBar
    outputValue(e, num) {
        this.service.databaseMiddlewareProduct[num] = e;
    }
    // 下一步
    ccf() { }
    previous(){
        this.route.navigate(["prod-mng/database-middleware-mng/database-middleware-product-cre-step1"]);        
    }
    next() {        
        if(this.service.databaseMiddlewareProduct.billingCycle=='null'){
            this.notice.open('COMMON.OPERATION_ERROR','PROD_MNG.PLEASE_SELECT_VALUATION_CYCLE');
            return;
        }
        this.service.databaseMiddlewareProduct.basicCyclePrice=
            this.service.databaseMiddlewareProduct.basicCyclePrice?this.service.databaseMiddlewareProduct.basicCyclePrice:0;        
        this.service.databaseMiddlewareProduct.oneTimePrice=
            this.service.databaseMiddlewareProduct.oneTimePrice?this.service.databaseMiddlewareProduct.oneTimePrice:0;       
        this.route.navigate(["prod-mng/database-middleware-mng/database-middleware-product-cre-step3"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
