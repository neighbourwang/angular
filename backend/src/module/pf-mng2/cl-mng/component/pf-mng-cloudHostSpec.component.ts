import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';


import { ClMngCommonService } from '../service/cl-mng-common.service';

//model

@Component({
    templateUrl: '../template/pf-mng-cloudHostSpec.component.html',
    styles: [
        // '../style/cl-mng.less'
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
    providers: []
})
export class CloudHostSpecComponent implements OnInit {


    constructor(private layoutService:LayoutService,
                private service:ClMngListService,
                private route:Router,
                private router:ActivatedRoute,
                private location :Location
                ) {
    }



    @ViewChild('confirm')
    confirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    // 云平台类型
    platFormType : string;
    // 云平台类型名
    platformTypeName :string;

  
    platformName:string;
    platformType:string;
    //初始化
    ngOnInit() {
        let id:string;
        let type:string;
        this.router.params.forEach((params: Params)=>{
             id=params['id'];
             this.platformName=params['name'];
             this.platformType=params['type'];
             this.platformTypeName=
                this.platFormType=='0'?'OpenStack':'Vmware';
             console.log(id,type,name)
        })     
         
        
    }
    //启用云主机规格
    enableSpec(){}
    //删除云主机规格
    deleSpec(){

    }
    //Opstack更新云主机规格
    updateSpec(){

    }
    //VMware新建云主机规格
    createSpec(){

    }

    back(){
        this.location.back();
    }
    goList(){
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
    save(){}    
}
