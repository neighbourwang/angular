import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj ,FlatUnitObj} from '../model/physical-prod-service.model'
// service;
import { PhysicalServiceService } from '../service/physical-prod-service.service';
import { PhysicalProductService } from '../service/physical-prod-cre.service';


@Component({
    templateUrl: '../template/physical-prod-cre-step2.html',
    styleUrls: [],
    providers: []
})

export class PhysicalProdCreStep2Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService,
        private serviceService:PhysicalServiceService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    unitList:FlatUnitObj;
    ngOnInit() {
        
    }    
    //同步counterBar
    outputValue(e, num) {
        this.service.product[num] = e;
    }
    // 下一步
    ccf() { }
    previous(){
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step1"]);        
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
        this.service.product.billingType='0';
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step3"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
