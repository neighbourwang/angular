import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

import { Validation, ValidationRegs } from '../../../../architecture';

//model 
import { PhysicalProductModel } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec } from '../model/physical-prod-service.model'

// service;
import { PhysicalServiceService } from '../service/physical-prod-service.service';
import { PhysicalProductService } from '../service/physical-prod-cre.service';

@Component({
    templateUrl: '../template/physical-prod-cre-step1.html',
    styleUrls: [],
    providers: []
})

export class PhysicalProdCreStep1Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService,
        private v:Validation
    ) { 
        this.v.result={}
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
            this.service.product=new PhysicalProductModel();            
            this.service.getPhysicalService(this.prodDirId);
            this.service.getEnterPriseList();
            this.service.getUnitList();  
        }
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.service.product.name, [this.v.isBase, this.v.isUnBlank], "产品名称格式不正确"],

            description: [this.service.product.desc, [this.v.maxLength(68)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;

    next() {
        let message = this.checkForm();
        if (message) return;
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step2"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
