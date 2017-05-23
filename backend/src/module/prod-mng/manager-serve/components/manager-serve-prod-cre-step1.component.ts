import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';

import { Validation, ValidationRegs } from '../../../../architecture';

//model 
import { ManagerServeProductModel, Platform, Enterprise } from '../model/manager-serve-product.model'
import { ManagerServeServiceModel,PmPool,PlatformObj } from '../model/manager-serve-service.model'
// service;
import { ManagerServeProdService } from '../service/manager-serve-prod.service';


@Component({
    templateUrl: '../template/manager-serve-prod-cre-step1.html',
    styleUrls: [],
    providers: []
})

export class ManagerServeProdCreStep1Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service: ManagerServeProdService,
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
            this.service.managerServeService=new ManagerServeServiceModel();
            this.service.managerServeProduct=new ManagerServeProductModel();
            this.LayoutService.show();
            this.service.managerServeProduct = new ManagerServeProductModel();
            this.service.getManagerServeServiceDetail(this.prodDirId).then(res => {
                console.log(res);
                this.service.managerServeService = res.resultContent;
                this.service.managerServeProduct.serviceId = res.resultContent.serviceId;
                if(res.resultContent.serviceObjectCode=='2'||res.resultContent.serviceObjectCode=='6'||res.resultContent.serviceObjectCode=='7'||res.resultContent.serviceObjectCode=='8'){
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
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        this.route.navigate(["prod-mng/manager-serve/manager-serve-product-cre-step2"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
