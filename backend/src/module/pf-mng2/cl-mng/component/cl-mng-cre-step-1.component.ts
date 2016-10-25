/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model 
import { CreStep1Model } from '../model/Cre-step1.model';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service'

@Component({
    selector: 'cl-mng-cre-step-1',
    templateUrl: '../template/cl-mng-cre-step-01.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep1Component implements OnInit{

    creStep1Model : CreStep1Model = new CreStep1Model();
    title : String ;
    msg : String;
    platformTypes : Array<any> = new Array<any>();
    platformVersion : Array<any> = new Array<any>();

    constructor(
        private router : Router,
        private service : ClMngCreStep1Service,
        private layoutService : LayoutService
    ) {}


    @ViewChild('notice')
    notice:ConfirmComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();

        //获取云平台类型
        this.service.getPlatFormType().then(
            res => {
                if (res && 100 == res.resultCode) {
                    console.log(res);
                    this.platformTypes = res.resultContent;
                }
                
            }
        ).catch(function () {
                //this.notice.open('错误','获取信息错误');
            }
        );
        //获取地域
        this.service.getRegion().then(
            res => {
                if(res && 100 == res.resultCode){
                    console.log('地域',res);
                }
            }
        ).catch(function(){

        })
        // this.layoutService.hide();
    }
    // 下一步
    next (){
        let message : String= this.checkValue();
        // if(this.checkValue()){
        //     this.notice.open('错误',message);
        // }else{
        //     this.router.navigateByUrl("pf-mng2/cl-mng/cre-step2");
        // }
        // todo 调用接口
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step2");
        
    }
    //取消
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
    // 选择平台类型
    choosePlatFormType (item){
        this.creStep1Model.platformType = item.value;
        this.service.getPlatFormVersion(item.code).then(
            res => {
                this.platformVersion = res.resultContent;
            }
        ).catch(function(){
            console.error('error');
        })
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
