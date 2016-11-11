import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

//service
import { AccountMngService } from '../service/account-mng-list.service';

@Component({
    selector: 'account-mng-cr-local',
    templateUrl: '../template/account-mng-cr-local.component.html',
    styleUrls: [],
    providers: []
})
export class AccountMngCrLocal implements OnInit{
    constructor(
        private service: AccountMngService,
        private router : Router,
        private route : ActivatedRoute
        ) { }
    //判断是否是创建 还是 编辑
    isCreate : boolean = false;
    // 标题 根据 isCreate 修改
    title : string = '';
    // 按钮的名字 根据 isCreate 修改
    btnTitle : string = '';
    
    test : number;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                //编辑
                console.log('1111');
                this.isCreate = false;
                this.title = '编辑帐号';
                this.btnTitle = '编辑';
            }else{
                //创建
                console.log('2222');
                this.isCreate = true;
                this.title = '创建帐号';
                this.btnTitle = '创建';

                this.service.getRole()
                .then(
                    res => {
                        return res;
                    }
                )
                .then(
                    role => {
                        return this.service.getOrg().then(org => {
                            console.log('role',role);
                            console.log('org',org)
                        })
                    }
                ).catch(
                    err => {
                        console.error(err);
                    }
                )
            }
        });
    }
    //绑定角色
    bindRole(){
        this.initRole();
        console.log('bindRole');
    }

    //角色重置
    initRole(){
        console.log('initRole');
    }

    //创建
    create(){
        console.log(this.test);
    }
    
} 