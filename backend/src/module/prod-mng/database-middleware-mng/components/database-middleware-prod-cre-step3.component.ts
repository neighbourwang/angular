import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;
import { DatabaseMiddlewareProdService } from '../service/database-middleware-prod.service';


@Component({
    templateUrl: '../template/database-middleware-prod-cre-step3.component.html',
    
    providers: []
})

export class DatabaseMiddlewareProdCreStep3Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: DatabaseMiddlewareProdService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
            console.log(this.service.managerServeProduct)
    }

    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous() {
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step2"]);
    }
    next() {
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step4"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
