/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

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


    @ViewChild('removeConfirm')
    removeConfirm: ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice : ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    //初始化
    ngOnInit(){
        console.log('init');
        this.backend(1, this.pp);
    }

    //删除按钮
    remove (){
        console.log('remove');
    }
    //启用按钮
    enable (){
        console.log('enable');
    }
    //禁用按钮
    disable (){
        console.log('disable');
    }

    //创建按钮
    creation (){
        //跳转

        console.log('create');
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


}
