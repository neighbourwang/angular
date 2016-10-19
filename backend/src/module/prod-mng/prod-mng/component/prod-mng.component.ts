/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

// import { ClMngListService } from '../service/cl-mgn-list.service';
//model
import{Product} from '../model/product.model'

@Component({
    selector: 'prod-mng',
    templateUrl: '../template/prod-mng.component.html',
    styleUrls: [
    ],
    providers: []
})
export class ProdMngComponent implements OnInit{


    constructor(
        // private layoutService: LayoutService,
        // private service : ClMngListService
    ) {}


    // 产品目录数组
    prodList: Array<Product> = new Array<Product>();

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



    //初始化
    ngOnInit(){
        console.log('init');
        // this.backend(1, this.pp);
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
    create (){
        //跳转
        console.log('create');
    }


    // backend(page: number, size: number){
    //     this.layoutService.show();
    //     this.tp = 0;
    //     this.service.getPlatforms(page, size).then(
    //         response => {
    //             console.log(response);
    //             this.layoutService.hide();
    //         }
    //     ).catch(
    //     );
    //
    // }


}
