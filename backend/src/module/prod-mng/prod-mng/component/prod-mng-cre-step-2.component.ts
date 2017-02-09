
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

    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:CreateProdStepService
    ) { }

    prodDirType: string;
    ngOnInit() {
        console.log(this.service.productDir);
        this.prodDirType=this.service.productDir.serviceType;
    }

    outputValue(e, num) {
        console.log(e);
        console.log(num);
        this.service.product[num] = e;
    }


    next() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-1"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }
}
