import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, CountBarComponent } from '../../../../architecture';

//service
import { GetProductService } from '../service/getProduct.service';
import { ProductEditService } from '../service/product.edit.service';
import { CreateProdStepService } from '../service/createProdStep.service';

//model
import { Product } from '../model/product.model';
import { ProductDir ,Platform} from '../model/prodDir.model';
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
        private entListService:CreateProdStepService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    product: Product;
    prodDir: ProductDir;
    vmProdDir: boolean;
    productId: string;
    productType:string;
    servicePlatformList:Array<Platform>
    historyPriceList: Array<HistoryPriceList> = new Array<HistoryPriceList>();
    Tabels = [
        { name: 'CASE_MNG.CASE_INFO', active: true },
        { name: 'PROD_MNG.PRICING_INFORMATION', active: false },
        { name: '平台企业信息', active: false },
        { name: '平台企业信息', active: false },
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
        this.product = new Product();
        this.prodDir = new ProductDir();
        console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            this.productId = params['id'];
            this.productType = params['type'];
            console.log(this.productId);
            (this.productType == '0') && (this.vmProdDir = true);
            (this.productType == '1') && (this.vmProdDir = false);
        })
        this.getProductDetail(this.productId)
            .then(() => {
                if (this.vmProdDir) {
                    this.getVmProdDirDetail(this.product.serviceId);
                } else {
                    console.log('cc')
                    this.getDiskProdDirDetail(this.product.serviceId);
                }
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
                    console.log('产品', this.product);
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
                    this.servicePlatformList=this.prodDir.platformInfo;
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
                this.servicePlatformList=this.prodDir.platformList;
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
    //编辑基本信息
    editBasicInfo: boolean = false;
    tempProductName: string;
    tempProductDesc: string;
    saveBasic() {
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
            this.getHistoryPrice(this.productId)
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
    updateProdPlatform:Product=new Product();
    editPlatform(list){
        console.log(list)
        if(list){
            this.updateProdPlatform.productId=this.product.productId;
            this.updateProdPlatform.serviceId=this.product.serviceId;
            this.updateProdPlatform.productPlatformReqs=list; 
        }
             
    }

    ccEditPlatform(){
        let list=[];
        console.log('result',this.updateProdPlatform);
        if(this.updateProdPlatform.productPlatformReqs.length==0){
            this.notice.open('操作错误','平台列表不能为空');
            return;
        }
        this.updateProdPlatform.productPlatformReqs.forEach((ele)=>{
            list.push(ele.platformId);
        });
        this.entListService.getEnterpriseList(list).then(res => {
            console.log('企业',res);
            if(!res.resultContent||res.resultContent.length==0){
                this.notice.open('添加平台错误',"所选平台不是当前产品发布企业 '"+this.product.productEnterpiseReqs[0].name+"' 的可操作平台，请进入企业管理为 '"+this.product.productEnterpiseReqs[0].name+"' 企业添加相应平台后重新操作'");
            }else{
                let newEntList=res.resultContent;
                let beyondEnt:any;
                beyondEnt=this.product.productEnterpiseReqs.filter((ele)=>{
                    newEntList.map(ent=>ent.id).indexOf(ele.id)>-1;
                })
                console.log('newnew',beyondEnt);
                // for(let ent of this.product.productEnterpiseReqs){
                //     for(let getEnt of res.resultContent){

                //     }
                // }
            }
            // this.getProductDetail(this.productId)
            this.layoutService.hide();
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
        console.log(list);
        // this.layoutService.show();
        // this.service.editProductPlatform(this.updateProdPlatform).then(res => {
        //     console.log(res);
        //     // this.getProductDetail(this.productId)
        //     this.layoutService.hide();
        // }).catch(err => {
        //     console.log(err);
        //     this.layoutService.hide();
        // })
    }

}