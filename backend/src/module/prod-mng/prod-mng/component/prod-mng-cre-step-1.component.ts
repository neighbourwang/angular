import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;
import { CreateProdStepService } from '../service/createProdStep.service';


@Component({
    templateUrl: '../template/prod-mng-cre-step-01.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdMngCreStep1Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: CreateProdStepService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('regionSelect')
    regionSelect: PopupComponent;

    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.prodDirType =
                params['type'] == 'VITRUALMACHINE_SERVICE' ? '0' :
                    params['type'] == 'VITRUALDISK_SERVICE' ? '1' : this.service.productDir.serviceType;
            this.prodDirId = params['id'];
            console.log(this.prodDirId)
            console.log(this.prodDirType);
        })
        if (this.prodDirId) {
            if (this.prodDirType == '0') {
                this.service.getVmProdDirDetail(this.prodDirId);
            } else if (this.prodDirType == '1') {
                // this.getVmProdDirDetail(this.prodDirId);
                this.service.getDiskProdDirDetail(this.prodDirId);
            }
        }
    }

    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;

    next() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-2"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
