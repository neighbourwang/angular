import { Component, ViewChild, OnInit } from '@angular/core';

//service
import { AccountMngService } from '../service/account-mng-list.service';

@Component({
    selector: 'account-mng-cr-ad',
    templateUrl: '../template/account-mng-cr-ad.component.html',
    styleUrls: [],
    providers: []
})
export class AccountMngCrAd implements OnInit{
    constructor(
        private service: AccountMngService,
        ) { }
    
    
    ngOnInit() {
    }
    
} 