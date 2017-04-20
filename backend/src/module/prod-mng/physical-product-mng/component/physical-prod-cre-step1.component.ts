import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 
import { PhysicalModel } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec } from '../model/physical-prod-service.model'

// service;
import { PhysicalServiceService } from '../service/physical-prod-service.service';
import { PhysicalProductService } from '../service/physical-prod-cre.service';

@Component({
    templateUrl: '../template/physical-prod-cre-step1.html',
    styleUrls: [],
    providers: []
})

export class PhysicalProdCreStep1Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService,
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    
    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
        this.service.product=new PhysicalModel();
        this.router.params.forEach((params: Params) => {
            this.prodDirId = params['id'];
            console.log(this.prodDirId);
        })
        if (this.prodDirId) {
            this.service.getPhysicalService(this.prodDirId);
            this.service.getEnterPriseList();
            this.service.getUnitList();  
        }
    }
    
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;

    next() {
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step2"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
