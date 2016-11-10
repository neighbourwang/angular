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

    org : Array<Org> = new Array<Org>();
    // 平台数据总页数
    tp:number = 0;
    // 每页显示的数据条数
    pp:number = 10;
    ngOnInit() {
        this.getOrg(0 , this.pp);
    }

   

    create(){
        this.router.navigateByUrl('user-center/org-mng/org-mng-cr');
    }

    getOrg(page : number , size : number){
        this.service.getOrg(page,size).then(
            res => {
                this.org = res.resultContent;
                let pageInfo = res.pageInfo;
                this.tp = pageInfo.totalPage;
                console.log(this.org);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }

    paging(page){
        this.getOrg(page, 10);
    }





} 