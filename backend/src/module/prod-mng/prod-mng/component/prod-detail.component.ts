import { Component, ViewChild, OnInit } from '@angular/core';
import { Router ,ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
// import { Location }               from '@angular/common';
import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';
//service
import { GetProduct } from '../service/getProduct.service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
//model
import{ Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';
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
        private location:Location
    ){}
    product=new Product();
    prodDir=new ProductDir();
    vmProdDir:boolean;
    ngOnInit(){
        console.log(this.router.params);
        let id:string;
        let type:string;
        this.router.params.forEach((params: Params)=>{
             id=params['id'];
             type=params['type'];
             (type=='0')&&(this.vmProdDir=true);
             (type=='1')&&(this.vmProdDir=false);             
        })
        console.log(id); 
        console.log(type); 
        this.getProductDetail(id);        
    }
    //请求产品详情
    getProductDetail(id){
        this.getProduct.getProduct(id).then((response)=>{
                if (response && 100 == response.resultCode) {                    
                    this.product=response.resultContent;
                    console.log(this.vmProdDir);
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
    //返回列表
    cancel(){
        this.location.back();
    }

}