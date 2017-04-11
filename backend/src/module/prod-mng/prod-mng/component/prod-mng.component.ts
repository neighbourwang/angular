/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
//service
import { ProdListService } from '../service/prodList.service';
import { ProdDirListService } from '../service/prodDirList.service';
import { PlatformsActiveService } from '../../prod-dir-mng/service/platform.service';
//model
import { ProdList } from '../model/prodList.model'



@Component({
    selector: 'prod-mng',
    templateUrl: '../template/prod-mng.component.html',
    styleUrls: [
    ],
    providers: []
})
export class ProdMngComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private PlatformsActiveService: PlatformsActiveService,
        private ProdListService: ProdListService,
        private ProdDirListService: ProdDirListService,
    ) { }


    // 产品数组
    productList: Array<ProdList> = new Array<ProdList>();

    // 产品总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;


    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: ConfirmComponent;

    @ViewChild('createProdPop')
    createPop:PopupComponent;

    //平台
    platformsList = new Array();
    platformId: string='';
    //企业
    enterpriseList = new Array();
    enterpriseId: string='';
    //产品目录列表
    prodDirList = new Array();
    prodDirId: string='';
    //创建用产品目录
    prodDirIdCre: string='';
    prodDirTypeCre: string='';
    //初始化
    ngOnInit() {        
        this.backend(1, this.pp, {})
        this.getActivePlatform()
        this.getEnterpriseList()
        this.getServiceList()
    }
    //获得激活云平台数据
    getActivePlatform(){
        return this.PlatformsActiveService.getPlatformsActive().then(response => {
            console.log('激活云平台数据', response);
            // if (response && 100 == response.resultCode) {
                this.platformsList = response.resultContent;
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
    } 
    //获取企业列表    
    getEnterpriseList(){
       return  this.ProdDirListService.getEnterpriseList().then(response => {
            console.log('企业', response);
            // if (response && 100 == response.resultCode) {
            this.enterpriseList = response.resultContent;
            console.log(this.enterpriseList);
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
    } 
    //获取产品目录
    getServiceList(){
        return this.ProdDirListService.getProdDirList().then(response => {
            console.log('产品目录列表', response);
            // if (response && 100 == response.resultCode) {
            this.prodDirList = response.resultContent;
            if(response.resultContent[0]){
                this.prodDirIdCre=response.resultContent[0].id;
                this.prodDirTypeCre=response.resultContent[0].code;
            }            
            for(let i=0;i<this.prodDirList.length;i++){
                if(!this.ProdDirListService[i]){
                    this.prodDirList.slice(i,1);
                }
            }
            console.log('filterparodlist',this.prodDirList);
        }).catch(err => {
            console.error(err)
        })
    }      
    // 选择产品目录（多选）
    switchSelectIndividual(id: number) {
        this.productList[id].isSelected =
            this.productList[id].isSelected == true ? true : false;
    }
    //全选
    isSelectedAll: boolean = false;
    switchSelectAll() {
        this.isSelectedAll = !this.isSelectedAll;
        for (let dir of this.productList) {
            dir.isSelected = this.isSelectedAll;
        }
    }

    // 获得当前选中的产品目录
    getProduct() {
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
        for (let dir of this.productList) {
            if (dir.isSelected == true) {
                selectedProdList.push(dir);
            }
        }
        console.log(selectedProdList);
        return selectedProdList;

    }
    query() {
        let data = {
            "enterpriseId": this.enterpriseId,
            "platformId": this.platformId,
            "serviceId": this.prodDirId
        }
        console.log(data);
        this.backend(1, this.pp, data);
    }
    //更多操作
    prodList: Array<ProdList>;
    changStatusIdList = new Array();
    action(order) {
        this.prodList = this.getProduct();
        console.log(this.prodList);
        if (this.prodList.length < 1) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.SELECT_PRODUCT'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.SELECT_PRODUCT_CAT=>请选择产品 
        } else {
            let message: string = '';
            for (let dir of this.prodList) {
                message += dir.name + ",";
                this.changStatusIdList.push(dir.id);
            }
            // console.log(message);
            message = message.substring(0, message.length - 1);
            switch (order) {
                //PROD_MNG.DELETE_SELECTED_PRODUCT=>您选择删除{{value_1}}产品,请确认；如果确认，此产品目录的数据将不能恢复。
                case 'delete': this.deleteConfirm.open('PROD_MNG.DELETE_PRODUCT', 'PROD_MNG.DELETE_SELECTED_PRODUCT^^^'+ message) //PROD_MNG.DELETE_PRODUCT=>删除产品 

                    break;
                case 'publish':
                    if (this.prodList.find(v => v.status == 1)) {
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.NOT_ALLOW_TO_PUBLISH_THE_PUBLISHED_PRODUCT'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.NOT_ALLOW_TO_PUBLISH_THE_PUBLISHED_PRODUCT=>不可以再次发布已发布状态的产品 


                    } else {
                        this.publishConfirm.open('PROD_MNG.PUBLISH_PRODUCT', 'PROD_MNG.PUBLISH_SELECTED_PRODUCT^^^'+message) ////PROD_MNG.PUBLISH_SELECTED_PRODUCT=>您选择发布{{value_1}}产品,请确认。

                    }
                    break;
                case 'ccPublish':
                    if (this.prodList.find(v => v.status == 3)) {
                        this.notice.open('COMMON.OPERATION_ERROR', 'PROD_MNG.DONOT_CANCEL_PUBLISH_FOR_PUBLISHED_PRODUCT'); //COMMON.OPERATION_ERROR=>操作错误  //PROD_MNG.DONOT_CANCEL_PUBLISH_FOR_PUBLISHED_PRODUCT=>不可以再次取消发布未发布状态的产品 


                    } else {
                        this.ccPublishConfirm.open('PROD_MNG.CANCEL_PUBLISH_PRODUCT', 'PROD_MNG.CANCEL_PUBLISH_PRODUCT_FOR_SELECTED^^^' + message); //PROD_MNG.CANCEL_PUBLISH_PRODUCT=>取消发布产品 

                    } break;
            }
        }
    };
    //删除产品
    deleteCof() {
        console.log(this.changStatusIdList);
        this.ProdListService.changProdstatus({
            "pids": this.changStatusIdList,
            "status": "4"
        })
        this.query()
    }
    //发布按钮

    publishCof() {
        console.log(this.prodList);
        this.ProdListService.changProdstatus({
            "pids":this.changStatusIdList,
            "status":"1"
        }).then((response)=>{
            this.query() ;
        }).catch((err)=>{
            console.error(err)
        })         
    }
    //取消发布
    ccPublishCof() {
        console.log(this.prodList);
        this.ProdListService.changProdstatus({
            "pids":this.changStatusIdList,
            "status":"3"
        }).then((response)=>{
            this.query() ;
        }).catch((err)=>{
            console.error(err)
        })
    }

    //编辑按钮
    edit() {
        console.log('edit');
    }

    //创建按钮
    creation() {
        //跳转
        console.log('create');
        this.router.navigateByUrl("prod-mng/prod-mng/prod-cre", { skipLocationChange: true });

    }
    //去编辑详情页面
    goDetail(item) {
        console.log(item);
        this.router.navigate(["prod-mng/prod-mng/prod-detail", {id:item.id,type:item.serviceType}]);
    }

    backend(page: number, size: number, data: any) {
        this.layoutService.show();
        this.tp = 0;
        // console.log(page);
        // console.log(size);        
        return this.ProdListService.getProdList(page, size, data).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    this.productList = response.resultContent;
                    if(this.productList.length==0){
                        this.notice.open('提示','未找到相关产品信息');
                    }
                    this.tp = response.pageInfo.totalPage;
                }
                this.layoutService.hide();
            }
        ).catch(
            err => {
                console.log(err);
                this.layoutService.hide();
            }
            );
    }
    ccf() {

    }

    nof() {

    }
    pageInfo(page) {
        console.log(page);
        this.backend(page, this.pp, {});
    }

    createProd(){
        this.createPop.open('PROD_MNG.CREATE_PRODUCT')
    }
    selectProDir(e){
        console.log(e);
        this.prodDirList.filter(ele=>{
            if(ele.id==e){
                console.log(ele);
                this.prodDirTypeCre=ele.code;
                return ele;
            }
        })
    }
    otcreate(){        
         this.router.navigate(["prod-mng/prod-mng/prod-mng-cre-1", {'id':this.prodDirIdCre,'type':this.prodDirTypeCre}]);
    }
}
