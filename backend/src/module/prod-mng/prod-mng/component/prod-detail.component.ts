import { Component, ViewChild, OnInit } from '@angular/core';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent,CountBarComponent } from '../../../../architecture';
//service
import { GetProduct } from '../service/getProduct.service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
import { ProductEditService } from '../service/product.edit.service';
//model
import{ Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';
import { HistoryPriceList } from '../model/historyPrice.model';

@Component({
    selector: 'prod-detail',
    templateUrl: '../template/prod-detail.component.html',
    styleUrls: ['.././style/prod-cre.less'
    ],
    providers: []
})
// class basicCyclePriceBar extends Config{
        
//     };
export class ProdDetailComponent implements OnInit{
    constructor(
        private GetProduct:GetProduct,
        private router:ActivatedRoute,
        private getProduct:GetProduct,
        private ProdDirDetailService:ProdDirDetailService,
        private location:Location,
        private service:ProductEditService
    ){}
    product=new Product();
    prodDir=new ProductDir();
    vmProdDir:boolean;
    productId:string;
    historyPriceList:Array<HistoryPriceList>;
    Tabels = [
        { name: '基本信息', active: true },
        { name: '计价信息', active: false },
        { name: '平台信息', active: false },
        { name: '企业信息', active: false },
        { name: '历史价格', active: false }
    ]

    //切换TAB
    changeTab(item, index) {
        this.Tabels.forEach((ele) => {
            ele.active = false;
        })
        item.active = true;
    }

    ngOnInit(){
        console.log(this.router.params);
        let type:string;
        this.router.params.forEach((params: Params)=>{
             this.productId=params['id'];
             type=params['type'];
             (type=='0')&&(this.vmProdDir=true);
             (type=='1')&&(this.vmProdDir=false);             
        })
        this.getProductDetail(this.productId); 
        this.getHistoryPrice(this.productId);            
        
    }
    //请求产品详情
    getProductDetail(id){
        this.getProduct.getProduct(id).then((response)=>{
                if (response && 100 == response.resultCode) {                    
                    this.product=response.resultContent;
                    // this.product.id=this.productId;
                    this.tempProductName=this.product.name;
                    this.tempProductDesc=this.product.desc;
                    this.tempBasicCyclePrice=this.product.basicCyclePrice;
                    this.tempExtendCyclePrice=this.product.extendCyclePrice;
                    this.tempOneTimePrice=this.product.oneTimePrice;
                    this.tempUnitPrice=this.product.unitPrice;
                    console.log('产品',this.product);
                    if(this.vmProdDir){
                        this.getVmProdDirDetail(this.product.serviceId);
                    }else{
                        console.log('cc')
                        this.getDiskProdDirDetail(this.product.serviceId);
                    }   
                }               
            }).catch((err)=>{
                console.error(err)
            })
    }
     //获取vm产品目录详情
    getVmProdDirDetail(id) {
        this.ProdDirDetailService.getVmProdDirDetail(id).then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
                console.log(this.prodDir);
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    //获取disk产品目录详情
    getDiskProdDirDetail(id) {
        this.ProdDirDetailService.getDiskProdDirDetail(id).then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
                console.log(this.prodDir);
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    //获取产品历史价格信息
    getHistoryPrice(id){
        this.service.getHistoryPrice(id).then(res=>{
            console.log('历史价格',res);
            this.historyPriceList=res.resultContent;
        }).catch(err=>{
            console.error(err);
        })
    }
    //编辑基本信息
    editBasicInfo:boolean=false;
    tempProductName:string;
    tempProductDesc:string;
    saveBasic(){
        this.editBasicInfo=false;
        this.product.name=this.tempProductName;
        this.product.desc=this.tempProductDesc;
        console.log(this.product);
    }

    //编辑价格
    editPriceInfo:boolean=false;
    tempBasicCyclePrice:number;
    tempExtendCyclePrice:number;
    tempOneTimePrice:number;
    tempUnitPrice:number;
    cancelPriceEdit(){
        this.tempBasicCyclePrice=this.product.basicCyclePrice;
        this.tempExtendCyclePrice=this.product.extendCyclePrice;
        this.tempOneTimePrice=this.product.oneTimePrice;
        this.tempUnitPrice=this.product.unitPrice;
        this.editPriceInfo=false;
    }
    savePrice(){
        this.product.basicCyclePrice=this.tempBasicCyclePrice;
        this.product.extendCyclePrice=this.tempExtendCyclePrice;
        this.product.oneTimePrice=this.tempOneTimePrice;
        this.product.unitPrice=this.tempUnitPrice;
        this.editPriceInfo=false;
        console.log(this.product);
        this.service.changProdPrice(this.product).then(res=>{
            console.log(res);
            this.getProductDetail(this.productId); 
            this.getHistoryPrice(this.productId);            
        }).catch(err=>{

        })
    }
    //编辑平台

    outputValue(e, num) {
       this[num] = e;
    }
    //返回列表
    cancel(){
        this.location.back();
    }

}