/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent  } from '../../../../architecture';

//model 
import { CreStep1Model } from '../model/Cre-step1.model';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service';

import { ClMngCommonService } from '../service/cl-mng-common.service';

import { ClMngIdService } from '../service/cl-mng-id.service';


@Component({
    selector: 'cl-mng-cre-step-1',
    templateUrl: '../template/cl-mng-cre-step-01.component.html',
    styleUrls: [
        '../style/cl-mng.less'
    ],
    providers: []
})

export class ClMngCreStep1Component implements OnInit{

    creStep1Model : CreStep1Model = new CreStep1Model();
    title : String ;
    msg : String;
    platformTypes : Array<any> = new Array<any>();
    platformVersion : Array<any> = new Array<any>();
    regions : Array<any> = new Array<any>();

    constructor(
        private router : Router,
        private service : ClMngCreStep1Service,
        private layoutService : LayoutService,
        private idService : ClMngIdService,
        private commonService : ClMngCommonService
    ) {}


    @ViewChild('notice')
    notice:ConfirmComponent;

    @ViewChild('regionSelect')
    regionSelect: PopupComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();

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
        // this.layoutService.hide();
    }
    // 下一步
    ccf(){}
    cof(){
        this.service.crPlatForm(this.creStep1Model).then(
                res => {
                    this.idService.setPlatformId(res.resultContent);
                    this.router.navigateByUrl("pf-mng2/cl-mng/cre-step2");
                }
            ).catch(
                err => {
                    console.error('error');
                    this.notice.open('错误','创建云平台错误');
                }
            )
    }
    next (){      

        let message : String= this.checkValue();
        if(this.checkValue()){
            this.notice.open('错误',message);
        }else{
            this.regionSelect.open('创建云平台：选取Region')
            // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step2");
            
        }
        
    }
    //取消
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
    // 选择平台类型
    choosePlatFormType (item , index){
        for(let i = 0 ; i < this.platformTypes.length ; i ++){
            this.platformTypes[i].isSelected = false;
        }
        this.platformTypes[index].isSelected = true;
        this.creStep1Model.platformType = item.value;

        this.commonService.getVersion(item.code).then(
            res => {
                this.platformVersion = res
                this.creStep1Model.version = this.platformVersion[0].value;
            }
        ).catch(
            err => {
                console.error('err');
                this.notice.open('错误','获取版本错误');
            }
        )
    }
    
    // 验证字段
    checkValue () : String {
        console.log(this.creStep1Model);
        if(!this.creStep1Model.name){
            return '请输入云平台名称';
        }
        if(!this.creStep1Model.dataCenter){
            return '请输入所属数据中心';
        }
        if(!this.creStep1Model.regionId){
            return '请选择所属地域';
        }
        if(!this.creStep1Model.platformType){
            return '请选择云平台类型';
        }
        if(!this.creStep1Model.uri){
            return '请输入地址';
        }
        if(!this.creStep1Model.version){
            return '请选择版本';
        }
        if(!this.creStep1Model.userName){
            return '请输入用户名';
        }
        if(!this.creStep1Model.passwd){
            return '请输入密码';
        }
        return '';
    }
}
