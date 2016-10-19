/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { ProdDirListService } from '../service/prod-dir-list.service';

//model
import { Proddir } from '../model/proddir.model';
// import {ProdDirModule} from '../prod-dir-mng.routing'
@Component({
    selector: 'prod-dir-list',
    templateUrl: '../template/prod-dir-list.component.html',
    styleUrls: [
    ],
    providers: []
})
export class ProdDirListComponent implements OnInit{

    constructor(
        private layoutService: LayoutService,
        private service : ProdDirListService,
        private router : Router
    ) {}

    // 产品目录数组
    prodDirList: Array<Proddir> = new Array<Proddir>();

    // 产品目录总页数
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
    notice : ConfirmComponent;

    @ViewChild('createProdDir')
    createProdDir:PopupComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    //初始化
    ngOnInit(){
        console.log('init');
        this.backend(1, this.pp);
    }

    // 选择产品目录（多选）
    switchSelectIndividual(id:number) {
        this.prodDirList[id].isSelected = !this.prodDirList[id].isSelected;
    }

    switchSelectAll(){
        for(let dir of this.prodDirList){
            dir.isSelected=true;
        }
    }

    // 获得当前选中的产品目录
    getProddir (){
        //radiio
        let proddir : Proddir ;
        for(let i = 0 ; i < this.prodDirList.length ; i ++){
            if(this.prodDirList[i].isSelected == true){
                proddir = this.prodDirList[i];
            }
        }
        return proddir;
        //checkbox
        // let selectedProdDirList: Array<Proddir> = new Array<Proddir>();
        // for(let dir of this.prodDirList){
        //     if(dir.isSelected == true){
        //         selectedProdDirList.push(dir) ;
        //     }
        // }
        // return selectedProdDirList;

    }

    //删除按钮
    delete (){
        console.log('remove');
        let proddir : Proddir = this.getProddir();
        console.log(proddir);
        if(!proddir){
            this.notice.open('操作错误','请选择产品目录');
        }else{
            this.deleteConfirm.open('删除产品目录','您选择删除 '+proddir.serviceName+'产品,请确认；如果确认，此产品目录的数据将不能恢复。')
        }
    };
    //发布按钮
    publish (){
        console.log('publish');
    };
    //取消发布按钮
    ccPublish (){
        console.log('ccPublish');
    };
    //编辑按钮
    edit (){
        console.log('edit');
    }

    //创建按钮
    creation (){
        //跳转
        console.log('create');
        this.createProdDir.open('创建产品目录')

    }
    otcreate(){
        this.router.navigateByUrl("prod-mng/prod-dir-mng/prod-dir-cre", {skipLocationChange: true});
    }


    backend(page: number, size: number){
        // this.layoutService.show();
        // this.tp = 0;
        // this.service.getProdDirList(page, size).then(
        //     response => {
        //         if (response && 100 == response.resultCode){
        //             let resultContent = response.resultContent;
        //             let backend = new Array<Proddir>();
        //             for (let content of resultContent) {
        //                 let proddir = new Proddir();
        //
        //                 proddir.serviceId = content.serviceId;
        //                 proddir.serviceName = content.serviceName;
        //                 proddir.productNum = content.productNum;
        //                 proddir.serviceTemplateName = content.serviceTemplateName;
        //                 proddir.createrName = content.createrName;
        //                 proddir.creatorId = content.creatorId;
        //                 proddir.description = content.description;
        //                 proddir.specification = content.specification;
        //                 proddir.status = content.status;
        //                 proddir.isSelected = false;
        //
        //                 backend.push(proddir);
        //             }
        //             let pageInfo = response.pageInfo;
        //
        //             this.tp = pageInfo.totalPage;
        //
        //             this.prodDirList = backend;
        //
        //         }else{
        //
        //         }
        //         this.layoutService.hide();
        //     }
        // ).catch(
        // );
        //mockup
        let proddir = new Proddir();

        proddir.serviceId = '5';
        proddir.serviceName = 'serviceName';
        proddir.productNum = 10;
        proddir.serviceTemplateName = 'serviceTemplateName';
        proddir.createrName = 'createrName';
        proddir.creatorId = 'creatorId';
        proddir.description = 'description';
        proddir.specification = 'specification';
        proddir.status = 'status';
        proddir.isSelected = false;

        this.prodDirList .push(proddir);

    }
    ccf() {

    }

    nof() {

    }


}
