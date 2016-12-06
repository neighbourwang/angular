import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';


import { ClMngCommonService } from '../service/cl-mng-common.service';

//model
import { Platform } from '../model/platform.model';

@Component({
    templateUrl: '../template/pf-mng-cloudHostSpec.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})
export class CloudHostSpecComponent implements OnInit {


    constructor(private layoutService:LayoutService,
                private service:ClMngListService,
                private route:Router,
                private router:ActivatedRoute,
                private commonService : ClMngCommonService,
                private location :Location
                ) {
    }



    @ViewChild('publishConfirm')
    publishConfirm: ConfirmComponent;

    @ViewChild('ccPublishConfirm')
    ccPublishConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    // 确认Box/通知Box的标题
    title:String = "";
    // 确认Box/通知Box的内容
    msg:String = "";
    // 云平台类型
    platFormType : Array<any> = new Array<any>();
    // 云平台状态
    platFormStatus : Array<any> = new Array<any>();


  
    platformName:string;
    platformType:string;
    //初始化
    ngOnInit() {
        let id:string;
        let type:string;
        this.router.params.forEach((params: Params)=>{
             id=params['id'];
             this.platformName=params['name'];
             this.platformType=params['type']
             console.log(id,type,name)
            //  (type=='0')&&(this.vmProdDir=true);
            //  (type=='1')&&(this.vmProdDir=false);             
        })
        
         
        
    }
   getProddir() {
        // let proddir : Proddir ;
        // for(let i = 0 ; i < this.prodDirList.length ; i ++){
        //     if(this.prodDirList[i].isSelected == true){
        //         proddir = this.prodDirList[i];
        //     }
        // }
        // return proddir;
    }
    back(){
        this.location.back();
    }
    goList(){
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    save(){}
    createBootDisk(){
        this.route.navigate(['pf-mng2/pf-mng-bootDisk-creEdit'])
    }
}
