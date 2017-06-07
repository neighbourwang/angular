import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';

import { Validation, ValidationRegs } from '../../../../architecture';

//model 
import { DatabaseMiddlewareProductModel, Platform, Enterprise } from '../model/database-middleware-product.model'
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem } from '../model/database-middleware-service.model'

// service;
import { DatabaseMiddlewareProdService } from '../service/database-middleware-prod.service';

@Component({
    templateUrl: '../template/database-middleware-prod-cre-step1.component.html',
    styleUrls: [],
    providers: []
})
export class DatabaseMiddlewareProdCreStep1Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: DatabaseMiddlewareProdService,
        private v: Validation,
    ) {
        this.v.result = {}
    }
    @ViewChild('notice')
    notice: NoticeComponent;

    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.prodDirId = params['id'];
            console.log(this.prodDirId);
        })
        if (this.prodDirId) {
            this.service.databaseMiddlewareService=new DatabaseMiddlewareServiceModel();
            this.service.databaseMiddlewareProduct=new DatabaseMiddlewareProductModel();
            this.service.databaseMiddlewareProduct.billingCycleValid=false;
            this.LayoutService.show();
            this.service.getDatabaseMiddlewareServiceDetail(this.prodDirId).then(res => {
                console.log(res);
                this.service.databaseMiddlewareService = res.resultContent;
                this.service.databaseMiddlewareProduct.serviceId = res.resultContent.serviceId;
                if(res.resultContent.platformType=='0'){
                    this.service.databaseMiddlewareProduct.platformSimpleItemResp=res.resultContent.platformSimpleItemResps;
                    this.service.databaseMiddlewareProduct.platformSimpleItemResp.forEach(platform=>platform.selected=true);
                }else if(res.resultContent.platformType=='1'){
                    this.service.databaseMiddlewareProduct.resourcPoolsProfiles=res.resultContent.resourcPoolsProfiles;
                    this.service.databaseMiddlewareProduct.resourcPoolsProfiles.forEach(pool=>pool.selected=true);
                }                
                if(res.resultContent.serviceObjectCode=='2'){
                    this.service.getEnterPriseList();
                }else{
                    let platformIdList=res.resultContent.platformSimpleItemResps.map(ele=>ele.id);
                    console.log(platformIdList);                    
                    this.service.getEnterpriseListById(platformIdList);
                }
                this.LayoutService.hide();
            }).catch(err => {
                this.LayoutService.hide();
                console.error(err);
            });;
            this.service.getEnterPriseList();
        }
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.service.databaseMiddlewareProduct.name,[this.v.isBase,this.v.minLength(2),this.v.maxLength(50),this.v.isUnBlank], "产品名称格式不正确"],

            description: [this.service.databaseMiddlewareProduct.desc, [this.v.maxLength(500)], "描述输入错误"],
        }
        return this.v.check(key, regs);
    }
    // 下一步
    ccf() { }

    next() {
        let message = this.checkForm();
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        this.route.navigate(["prod-mng/database-middleware-mng/database-middleware-product-cre-step2"]);
        console.log(this.service.databaseMiddlewareProduct);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
