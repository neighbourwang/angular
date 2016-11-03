import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

@Component({
  selector: 'account-mng-cr-ad',
  templateUrl: '../template/account-mng-cr-ad.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrAdComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  save (){
    console.log('test');
  }
  
}
