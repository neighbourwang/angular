/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit ,OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
// import { Config} from '../model/config';
import { Config} from '../../../../architecture/components/countBar/config/config';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent ,CountBarComponent} from '../../../../architecture';

// import {  } from '../service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
// import { ProdListService } from '../service/prodList.service';
import { ProdDirListService } from '../service/prodDirList.service';
//model
import { Product } from '../model/product.model';
import { ProductDir } from '../model/prodDir.model';


@Component({
    selector: 'prod-cre',
    templateUrl: '../template/prod-cre.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdCreComponent implements OnInit , OnChanges{
    constructor(
        private router : Router,
        private ProdDirDetailService : ProdDirDetailService,
        // private ProdListService : ProdListService,
        private ProdDirListService : ProdDirListService
    ) {}

    enterpriseList = new Array();
    prodDirList = new Array ();
    prodDir = new ProductDir();
    ngOnInit (){
        console.log('init');
         //获取企业列表
        this.ProdDirListService.getEnterpriseList().then(response => {
            console.log('企业', response);
            // if (response && 100 == response.resultCode) {
                this.enterpriseList = response.resultContent;
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })


         this.getProdDirDetail();
    }

    getProdDirDetail(){
        this.ProdDirDetailService.getVmProdDirDetail('6b138c29-0ff8-4cb9-bb9f-3dbbcebb6f90').then(response => {
            console.log('产品目录详情', response);
            if (response && 100 == response.resultCode) {
                this.prodDir = response.resultContent;
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
    


    //选择企业
    selectEnterprise(ent,index){
        console.log(ent);
        console.log(index);        
    }
    cancel() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng',{skipLocationChange: true})
    }

    onSubmit() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng',{skipLocationChange: true})
    }

    
    countBar:Config={
        default:100,
        step:50,
        min:0,
        max:1024,
        disabled:true,
        name:'prodCre01'
    }
    outputValue(e,number){
        console.log(e);
        console.log(number);
        
    }

    postProd(){
        
    }
}
