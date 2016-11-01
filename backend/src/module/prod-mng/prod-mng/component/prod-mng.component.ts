/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';
//service
import { ProdListService } from '../service/prodList.service';
import { ProdDirListService } from '../service/prodDirList.service';
import { PlatformsActiveService } from '../../prod-dir-mng/service/platform.service';
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
        private router : Router,
        private PlatformsActiveService : PlatformsActiveService,
        private ProdListService : ProdListService,
        private ProdDirListService : ProdDirListService
    ) {}


    // 产品数组
    productList: Array<ProdList> = new Array<ProdList>();

    // 产品总页数
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

    //平台
    platformsList = new Array();
    platformId:string;
    //企业
    enterpriseList=new Array();
    enterpriseId :string;
    //产品目录列表
    prodDirList =new Array();
    prodDirId : string;
    //初始化
    ngOnInit(){
        console.log('init');
        //获得激活云平台数据
        this.PlatformsActiveService.getPlatformsActive().then(response => {
            console.log('激活云平台数据', response);
            if (response && 100 == response.resultCode) {
                this.platformsList = response.resultContent;
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
        //获取企业列表
        this.ProdDirListService.getEnterpriseList().then(response => {
            console.log('企业', response);
            // if (response && 100 == response.resultCode) {
                this.enterpriseList = response.resultContent;
                console.log(this.enterpriseList);
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
        this.ProdDirListService.getProdDirList().then(response => {
            console.log('产品目录列表', response);
            // if (response && 100 == response.resultCode) {
                this.prodDirList = response.resultContent;
                console.log(this.enterpriseList);
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })

        this.backend(1, this.pp,{});
    }

    // 选择产品目录（多选）
    switchSelectIndividual(id:number) {
        this.productList[id].isSelected =
            this.productList[id].isSelected==true?true:false;
    }
    //全选
    isSelectedAll:boolean=false;
    switchSelectAll(){
        this.isSelectedAll=!this.isSelectedAll;
        for(let dir of this.productList){
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
        for(let dir of this.productList){
            if(dir.isSelected == true){
                selectedProdList.push(dir) ;
            }
        }
        return selectedProdList;

    }
    query(){
        let data={
        "enterpriseId": this.enterpriseId,
        "platformId": this.platformId,
        "serviceId": this.prodDirId
        }
        console.log(data);
        this.backend(1, this.pp,data);
    }
    //更多操作
    prodList:Array<ProdList>;
    changStatusIdList=new Array();
    action (order){
        this.prodList = this.getProduct();
        if(this.prodList.length<1){
            this.notice.open('操作错误','请选择产品目录');
        }else{
            let message:string='';
            for(let dir of this.prodList){
                message+=dir.name+",";
                this.changStatusIdList.push(dir.id);
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
    //删除产品
    deleteCof(){
        console.log(this.changStatusIdList);
        this.ProdListService.changProdstatus({
            "pids":this.changStatusIdList,
            "status":"4"
        })
        this.query()        
    }
    //发布按钮

    publishCof(){
        console.log(this.changStatusIdList);
        this.ProdListService.changProdstatus({
            "pids":this.changStatusIdList,
            "status":"1"
        }) 
        this.query() 
    }
    //取消发布
    ccPublishCof(){
        console.log(this.changStatusIdList);
        this.ProdListService.changProdstatus({
            "pids":this.changStatusIdList,
            "status":"3"
        }) 
        this.query() 
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
        // console.log(item);
        this.router.navigate(["prod-mng/prod-mng/prod-detail", item.id]);
    }

    backend(page: number, size: number,data:any){
        // this.layoutService.show();
        this.tp = 0;
        // console.log(page);
        // console.log(size);        
        this.ProdListService.getProdList(page, size,data).then(
            response => {
                console.log(response);
                if(response&&100==response.resultCode){
                    this.productList=response.resultContent;
                }
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
