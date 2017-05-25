import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, CountBarComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { DataBaseMiddlewareProdEditService } from '../service/database-middleware-prod-edit.service';
import { DatabaseMiddlewareProdService } from '../service/database-middleware-prod.service';


//model
import { DatabaseMiddlewareProductModel, Platform, Enterprise } from '../model/database-middleware-product.model'
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem } from '../model/database-middleware-service.model'
import { HistoryPriceList } from '../model/historyPrice.model';


@Component({
    templateUrl: '../template/database-middleware-product-edit.component.html',
    styleUrls: ['.././style/enterTab.less'],
    providers: []
})

export class DatabaseMiddlewareEditComponent implements OnInit {
    constructor(
        private router: ActivatedRoute,
        // private getProductService: GetProductService,
        private layoutService: LayoutService,
        private location: Location,
        private service: DataBaseMiddlewareProdEditService,
        private prodService: DatabaseMiddlewareProdService,
        // private entListService: CreateProdStepService,
        private v:Validation
    ) { 
        this.v.result={}
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    product: DatabaseMiddlewareProductModel;
    productId: string;
    serviceName: string;
    // servicePlatformList: Array<Platform>
    historyPriceList: Array<HistoryPriceList> = new Array<HistoryPriceList>();
    updateEntObj: DatabaseMiddlewareProductModel = new DatabaseMiddlewareProductModel();
    Tabels = [
        { name: 'CASE_MNG.CASE_INFO', active: true },
        { name: 'PROD_MNG.PRICING_INFORMATION', active: false },
        { name: 'PROD_MNG.PLATFORM_INFO', active: false },
        { name: 'PROD_MNG.ENTERPRISE_INFO', active: false },
        { name: 'PROD_MNG.HISTORYCAL_PRICE', active: false }
    ]

    //切换TAB
    changeTab(item, index) {
        this.Tabels.forEach((ele) => {
            ele.active = false;
        })
        item.active = true;
    }

    ngOnInit() {
        this.product = new DatabaseMiddlewareProductModel();
        console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            this.productId = params['id'];
            this.serviceName = params['serviceName'];
        })
        this.getProductDetail(this.productId)
            .then(() => {
                let list = this.product.productPlatformReqs.map(ele => ele.platformId);
                this.getEntListForAdd(list);
            })
            .then(() => this.getHistoryPrice(this.productId))
            .catch(err => {
                console.error.bind(err);
            });
    }
    //请求产品详情
    getProductDetail(id) {
        this.layoutService.show();
        return this.service.getDatabaseMiddlewareProductDetail(id).then((response) => {
            if (response && 100 == response.resultCode) {
                if (response.resultContent) {
                    this.product = response.resultContent;
                    // this.product.id=this.productId;
                    this.tempProductName = this.product.name;
                    this.tempProductDesc = this.product.desc;
                    this.tempBasicCyclePrice = this.product.basicCyclePrice;
                    this.tempOneTimePrice = this.product.oneTimePrice;
                    this.tempUnitPrice = this.product.unitPrice;
                    //产品企业列表
                    this.updateEntObj.productEnterpiseReqs = JSON.parse(JSON.stringify(this.product.productEnterpiseReqs));
                    console.log('产品', this.product);
                    this.Tabels.forEach((ele) => {
                        ele.active = false;
                    })
                    this.Tabels[0].active = true;
                    // let list = this.product.productPlatformReqs.map(ele => ele.platformId);
                    // this.getEntListForAdd(list);
                }
                this.layoutService.hide();
            }
        }).catch((err) => {
            this.layoutService.hide();
            console.error(err)
        })
    }    
    // //获取产品历史价格信息
    getHistoryPrice(id) {
        this.layoutService.show();
        this.service.getHistoryPrice(id).then(res => {
            console.log('历史价格', res);
            this.historyPriceList = res.resultContent;
            this.layoutService.hide();
        }).catch(err => {
            this.layoutService.hide();
            console.error(err);
        })
    }
    // //获取所有可选企业列表
    entList: Array<Enterprise> = new Array<Enterprise>();;
    getEntListForAdd(list) {
        return this.service.getEnterpriseList(list).then(res => {
            console.log('ent', res);
            if (res.resultCode == 100 && res.resultContent) {
                this.entList = res.resultContent;
                console.log(this.updateEntObj.productEnterpiseReqs);
                for (let ent of this.entList) {
                    ent.selected = false;
                    ent.disabled = false;
                    for (let entProd of this.updateEntObj.productEnterpiseReqs) {
                        if (ent.id == entProd.id) {
                            ent.selected = true;
                            ent.disabled = true;
                            entProd.disabled = true;
                        }
                    }
                }
                console.log('editEnt', this.entList)
            }
        }).catch(err => {
            console.error(err);
        })
    }
    // //编辑基本信息
    editBasicInfo: boolean = false;
    tempProductName: string;
    tempProductDesc: string;

    // //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.tempProductName, [this.v.isBase, this.v.isUnBlank], "产品名称格式不正确"],
            description: [this.tempProductDesc, [this.v.maxLength(68)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    cancelBasicEdit(){
        this.tempProductName=this.product.name;
        this.tempProductDesc=this.product.desc;
        this.checkForm();
        this.editBasicInfo = false;        
    }
    saveBasic() {
        let message = this.checkForm();
        if (message) return;
        this.editBasicInfo = false;
        this.product.name = this.tempProductName;
        this.product.desc = this.tempProductDesc;
        console.log(this.product);
        this.layoutService.show();
        this.service.editProductbasic({
            "desc": this.product.desc,
            "name": this.product.name,
            "productId": this.product.productId,
            "serviceId": this.product.serviceId
        }).then(res => {
            console.log(res);
            this.layoutService.hide();
            this.location.back();                                
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
    // //编辑价格
    editPriceInfo: boolean = false;
    tempBasicCyclePrice: number;
    tempOneTimePrice: number;
    tempUnitPrice: number;
    cancelPriceEdit() {
        this.tempBasicCyclePrice = this.product.basicCyclePrice;
        this.tempOneTimePrice = this.product.oneTimePrice;
        this.tempUnitPrice = this.product.unitPrice;
        this.editPriceInfo = false;
    }
    savePrice() {
        this.product.basicCyclePrice = this.tempBasicCyclePrice;
        this.product.oneTimePrice = this.tempOneTimePrice;
        this.product.unitPrice = this.tempUnitPrice;
        this.editPriceInfo = false;
        console.log(this.product);
        this.layoutService.show();
        this.service.changProdPrice(this.product).then(res => {
            console.log(res);
            // this.getProductDetail(this.productId)
            this.layoutService.hide();
            this.location.back();                    
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
    outputValue(e, num) {
        this[num] = e;
    }
    // //返回列表
    cancel() {
        this.location.back();
    }

    // //编辑企业
    // //选择企业
    selectEnterprise(ent, index) {
        if (!ent.disabled) {
            ent.selected = !ent.selected;
            this.updateEntObj.productEnterpiseReqs = this.entList.filter((ele) => {
                if (ele.selected == true) {
                    return ele;
                }
            });
        this.isAddEntConfirm(); 
        console.log(this.updateEntObj.productEnterpiseReqs);
        console.log(this.isAddEnter);           
        }
    }
    //
    unSelected(e, index) {
        if (!e.disabled) {
            this.entList.map(ele => {
                if (ele.id == e.id) {
                    ele.selected = false;
                }
            })
            this.updateEntObj.productEnterpiseReqs.splice(index, 1);
        this.isAddEntConfirm(); 
        console.log(this.updateEntObj.productEnterpiseReqs);
        console.log(this.isAddEnter);           
        }
    }
    //确认添加企业
    isAddEnter: boolean = false;
    isAddEntConfirm() {
        let updateList = this.updateEntObj.productEnterpiseReqs.map(ent => ent.id).sort();
        let prodEntList = this.product.productEnterpiseReqs.map(ent => ent.id).sort();
        if(updateList.length==0){
            return this.isAddEnter = false;
        }else if (updateList.length > prodEntList.length) {
            return this.isAddEnter = true;
        } else {
             for (let i = 0; i < updateList.length; i++) {
               if(prodEntList.indexOf(updateList[i])==-1){
                   return this.isAddEnter = false;
               };               
            }
            return this.isAddEnter = false;
        }
    }
    ccAddEnt() {
        this.updateEntObj.productId = this.product.productId;
        this.updateEntObj.serviceId = this.product.serviceId;
        console.log(this.updateEntObj.productEnterpiseReqs);
        this.layoutService.show();
        this.service.editProductEnterPrise(this.updateEntObj).then(res => {
            console.log(res);
            this.layoutService.hide();
            this.location.back();
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
}