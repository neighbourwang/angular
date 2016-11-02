import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

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
            }
        });
    }

    

} 