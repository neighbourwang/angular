import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

//service
import { AccountMngService } from '../service/account-mng-list.service';

@Component({
    selector: 'account-mng',
    templateUrl: '../template/account-mng-list.component.html',
    styleUrls: [
    ],
    providers: []
})
export class AccountMngComponent implements OnInit{
    constructor(private service: AccountMngService) { }

  ngOnInit() {
  }
} 