import { Component, ViewChild, OnInit } from '@angular/core';
import { Router ,ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';
//service
import { GetProduct } from '../service/getProduct.service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
//model
import{ Product } from '../model/product.model';
import { Config } from '../../../../architecture/components/countBar/config/config';
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
        private ProdDirDetailService:ProdDirDetailService
    ){}
    product=new Product();
    prodDir=new ProductDir();
    prodDetailCountBar:Config={
        default: 0,
        step: 50,
        min: 0,
        max: 2046,
        disabled: true,
        name: 'basicCyclePriceBa'
    }
    ngOnInit(){
        // console.log(this.router.params);
        let id:string;
        this.router.params.forEach((params: Params)=>{
             id=params['id'];
        })
        console.log(id); 
        this.getProductDetail(id);        
    }
    //请求产品详情
    getProductDetail(id){
        this.getProduct.getProduct(id).then((response)=>{
                if (response && 100 == response.resultCode) {                    
                    this.product=response.resultContent;
                    console.log(this.product);
                    this.getProdDirDetail(this.product.serviceId);
                }else{

                }                
            }).catch((err)=>{
                console.error(err)
            })
    }
     //获取产品目录详情
    getProdDirDetail(id) {
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

}