import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';

import { Validation, ValidationRegs } from '../../../../architecture';

//model 
import { DatabaseMiddlewareProductModel, Platform, Enterpise } from '../model/database-middleware-product.model'
import { DatabaseMiddlewareServiceModel,PmPool,PlatformObj } from '../model/database-middleware-service.model'
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
            this.service.managerServeService=new DatabaseMiddlewareServiceModel();
            this.service.managerServeProduct=new DatabaseMiddlewareProductModel();
            this.LayoutService.show();
            this.service.managerServeProduct = new DatabaseMiddlewareProductModel();
            this.service.getManagerServeServiceDetail(this.prodDirId).then(res => {
                console.log(res);
                this.service.managerServeService = res.resultContent;
                this.service.managerServeProduct.serviceId = res.resultContent.serviceId;
                if(res.resultContent.serviceObjectCode=='2'||res.resultContent.serviceObjectCode=='8'){
                    this.service.getEnterPriseList();
                }else{
                    let platformIdList=res.resultContent.platformList.map(ele=>ele.id);
                    console.log(platformIdList);                    
                    this.service.getEnterpriseListById(platformIdList);
                }
                this.LayoutService.hide();
            }).catch(err => {
                this.LayoutService.hide();
                console.error(err);
            });;
            // this.service.getEnterPriseList();
        }
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.service.managerServeProduct.name, [this.v.isBase, this.v.isUnBlank], "产品名称格式不正确"],

            description: [this.service.managerServeProduct.description, [this.v.maxLength(68)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    // 下一步
    ccf() { }

    next() {
        let message = this.checkForm();
        if (message) return;
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step2"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
