import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

//service
import { AccountMngService } from '../service/account-mng-list.service';

@Component({
    selector: 'account-mng-list',
    templateUrl: '../template/account-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class AccountMngComponent implements OnInit{
    constructor(
        private service: AccountMngService,
        private router : Router
        ) { }

    @ViewChild('crAccountModel')
    crAccountModel: PopupComponent;
    ngOnInit() {

    }
  
    authenticationSourceList = [
        {
            id : 1,
            name : '本地'
        },
        {
            id : 2,
            name : 'AD'
        }
    ];

    authenticationSource : number = 1;

    openCrAccountPop(){
        this.crAccountModel.open();
    }

    crAccount(){
        console.log(this.authenticationSource);
        if(this.authenticationSource == 1){
            this.router.navigate(['/user-center/account-mng/account-mng-cr-local/']);
        }
        
    }
} 