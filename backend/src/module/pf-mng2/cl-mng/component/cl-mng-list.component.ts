import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ClMngListService } from '../service/cl-mgn-list.service';

//model
import { Platform } from '../model/platform.model';

@Component({
  selector: 'cl-mng-list',
  templateUrl: '../template/cl-mng-list.component.html',
  styleUrls: [
  ],
  providers: []
})
export class ClMngListComponent implements OnInit{


    constructor(
        private layoutService: LayoutService,
        private service : ClMngListService,
        private router : Router
    ) {}

    // 平台数组
    platforms: Array<Platform> = new Array<Platform>();

    // 平台数据总页数
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
        let platForm : Platform = this.getPlatForm();
        if(!platForm){
            this.notice.open('操作错误','请选择云平台');
        }else{
            this.removeConfirm.open('删除云平台','您选择删除 '+platForm.name+'云平台,请确认；如果确认，此云平台的数据将不能恢复。')
        }
    }
    //启用按钮
    enable (){
        console.log('enable');
        let platForm : Platform = this.getPlatForm();
        if(!platForm){
            this.notice.open('操作错误','请选择云平台');
        }else{
            this.removeConfirm.open('启用云平台','您选择启用 '+platForm.name+'云平台,请确认；如果确认，用户将能够订购此云平台的资源。')
        }
    }
    //禁用按钮
    disable (){
        console.log('disable');
        let platForm : Platform = this.getPlatForm();
        if(!platForm){
            this.notice.open('操作错误','请选择云平台');
        }else{
            this.removeConfirm.open('禁用云平台','您选择禁用 '+platForm.name+'云平台,请确认；如果确认，用户将不能够订购此云平台的资源。。')
        }
    }

    // 创建按钮
    create (){
        //跳转
        console.log('create');
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step1');
    }
    // 选择云平台
    switchSelectIndividual(id : number){
        console.log(id);
        for(let i = 0 ; i < this.platforms.length ; i ++){
            this.platforms[i].isSelected = false;
        }
        this.platforms[id].isSelected = true;
    }
    // 删除弹出框确认按钮
    removeCof (){
        //调用接口
        this.layoutService.show();
        let platForm : Platform = this.getPlatForm();

        //调用接口
        this.service.deletePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode){
                    this.notice.open('确认',"删除成功");
                    this.deleteAryByIndex(this.platforms , platForm.id)
                }
                this.layoutService.hide();
            }

        );


    }
    // 启用弹出框确认按钮
    enableCof (){
        //调用接口
        this.layoutService.show();
        let platForm : Platform =  this.getPlatForm();
        this.service.activePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode){
                    this.notice.open('确认',"启用成功");
                    //todo 手动修改状态
                }
                this.layoutService.hide();
            }
        )
    }
    // 禁用弹出框确认按钮
    disableCof (){
        this.layoutService.show();
        let platForm : Platform =  this.getPlatForm();
        this.service.deletePlatform(platForm.id).then(
            response => {
                if (response && 100 == response.resultCode){
                    this.notice.open('确认',"禁用成功");
                    //todo 手动修改状态
                }
                this.layoutService.hide();
            }
        )
    }

    ccf (){

    }
    nof (){

    }

    // 获得当前选中的平台
    getPlatForm (){
        let platForm : Platform ;
        for(let i = 0 ; i < this.platforms.length ; i ++){
            if(this.platforms[i].isSelected == true){
                platForm = this.platforms[i];
            }
        }
        return platForm;

    }

    // 获得云平台list
    backend(page: number, size: number){
        this.layoutService.show();
        this.tp = 0;
        this.service.getPlatforms(page, size).then(
            response => {
                if (response && 100 == response.resultCode){
                    let resultContent = response.resultContent;
                    let backend = new Array<Platform>();
                    for (let content of resultContent) {
                        let platform = new Platform();

                        platform.id = content.id;
                        platform.name = content.name;
                        platform.platformType = content.platformType;
                        platform.platformTypeName = content.platformTypeName;
                        platform.uri = content.uri;
                        platform.userName = content.userName;
                        platform.passwd = content.passwd;
                        platform.description = content.description;
                        platform.version = content.version;
                        platform.status = content.status;
                        platform.isSelected = false;

                        backend.push(platform);
                    }
                    let pageInfo = response.pageInfo;

                    this.tp = pageInfo.totalPage;

                    this.platforms = backend;

                }else{

                }
                this.layoutService.hide();
            }
        ).catch(function(){

        }
        );
    }


    deleteAryByIndex (items : Array<Platform> , index : number){
        let newAr : Array<Platform> = new Array<Platform>();
        for(let i = 0 ; i < items.length ; i ++){
            if(items[i].id != index){
                newAr.push(items[i]);
            }
        }
        return newAr;
    }



}
