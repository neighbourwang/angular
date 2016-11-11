import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

//model
import { Org } from '../model/org';
@Component({
    selector: 'org-mng-list',
    templateUrl: '../template/org-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class OrgMngListComponent implements OnInit{
    constructor(
        private router : Router,
        private service : OrgMngService
        ) { }

    @ViewChild('confirm')
    private confirm : ConfirmComponent;
    
    // 机构列表
    orgs : Array<Org> = new Array<Org>();
    // 被选中的当前机构
    org : Org = new Org();
    // 平台数据总页数
    tp:number = 0;
    // 每页显示的数据条数
    pp:number = 10;
   
    // confirm 的头部 
    confirmTitle : string;
    // confirm 的内容
    confirmMessage : string;
    // confirm 的类型 判断是 禁用 启用 删除
    confirmType : number;

    ngOnInit() {
        this.getOrg(0 , this.pp);
    }

   

    create(){
        this.router.navigateByUrl('user-center/org-mng/org-mng-cr');
    }

    getOrg(page : number , size : number){
        this.service.getOrg(page,size).then(
            res => {
                this.orgs = res.resultContent;
                let pageInfo = res.pageInfo;
                this.tp = pageInfo.totalPage;
                console.log(this.orgs);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    paging(page){
        this.getOrg(page-1, 10);
    }

    chooseItem(index :number){
        this.org = this.orgs[index];
    }

    delete(){
        if(!this.org){
            this.confirmTitle = "删除机构";
            this.confirmMessage = "";
        }else{
            console.error('没有对象');
        }
    }

    of(){

    }   

    cf(){

    }





} 