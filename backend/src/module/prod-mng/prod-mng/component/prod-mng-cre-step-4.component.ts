
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

// service;
import { CreateProdStepService } from '../service/createProdStep.service';

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
        private service:CreateProdStepService
    ) { }

    @ViewChild('notice')
    notice:NoticeComponent;


    platformType: string;
    ngOnInit() {
       console.log(this.service.productDir);
    
    }
    next() {
       
    }

    previous() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

    outputValue(e, index) {
    }
}
