import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;
import { DatabaseMiddlewareProdService } from '../service/database-middleware-prod.service';



@Component({
    templateUrl: '../template/database-middleware-prod-cre-step4.component.html',
    styleUrls: ['../style/enterTab.less'],
    providers: []
})

export class DatabaseMiddlewareProdCreStep4Component implements OnInit {
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
        console.log(this.service.enterpriseListForSelect);
    }
    //选择企业
    selectEnterprise(ent, index) {
        ent.selected = !ent.selected;
        console.log(ent);
        this.service.databaseMiddlewareProduct.productEnterpiseReqs = this.service.enterpriseListForSelect.filter((ele) => {
            if (ele.selected == true) {
                return ele;
            }
        });
    }
    //
    unSelected(e, index) {
        this.service.enterpriseListForSelect.map(ele => {
            if (ele.id == e.id) {
                ele.selected = false;
            }
        })
        this.service.databaseMiddlewareProduct.productEnterpiseReqs.splice(index, 1);
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous() {
        this.route.navigate(["prod-mng/database-middleware-mng/database-middleware-product-cre-step3"]);
    }
    next() {
        console.log(this.service.databaseMiddlewareProduct);                
        this.LayoutService.show();
        this.service.postDatabaseMiddlewareProduct(this.service.databaseMiddlewareProduct).then(res=>{
            this.LayoutService.hide();
            this.route.navigate(["prod-mng/prod-mng/prod-mng"]);            
        }).catch(err=>{
            this.LayoutService.hide();            
            console.error(err);
        })
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
