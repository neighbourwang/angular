import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, CountBarComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { PhysicalProductEditService } from '../service/physical-prod-edit.service';
import { PhysicalProductService } from '../service/physical-prod-cre.service';


//model
import { PhysicalProductModel, ProductEnterpriseReqs } from '../model/physical-product.model';
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec } from '../model/physical-prod-service.model';
import { HistoryPriceList } from '../model/historyPrice.model';


@Component({
    templateUrl: '../template/physical-prod-edit.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class PhysicalProdEditComponent implements OnInit {
    constructor(
        private router: ActivatedRoute,
        private productService: PhysicalProductService,
        private layoutService: LayoutService,
        private location: Location,
        private service: PhysicalProductEditService,
        private v: Validation
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    product: PhysicalProductModel;
    productId: string;
    productType: string;
    historyPriceList: Array<HistoryPriceList> = new Array<HistoryPriceList>();
    updateEntObj: PhysicalProductModel = new PhysicalProductModel();
    Tabels = [
        { name: 'CASE_MNG.CASE_INFO', active: true },
        { name: 'PROD_MNG.PRICING_INFORMATION', active: false },
        { name: 'PROD_MNG.RESOURCEPOOL_INFO', active: false },
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
        this.product = new PhysicalProductModel();
        this.productService.physicalService = new PhysicalService();
        console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            this.productId = params['id'];
            this.productType = params['type'];
        })
        this.getProductDetail(this.productId)
            .then(() => {
                //获取产品目录详情
                return this.productService.getPhysicalService(this.product.serviceId);
            })
            .then(() => {
                //比对产品目录已选择资源池
                this.allSelected =
                    this.product.phyMachineAreaPoolsProfile.length == this.productService.physicalService.phyMachineAreaPoolsProfile.length ? true : false;
                this.product.phyMachineAreaPoolsProfile.forEach(pool => {
                    this.productService.physicalService.phyMachineAreaPoolsProfile.forEach(Pool => {
                        if (pool.pmPoolId == Pool.pmPoolId) {
                            Pool.selected = true;
                            Pool.disabled = true;
                        }
                    })
                })
                console.log(this.productService.physicalService.phyMachineAreaPoolsProfile);
            })
            .catch(err => console.error(err));
        //产品历史价格
        this.getHistoryPrice(this.productId);
        this.productService.getUnitList();
        this.productService.getEnterPriseList().then(() => {
            for (let ent of this.productService.enterpriseListForSelect) {
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
        });
    }
    //请求产品详情
    getProductDetail(id) {
        this.layoutService.show();
        return this.service.getPhysicalProd(id).then((response) => {
            if (response && 100 == response.resultCode) {
                if (response.resultContent) {
                    console.log('产品', response);
                    this.product = response.resultContent;
                    // this.product.id=this.productId;
                    this.tempProductName = this.product.name;
                    this.tempProductDesc = this.product.desc;
                    this.tempBasicCyclePrice = this.product.basicCyclePrice;
                    this.tempExtendCyclePrice = this.product.extendCyclePrice;
                    this.tempOneTimePrice = this.product.oneTimePrice;
                    // this.tempUnitPrice = this.product.unitPrice;
                    //产品企业列表
                    this.updateEntObj.productEnterpiseReqs = JSON.parse(JSON.stringify(this.product.productEnterpiseReqs));
                    // console.log('产品', this.product);
                    this.Tabels.forEach((ele) => {
                        ele.active = false;
                    })

                    this.Tabels[0].active = true;
                }
                this.layoutService.hide();
            }
        }).catch((err) => {
            this.layoutService.hide();
            console.error(err)
        })
    }
    // 获取产品历史价格信息
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
    //编辑基本信息
    editBasicInfo: boolean = false;
    tempProductName: string;
    tempProductDesc: string;

    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            productName: [this.tempProductName, [this.v.isBase, this.v.isUnBlank], "产品名称格式不正确"],
            description: [this.tempProductDesc, [this.v.maxLength(68)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    cancelBasicEdit() {
        this.tempProductName = this.product.name;
        this.tempProductDesc = this.product.desc;
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
    // cancelPriceEdit() {
    //     this.tempBasicCyclePrice = this.product.basicCyclePrice;
    //     this.tempExtendCyclePrice = this.product.extendCyclePrice;
    //     this.tempOneTimePrice = this.product.oneTimePrice;
    //     this.tempUnitPrice = this.product.unitPrice;
    //     this.editPriceInfo = false;
    // }
    // savePrice() {
    //     this.product.basicCyclePrice = this.tempBasicCyclePrice;
    //     this.product.extendCyclePrice = this.tempExtendCyclePrice;
    //     this.product.oneTimePrice = this.tempOneTimePrice;
    //     this.product.unitPrice = this.tempUnitPrice;
    //     this.editPriceInfo = false;
    //     console.log(this.product);
    //     this.layoutService.show();
    //     this.service.changProdPrice(this.product).then(res => {
    //         console.log(res);
    //         // this.getProductDetail(this.productId)
    //         this.getHistoryPrice(this.productId)
    //         this.layoutService.hide();
    //     }).catch(err => {
    //         console.log(err);
    //         this.layoutService.hide();
    //     })
    // }
    outputValue(e, num) {
        this.product[num] = e;
    }
    //返回列表
    cancel() {
        this.location.back();
    }
    //添加资源池
    选择全部资源池
    allSelected: boolean = false;
    selectAllResourcePool() {
        this.allSelected = !this.allSelected;
        this.productService.physicalService.phyMachineAreaPoolsProfile.forEach(ele => ele.selected = this.allSelected);
    }
    //选择资源池
    selectResourcePool(idx) {
        console.log(idx);
        console.log(this.productService.physicalService.phyMachineAreaPoolsProfile[idx]);
        this.productService.physicalService.phyMachineAreaPoolsProfile[idx].selected = !this.productService.physicalService.phyMachineAreaPoolsProfile[idx].selected;
        for (let resourcePool of this.productService.physicalService.phyMachineAreaPoolsProfile) {
            if (resourcePool.selected == false) {
                this.allSelected = false;
                return;
            }
        }
        this.allSelected = true;
    }
    isAddPool:boolean;
    //是否资源池添加
    isCanAddPool(){
        if(this.allSelected){
            this.isAddPool=false;
            return ;
        }
    }
    //拼接资源池对象数组
    combineObj() {
        this.product.phyMachineAreaPoolsProfile = [];
        let list = this.productService.physicalService.phyMachineAreaPoolsProfile.filter(ele => {
            if (ele.selected == true)
                return ele;
        }).map(ele => ele.regionId);
        let noRepeateList = [];
        for (let l of list) {
            if (noRepeateList.indexOf(l) === -1) {
                noRepeateList.push(l);
            }
        }
        let poolList: Array<ResourcePoolObj>;
        for (let i of noRepeateList) {
            let obj: ResourcePoolObj = new ResourcePoolObj();
            obj.regionId = i;
            for (let resource of this.productService.physicalService.phyMachineAreaPoolsProfile) {
                if (resource.selected && resource.regionId == i) {
                    obj.region = resource.region;
                    obj.areaDisplayName = resource.areaDisplayName;
                    obj.phyMachineResourcPoolsProfile.push({
                        "pmPoolId": resource.pmPoolId,
                        "poolName": resource.poolName,
                        "resourcePoolDisplayName": resource.resourcePoolDisplayName,
                        "skuid": resource.skuid,
                        selected: true
                    })
                }
            }
            this.product.phyMachineAreaPoolsProfile.push(obj);
        }
        console.log(this.product);
    }
    //编辑企业
    //选择企业
    selectEnterprise(ent, index) {
        if (!ent.disable) {
            ent.selected = !ent.selected;
            this.updateEntObj.productEnterpiseReqs = this.productService.enterpriseListForSelect.filter((ele) => {
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
            this.productService.enterpriseListForSelect.forEach(ele => {
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
        if (updateList.length != prodEntList.length) {
            return this.isAddEnter = true;
        } else {
            for (let i = 0; i < updateList.length; i++) {
                for (let j = 0; j < prodEntList.length; j++) {
                    if (updateList[i] != prodEntList[j]) {
                        return this.isAddEnter = true;
                    }
                }
                if (i == updateList.length) {
                    return this.isAddEnter = false;
                }
            }
        }

    }
    ccAddEnt() {
        this.updateEntObj.productId = this.product.productId;
        this.updateEntObj.serviceId = this.product.serviceId;
        console.log(this.updateEntObj.productEnterpiseReqs);
        this.layoutService.show();
        this.service.editProductEnterPrise(this.updateEntObj).then(res => {
            console.log(res);
            this.getProductDetail(this.productId)
            this.layoutService.hide();
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
}