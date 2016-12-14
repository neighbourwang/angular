import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

// import { Account } from '../model/account';
// import { PlatForm } from '../model/platform';
//model
import { Org, Member, Platform } from '../model/org.model';


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
        private service : OrgMngService,
        private layoutService : LayoutService
        ) { }


    @ViewChild('notice')
    private notice: NoticeComponent;


    title: string;
    btnName : string;
    isCreate : boolean;

    size : number = 10;

    more : boolean  = false;

    account : Array<Member> = new Array<Member>();
    platForm : Array<Platform> = new Array<Platform>();

    accountByOrg : Array<Member> = new Array<Member>();

    orgId : string ;


    org : Org=new Org;
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                //编辑
                this.title = '编辑机构';
                this.btnName = '编辑';
                this.isCreate = false;
                this.orgId = params['id'];
                this.layoutService.show()
                this.service.getOrgById(params['id']).then(
                    res => {
                        console.log('getOrgById',res);
                        this.org = res.resultContent;

                        this.service.getNoMngUser(0,this.size).then(
                            res => {
                                console.log('getNoMngUser',res)
                                this.account = res.resultContent;
                                if(res.pageInfo.totalRecords <= this.size){
                                    this.more = false;
                                }else{
                                    this.more = true;
                                }

                                this.service.getUserByOrg(params['id']).then(
                                    res => {
                                        console.log('getUserByOrg',res);
                                        this.accountByOrg = res.resultContent;
                                        for(let account of this.accountByOrg){
                                            account.selected = true;
                                            this.account.unshift(account);
                                        }
                                        this.layoutService.hide();
                                    }
                                ).catch(
                                    err => {
                                        console.error(err);
                                         this.layoutService.hide();
                                    }
                                )
                            }
                        ).catch(
                            err => {
                                console.error(err);
                                 this.layoutService.hide();
                            }
                        )

                        

                        this.service.getNoMngPlatForm().then(
                            res => {
                                console.log('getNoMngPlatForm',res);
                                this.platForm = res.resultContent;
                                for(let platform of this.platForm){
                                    for(let orgPlatForm of this.org.platforms){
                                    if(orgPlatForm.id == platform.id){
                                        platform.selected=true;
                                    }
                                    // this.platForm.unshift(orgPlatForm);
                                }
                                }
                                 this.layoutService.hide();
                            }
                            
                        ).catch(
                            err => {
                                console.error(err);
                                 this.layoutService.hide();
                            }
                        )
                    }
                ).catch(
                    err => {
                        console.error(err);
                         this.layoutService.hide();
                    }
                )               

            }else{
                //创建
                this.title = '创建机构';
                this.btnName = '创建';
                this.isCreate = true;

                // this.service.getNoMngUser(0,this.size).then(
                //     res => {
                //         console.log('getNoMngUser',res)
                //         this.account = res.resultContent;
                //         if(res.pageInfo.totalRecords <= this.size){
                //             this.more = false;
                //         }else{
                //             this.more = true;
                //         }
                //     }
                // ).catch(
                //     err => {
                //         console.error(err);
                //     }
                // )

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

                        // for(let account of this.accountByOrg){
                        //             account.selected = true;
                        //             this.account.unshift(account);
                        //         }
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
        console.log(item);
        // for(let account of this.org.members){
        //     if(item.id == account.id){
        //         if(!this.isCreate){
        //             this.remove(this.accountByOrg, item);
        //             this.remove(this.org.members , item);
        //         }else{
        //             this.remove(this.org.members , item);
        //         }
        //     }else{
        //         if(!this.isCreate){
        //             this.org.members.push(item);
        //             this.accountByOrg.push(item);
        //         }else{
        //             this.org.members.push(item);
        //         }
        //     }
        // }
        // if(this.org.members.includes(item)){
            
            
        // }else{
        //     if(!this.isCreate){
        //         this.org.members.push(item);
        //         this.accountByOrg.push(item);
        //     }else{
        //         this.org.members.push(item);
        //     }
        // }
        item.selected=!item.selected;
        this.org.members=this.account.filter((ele)=>{
            if(ele.selected==true){
                return ele;
            }
        })
        console.log(this.org.members);
    }

    choosePlatForm(item){
        // if(this.org.platforms.includes(item)){
        //     this.remove(this.org.platforms , item);
        // }else{
        //     this.org.platforms.push(item);
        // }
        item.selected=!item.selected;
        this.org.platforms=this.platForm.filter((ele)=>{
            if(ele.selected==true){
                return ele;
            }
        })
        console.log(this.org.platforms);
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

    create(){
        if(!this.org.name){
            this.notice.open('操作错误','机构名称不能为空');
            return;
        }
         this.layoutService.show();
        if(this.isCreate){
            this.service.createOrg(this.org).then(
                res => {
                    console.log(res);
                    this.layoutService.hide();
                     this.router.navigateByUrl('user-center/org-mng/org-mng-list');
                }
            ).catch(
                err => {
                    console.error(err);
                    this.layoutService.hide();
                }
            )    
        }else{
            console.log(this.org);
            this.service.editOrg(this.orgId,this.org).then(
                res => {
                    console.log(res);
                    this.layoutService.hide();
                     this.router.navigateByUrl('user-center/org-mng/org-mng-list');
                }
            ).catch(
                err => {
                    console.error(err);
                    this.layoutService.hide();
                }
            )
        }
        
    }

cancel(){
    this.router.navigateByUrl('user-center/org-mng/org-mng-list');
}

nof(){}
    

} 