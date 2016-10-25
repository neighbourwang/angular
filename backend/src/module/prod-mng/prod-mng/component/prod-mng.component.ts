/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { ProdListService } from '../service/prodList.service';
//model
import{ ProdList } from '../model/prodList.model'

@Component({
    selector: 'prod-mng',
    templateUrl: '../template/prod-mng.component.html',
    styleUrls: [
    ],
    providers: []
})
export class ProdMngComponent implements OnInit{


    constructor(
        private layoutService: LayoutService,
        private service : ProdListService,
        private router : Router
    ) {}


    // 产品目录数组
    prodList: Array<ProdList> = new Array<ProdList>();

    // 产品目录总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 8;


    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice : ConfirmComponent;



    //初始化
    ngOnInit(){
        console.log('init');
        this.backend(1, this.pp);
    }

    // 选择产品目录（多选）
    switchSelectIndividual(id:number) {
        this.prodList[id].isSelected =
            this.prodList[id].isSelected==true?true:false;
    }
    //全选
    isSelectedAll:boolean=false;
    switchSelectAll(){
        this.isSelectedAll=!this.isSelectedAll;
        for(let dir of this.prodList){
            dir.isSelected=this.isSelectedAll;
        }
    }

    // 获得当前选中的产品目录
    getProduct (){
        //radiio
        // let proddir : Proddir ;
        // for(let i = 0 ; i < this.prodDirList.length ; i ++){
        //     if(this.prodDirList[i].isSelected == true){
        //         proddir = this.prodDirList[i];
        //     }
        // }
        // return proddir;
        //checkbox
        let selectedProdList: Array<ProdList> = new Array<ProdList>();
        for(let dir of this.prodList){
            if(dir.isSelected == true){
                selectedProdList.push(dir) ;
            }
        }
        return selectedProdList;

    }

    //删除按钮
    action (order){
        let prodList :  Array<ProdList> = this.getProduct();
        if(prodList.length<1){
            this.notice.open('操作错误','请选择产品目录');
        }else{
            let message:string='';
            for(let dir of prodList){
                message+=dir.name+",";
            }
            console.log(message);
            message=message.substring(0,message.length-1);
            switch (order){
                case 'delete':this.deleteConfirm.open('删除产品','您选择删除 '+"'"+message+"'"+'产品,请确认；如果确认，此产品将不能恢复。')
                    break;
                case 'publish':this.publishConfirm.open('发布产品','您选择发布 '+"'"+message+"'"+'产品,请确认。')
                    break;
                case 'ccPublish':this.ccPublishConfirm.open('取消发布产品','您选择取消发布'+"'"+message+"'"+'产品,请确认。如果确认，用户将不能够订购此产品。')
                    break;
            }

        }
    };
    deleteCof(){

    }
    //发布按钮

    publishCof(){

    }

    ccPublishCof(){

    }




    //编辑按钮
    edit (){
        console.log('edit');
    }

    //创建按钮
    creation (){
        //跳转
        console.log('create');
        this.router.navigateByUrl("prod-mng/prod-mng/prod-cre", {skipLocationChange: true});

    }
    //去编辑详情页面
    goDetail(item){
        console.log(item);
        this.router.navigateByUrl("prod-mng/prod-mng/prod-cre", {skipLocationChange: true});
    }

    backend(page: number, size: number){
        this.layoutService.show();
        this.tp = 0;
        console.log(page);
        console.log(size);
        
        this.service.getProdList(page, size).then(
            response => {
                console.log(response);
                this.layoutService.hide();
            }
        ).catch(
            err=>{
                console.log(err);
            }
        );
    //mockup
    // let product = new ProdList();

    // product.serviceName = 'serviceName1';


    // let product2 = new ProdList();

    // product2.serviceName = 'serviceName2';

    // this.prodList .push(product);
    // this.prodList .push(product2);

    //     console.log(this.prodList);
    }
    ccf() {

    }

    nof() {

    }

}
