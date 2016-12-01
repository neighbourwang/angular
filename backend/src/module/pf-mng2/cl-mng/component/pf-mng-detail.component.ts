import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

//model
import { Platform } from '../model/platform.model';

@Component({
    templateUrl: '../template/pf-mng-detail.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})
export class PfDetailComponent implements OnInit {


    constructor(private layoutService:LayoutService,
                private service:ClMngListService,
                private router:ActivatedRoute,
                private platFormTypeService : ClMngCreStep1Service,
                private commonService : ClMngCommonService,
                private location :Location
                ) {
    }



    @ViewChild('removeConfirm')
    removeConfirm:ConfirmComponent;

    @ViewChild('enableConfirm')
    enableConfirm:ConfirmComponent;

    @ViewChild('disableConfirm')
    disableConfirm:ConfirmComponent;

    @ViewChild('notice')
    notice:ConfirmComponent;

    // 确认Box/通知Box的标题
    title:String = "";
    // 确认Box/通知Box的内容
    msg:String = "";
    // 云平台类型
    platFormType : Array<any> = new Array<any>();
    // 云平台状态
    platFormStatus : Array<any> = new Array<any>();


    Tabels=[
        {name:'基本信息',active:true},
        {name:'可用区与配额',active:false},
        {name:'存储区与配额',active:false}        
        ]
    basicInfo:boolean=true;
    zoneAvailable:boolean=false;
    storageAvailable:boolean=false;


    platformName:string;
    platformTypes : Array<any> = new Array<any>();
    platformVersion : Array<any> = new Array<any>();
    regions : Array<any> = new Array<any>();
    //初始化
    ngOnInit() {
        let id:string;
        let type:string;
        this.router.params.forEach((params: Params)=>{
             id=params['id'];
             type=params['type'];
             this.platformName=params['name'];
             console.log(id,type,name)
            //  (type=='0')&&(this.vmProdDir=true);
            //  (type=='1')&&(this.vmProdDir=false);             
        })
        
        //获取云平台类型
        this.commonService.getPlatFormTypes()
            .then(
                res => this.platformTypes = res
            )
            .catch(
                err => {
                    console.error('err');
                    this.notice.open('错误','获取信息错误');
                }
            )
            //获取区域列表
        this.commonService.getRegion()
            .then(
                
                res => {
                    console.log('region',res);
                    this.regions = res;
                }
            ).catch(
                err => {
                    console.error('err');
                    this.notice.open('错误','获取信息错误');
                }
            )       
        
    }
    //切换TAB
    changeTab(item,index){        
        this.Tabels.forEach((ele)=>{
            ele.active=false;
        })
        item.active=true;
        
    }
    back(){
        this.location.back();
    }
    save(){}

}
