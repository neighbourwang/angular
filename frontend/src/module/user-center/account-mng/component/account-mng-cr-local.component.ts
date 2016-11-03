import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

@Component({
  selector: 'account-mng-cr-local',
  templateUrl: '../template/account-mng-cr-local.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrLocalComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }
  
}
