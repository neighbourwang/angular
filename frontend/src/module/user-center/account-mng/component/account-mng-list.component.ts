import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

import { AccountMngCrAdComponent } from './account-mng-cr-ad.component';
// import * as $ from 'jquery';


@Component({
  selector: 'account-mng-list',
  templateUrl: '../template/account-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngListComponent implements OnInit {
  
  @ViewChild('crAd')
  private crAd: AccountMngCrAdComponent;
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  save (){
    this.crAd.save();
    console.log($('#crModel'));
    $('#crModel').modal('hide');
  }
  
}
