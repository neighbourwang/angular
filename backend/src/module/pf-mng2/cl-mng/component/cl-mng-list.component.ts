import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent  } from '../../../../architecture';

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
        private service : ClMngListService
    ) {}

    // 平台数组
    platforms: Array<Platform> = new Array<Platform>();

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;



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
    create (){
        //跳转
        console.log('create');
    }


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


}
