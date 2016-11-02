import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

import { OrgMngService } from '../service/org-mng.service';

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
    ngOnInit() {

    }

    create(){
        this.router.navigateByUrl('user-center/org-mng/org-mng-cr');
    }


} 