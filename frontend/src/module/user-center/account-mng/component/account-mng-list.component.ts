import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

@Component({
  selector: 'account-mng-list',
  templateUrl: '../template/account-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngListComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }
  
}
