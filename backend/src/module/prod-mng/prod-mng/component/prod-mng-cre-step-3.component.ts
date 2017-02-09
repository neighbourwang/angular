
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';


// service;
import { CreateProdStepService } from '../service/createProdStep.service';


@Component({
    templateUrl: '../template/prod-mng-cre-step-03.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdMngCreStep3Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:CreateProdStepService
    ) { }

    prodDirType: string;
    ngOnInit() {
        //获取平台类型
        console.log(this.service.productDir);
        this.prodDirType=this.service.productDir.serviceType;
    }
   

    next() {

      this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-4"]);
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-2"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

   
}
