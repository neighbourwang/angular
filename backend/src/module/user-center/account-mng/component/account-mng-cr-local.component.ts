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
    
    isCreate : boolean = false;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            if(params['id']){
                //编辑
                console.log('1111');
                this.isCreate = false;
            }else{
                //创建
                console.log('2222');
                this.isCreate = true;
            }
        });
    }
    
} 