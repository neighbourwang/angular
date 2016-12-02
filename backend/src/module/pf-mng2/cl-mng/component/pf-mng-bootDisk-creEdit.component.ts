/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model 





@Component({
    selector: 'cl-mng-cre-step-1',
    templateUrl: '../template/pf-mng-bootDisk-creEdit.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})

export class bootDiskCreEditComponent implements OnInit{

    title : String ;
    msg : String;

    constructor(
        private router : Router,
        private layoutService : LayoutService,
        private locaton : Location
    ) {}


    @ViewChild('notice')
    notice:ConfirmComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();

       
        // this.layoutService.hide();
    }
   
    //取消
    cancel (){
        this.locaton.back();
    }
    
    
    // 验证字段
   
}
