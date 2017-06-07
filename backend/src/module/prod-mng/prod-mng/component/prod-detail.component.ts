import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, CountBarComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { GetProductService } from '../service/getProduct.service';
import { ProductEditService } from '../service/product.edit.service';
import { CreateProdStepService } from '../service/createProdStep.service';

//model
import { Product, Enterprise } from '../model/product.model';
import { ProductDir, Platform } from '../model/prodDir.model';
import { HistoryPriceList } from '../model/historyPrice.model';


@Component({
    selector: 'prod-detail',
    templateUrl: '../template/prod-detail.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdDetailComponent implements OnInit {
    constructor(
        private router: ActivatedRoute,
        private getProductService: GetProductService,
        private layoutService: LayoutService,
        private location: Location,
        private service: ProductEditService,
        private entListService: CreateProdStepService,
        private v:Validation
    ) { 
        this.v.result={}
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    product: Product;
    prodDir: ProductDir;
    productId: string;
    productType: string;
    servicePlatformList: Array<Platform>
    historyPriceList: Array<HistoryPriceList> = new Array<HistoryPriceList>();
    updateEntObj: Product = new Product();
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
        item.name=='CASE_MNG.CASE_INFO'&&this.cancelPriceEdit();
        item.name=='PROD_MNG.PRICING_INFORMATION'&&this.cancelBasicEdit();
    }

    ngOnInit() {
        this.product = new Product();
        this.prodDir = new ProductDir();
        console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            this.productId = params['id'];
            this.productType = params['type'];
        })
        this.getProductDetail(this.productId)
            .then(() => {
                if (this.productType == '0') {
                    this.getVmProdDirDetail(this.product.serviceId);
                } else if(this.productType == '1') {
                    console.log('cc')
                    this.getDiskProdDirDetail(this.product.serviceId);
                }
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
        return this.getProductService.getProduct(id).then((response) => {
            if (response && 100 == response.resultCode) {
                if (response.resultContent) {
                    this.product = response.resultContent;
                    // this.product.id=this.productId;
                    this.tempProductName = this.product.name;
                    this.tempProductDesc = this.product.desc;
                    this.tempBasicCyclePrice = this.product.basicCyclePrice;
                    this.tempExtendCyclePrice = this.product.extendCyclePrice;
                    this.tempOneTimePrice = this.product.oneTimePrice;
                    this.tempUnitPrice = this.product.unitPrice;
                    //产品企业列表
                    this.updateEntObj.productEnterpiseReqs = JSON.parse(JSON.stringify(this.product.productEnterpiseReqs));
                    console.log('产品', this.product);
                    this.Tabels.forEach((ele) => {
                        ele.active = false;
                    })
                    this.Tabels[0].active = true;
                    let list = this.product.productPlatformReqs.map(ele => ele.platformId);
                    this.getEntListForAdd(list);
                }
                this.layoutService.hide();
            }
        }).catch((err) => {
            this.layoutService.hide();
            console.error(err)
        })
    }
    //获取vm产品目录详情
    getVmProdDirDetail(id) {
        return this.getProductService.getVmServiceDetail(id).then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                if (response.resultContent) {
                    this.prodDir = response.resultContent;
                    this.servicePlatformList = this.prodDir.platformInfo;
                    console.log(this.prodDir);
                }
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    //获取disk产品目录详情
    getDiskProdDirDetail(id) {
        return this.getProductService.getDiskServiceDetail(id).then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
                this.servicePlatformList = JSON.parse(JSON.stringify(this.prodDir.platformList));
                console.log(this.prodDir);
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    //获取产品历史价格信息
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
    //获取所有可选企业列表
    entList: Array<Enterprise> = new Array<Enterprise>();;
    getEntListForAdd(list) {
        return this.entListService.getEnterpriseList(list).then(res => {
            console.log('ent', res);
            if (res.resultCode == 100 && res.resultContent) {
                this.entList = res.resultContent;
                console.log(this.updateEntObj.productEnterpiseReqs);
                for (let ent of this.entList) {
                    ent.selected = false;
                    ent.disable = false;
                    for (let entProd of this.updateEntObj.productEnterpiseReqs) {
                        if (ent.id == entProd.id) {
                            ent.selected = true;
                            ent.disable = true;
                            entProd.disable = true;
                        }
                    }
                }
                console.log('editEnt', this.entList)
            }
        }).catch(err => {
            console.error(err);
        })
    }
    //编辑基本信息
    editBasicInfo: boolean = false;
    tempProductName: string;
    tempProductDesc: string;

    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.tempProductName, [this.v.isBase, this.v.isUnBlank,this.v.maxLength(50),this.v.minLength(2)], "产品名称格式不正确"],
            description: [this.tempProductDesc, [this.v.maxLength(300)], "描述输入错误"],
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
            this.location.back()            
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
    //编辑价格
    editPriceInfo: boolean = false;
    tempBasicCyclePrice: number;
    tempExtendCyclePrice: number;
    tempOneTimePrice: number;
    tempUnitPrice: number;
    cancelPriceEdit() {
        this.tempBasicCyclePrice = this.product.basicCyclePrice;
        this.tempExtendCyclePrice = this.product.extendCyclePrice;
        this.tempOneTimePrice = this.product.oneTimePrice;
        this.tempUnitPrice = this.product.unitPrice;
        this.editPriceInfo = false;
    }
    savePrice() {
        this.product.basicCyclePrice = this.tempBasicCyclePrice;
        this.product.extendCyclePrice = this.tempExtendCyclePrice;
        this.product.oneTimePrice = this.tempOneTimePrice;
        this.product.unitPrice = this.tempUnitPrice;
        this.editPriceInfo = false;
        console.log(this.product);
        this.layoutService.show();
        this.service.changProdPrice(this.product).then(res => {
            console.log(res);
            // this.getProductDetail(this.productId)
            this.location.back()
            this.layoutService.hide();
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
    //编辑平台
    outputValue(e, num) {
        this[num] = e;
    }
    //返回列表
    cancel() {
        this.location.back();
    }

    //编辑平台
    updateProdPlatform: Product = new Product();
    isAddPlat: boolean = false;
    editPlatform(list) {
        console.log(list)
        if (list) {
            this.isAddPlat = true;
            this.updateProdPlatform.productId = this.product.productId;
            this.updateProdPlatform.serviceId = this.product.serviceId;
            this.updateProdPlatform.productPlatformReqs = list;
        }
    }
    //确认添加平台
    ccEditPlatform() {
        let list = [];
        console.log('result', this.updateProdPlatform);
        if (this.updateProdPlatform.productPlatformReqs.length == 0) {
            this.notice.open('操作错误', '平台列表不能为空');
            return;
        }
        this.updateProdPlatform.productPlatformReqs.forEach((ele) => {
            list.push(ele.platformId);
        });
        this.entListService.getEnterpriseList(list).then(res => {
            console.log('企业new', res);
            if(this.product.productEnterpiseReqs.length==0){
               this.service.editProductPlatform(this.updateProdPlatform).then(res => {
                        console.log(res);
                        this.getProductDetail(this.productId)
                        this.layoutService.hide();
                    }).catch(err => {
                        console.log(err);
                        this.layoutService.hide();
                    }) 
            }else if (!res.resultContent || res.resultContent.length == 0) {
                this.notice.open('添加平台错误', "所选平台不是当前产品发布企业 '" + this.product.productEnterpiseReqs[0].name + "' 的可操作平台，请进入企业管理为 '" + this.product.productEnterpiseReqs[0].name + "' 企业添加相应平台后重新操作'");
            } else {
                let newEntList = res.resultContent;
                let beyondEnt: Array<Enterprise>;
                //获取产品已发布企业中不在添加平台新企业列表的企业                             
                beyondEnt = this.product.productEnterpiseReqs.filter((ele) => {
                    if (newEntList.map(ent => ent.id).indexOf(ele.id) < 0) { return ele };
                })
                console.log('newnew', beyondEnt);
                if (beyondEnt.length == 0) {
                    console.log(list);
                    this.layoutService.show();
                    this.service.editProductPlatform(this.updateProdPlatform).then(res => {
                        console.log(res);
                        this.location.back()
                        this.getProductDetail(this.productId)
                        this.layoutService.hide();
                    }).catch(err => {
                        console.log(err);
                        this.layoutService.hide();
                    })
                } else {
                    this.notice.open('添加平台错误', "所选平台不是当前产品发布企业 '" + beyondEnt[0].name + "' 的可操作平台，请进入企业管理为 '" + beyondEnt[0].name + "' 企业添加相应平台后重新操作'");
                }
            }
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    取消添加
    cancelAddPlat() {
        // this.servicePlatformList = JSON.parse(JSON.stringify(this.prodDir.platformList));        
        // this.servicePlatformList = Object.assign({},this.prodDir.platformList);        
        // this.isAddPlat=false;
        this.location.back();

    }
    //编辑企业
    //选择企业
    selectEnterprise(ent, index) {
        if (!ent.disable) {
            ent.selected = !ent.selected;
            this.updateEntObj.productEnterpiseReqs = this.entList.filter((ele) => {
                if (ele.selected == true) {
                    return ele;
                }
            });
        this.isAddEntConfirm();            
        }
    }
    //
    unSelected(e, index) {
        if (!e.disable) {
            this.entList.map(ele => {
                if (ele.id == e.id) {
                    ele.selected = false;
                }
            })
            this.updateEntObj.productEnterpiseReqs.splice(index, 1);
        this.isAddEntConfirm();            
        }
    }
    //确认添加企业
    isAddEnter: boolean = false;
    isAddEntConfirm() {
        let updateList = this.updateEntObj.productEnterpiseReqs.map(ent => ent.id).sort();
        let prodEntList = this.product.productEnterpiseReqs.map(ent => ent.id).sort();
        if(updateList.length==0){
            return this.isAddEnter = false;
        }else if (updateList.length != prodEntList.length) {
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
            this.location.back()
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
}