import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;


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
    }

    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;

    next() {
        this.route.navigate(["prod-mng/prod-mng/prod-mng-cre-3"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
