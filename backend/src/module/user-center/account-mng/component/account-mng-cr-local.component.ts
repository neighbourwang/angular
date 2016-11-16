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
    
    page : number = 0;
    size : number = 10;

    role : Array<any> = new Array<any>();
    org : Array<any> = new Array<any>();

    loadMode : boolean = true;

    accountId : string;


    account : any = {
        userName : '',
        loginName : '',
        phone : '',
        description : '',
        isLeader : 0,
        roles : [],
        organizations : [
            {
                name : ''
            }
        ]
    };

    ngOnInit() {
        console.log( this.route.params,2123123123)
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                console.log('params',params['id']);
                this.accountId = params['id'];

                //编辑
                this.isCreate = false;
                this.title = '编辑帐号';
                this.btnTitle = '编辑';

                this.service.getRole()
                .then(
                    role => {
                        this.role = role.resultContent;
                    }
                )
                .then(
                    role => {
                        return this.service.getOrg(this.page,this.size).then(org => {
                            this.org = org.resultContent;
                        })
                    }
                ).then(
                    res => {
                        this.service.getAccountById(params['id']).then(
                    res => {
                        this.account = res.resultContent;
                        console.log(this.account);
                        
                        for(let role of this.role){
                            for(let account of this.account.roles){
                                if(role.id == account.id){
                                    role.selected = true;
                                    break;
                                }
                            }
                        }

                        for(let org of this.org){
                            for(let organizations of this.account.organizations){
                                if(org.id == organizations.id){
                                    org.selected = true;
                                    break;
                                }
                            }
                        }
                    }
                )
                    }
                )
                .catch(
                    err => {
                        console.error(err);
                    }
                )
            }else{
                //创建
                this.isCreate = true;
                this.title = '创建帐号';
                this.btnTitle = '创建';
                this.service.getRole()
                .then(
                    role => {
                        this.role = role.resultContent;
                    }
                )
                .then(
                    role => {
                        return this.service.getOrg(this.page,this.size).then(org => {
                            this.org = org.resultContent;
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


    

    //创建
    create(){
        if(!this.isCreate){
            this.service.editAccount(this.accountId , this.account).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.error(err);
                }
            )
        }else{
            this.service.createAccount(this.account).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.error(err);
                }
            )
        }
    }

    //点击更多
    loadModeOrg (){
        if(this.loadMode){
            this.size += 10;
            this.service.getOrg(this.page , this.size).then(
            org => {
                this.org = org.resultContent;
                for(let org of this.org){
                            for(let organizations of this.account.organizations){
                                if(org.id == organizations.id){
                                    org.selected = true;
                                    break;
                                }
                            }
                        }
                if(org.pageInfo.totalRecords <= this.size){
                    this.loadMode = false;
                }
            }
        )
        }else{
            console.error('没有更多');
        }
        
    }

    isLeader(){
        if(this.account.isLeader == 0){
            this.account.isLeader = 1
        }else{
            this.account.isLeader = 0;
        }
    }

    addRole(item){
        let obj = {
            id : item
        }
        if(this.account.roles.includes(obj)){
            this.remove(this.account.roles , obj);
        }else{
            this.account.roles.push(obj);
        }
    }

    addOrg(item){
        let obj = {
            id : item.id,
            name : item.name
        }
        if(!(this.account.organizations.includes(obj))){
            this.account.organizations[0] = obj;
        }
    }
    remove(arr ,obj){
    for(var i =0;i <arr.length;i++){
        var temp = arr[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <arr.length;j++){
            arr[j]=arr[j+1];
            }
            arr.length = arr.length-1;
        }
        }
    }
    
} 