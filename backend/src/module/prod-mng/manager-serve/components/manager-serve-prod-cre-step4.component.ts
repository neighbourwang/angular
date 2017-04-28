import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 

// service;
import { ManagerServeProdService } from '../service/manager-serve-prod.service';


@Component({
    templateUrl: '../template/manager-serve-prod-cre-step4.html',
    styleUrls: ['../style/enterTab.less'],
    providers: []
})

export class ManagerServeProdCreStep4Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: ManagerServeProdService
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
        this.service.managerServeProduct.productEnterpiseReqs = this.service.enterpriseListForSelect.filter((ele) => {
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
        this.service.managerServeProduct.productEnterpiseReqs.splice(index, 1);
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous() {
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step3"]);
    }
    next() {
        console.log(this.service.managerServeProduct);                
        this.LayoutService.show();
        this.service.postManagerServeProduct(this.service.managerServeProduct).then(res=>{
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
