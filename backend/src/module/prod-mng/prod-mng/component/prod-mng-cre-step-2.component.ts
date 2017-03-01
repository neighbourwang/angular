
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

// service;
import { CreateProdStepService } from '../service/createProdStep.service';

@Component({
    templateUrl: '../template/prod-mng-cre-step-02.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdMngCreStep2Component implements OnInit {

    @ViewChild('notice')
    notice:NoticeComponent;
    
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:CreateProdStepService
    ) { }

    prodDirType: string;
    ngOnInit() {
        console.log(this.service.product);
        this.prodDirType=this.service.productDir.serviceType;
    }

    outputValue(e, num) {
        this.service.product[num] = e;
    }

    next() {
        if(!this.service.product.billingCycleClick){
            this.notice.open('COMMON.OPERATION_ERROR','PROD_MNG.PLEASE_SELECT_VALUATION_CYCLE');
            return;
        }
        this.service.product.basicCyclePrice=
            this.service.product.basicCyclePrice?this.service.product.basicCyclePrice:0;
        this.service.product.extendCyclePrice=
            this.service.product.extendCyclePrice?this.service.product.extendCyclePrice:0;
        this.service.product.oneTimePrice=
            this.service.product.oneTimePrice?this.service.product.oneTimePrice:0;
        this.service.product.unitPrice=
            this.service.product.unitPrice?this.service.product.unitPrice:0;
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-1"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }
}
