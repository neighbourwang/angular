import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

import { Account } from '../model/account';
import { PlatForm } from '../model/platform';


@Component({
    selector: 'org-mng-cr',
    templateUrl: '../template/org-mng-cr.component.html',
    styleUrls: [],
    providers: []
})
export class OrgMngCrComponent implements OnInit{
    constructor(
        private router : Router,
        private route : ActivatedRoute,
        private service : OrgMngService
        ) { }

    title: string;
    btnName : string;
    isCreate : boolean;

    size : number = 10;

    more : boolean  = false;

    account : Array<Account> = new Array<Account>();
    platForm : Array<PlatForm> = new Array<PlatForm>();


    org : any = {
        description : '',
        id : '',
        leaderId : '',
        members : [],
        name : '',
        platforms : []
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                //编辑
                this.title = '编辑机构';
                this.btnName = '编辑';
                this.isCreate = false;
            }else{
                //创建
                this.title = '创建机构';
                this.btnName = '创建';
                this.isCreate = true;

                this.service.getNoMngUser(0,this.size).then(
                    res => {
                        console.log('getNoMngUser',res)
                        this.account = res.resultContent;
                        if(res.pageInfo.totalRecords <= this.size){
                            this.more = false;
                        }else{
                            this.more = true;
                        }
                    }
                ).catch(
                    err => {
                        console.error(err);
                    }
                )

                this.service.getNoMngPlatForm().then(
                    res => {
                        console.log('getNoMngPlatForm',res);
                        this.platForm = res.resultContent;
                    }
                ).catch(
                    err => {
                        console.error(err);
                    }
                )
            }
        });
    }

    loadMoreAccount (){
        if(this.more){
            this.size += 10;
            this.service.getNoMngUser(0,this.size).then(
                    res => {
                        console.log('getNoMngUser',res)
                        this.account = res.resultContent;
                        if(res.pageInfo.totalRecords <= this.size){
                            this.more = false;
                        }else{
                            this.more = true;
                        }
                    }
                ).catch(
                    err => {
                        console.error(err);
                    }
                )
        }else{
            console.error('没有更多');
        }
    }

    chooseAccount (item){
        if(this.org.members.includes(item)){
            this.remove(this.org.members , item);
        }else{
            this.org.members.push(item);
        }
        console.log(this.org.members);
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