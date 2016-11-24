import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { AccountMngService } from '../service/account-mng.service';

import { Account, Role } from '../model/account.model'

@Component({
  selector: 'account-mng-cr-local',
  templateUrl: '../template/account-mng-cr-local.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrLocalComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: AccountMngService
  ) { }

  @Input()
  isEdit: boolean;
  account = new Account();
  roles: Array<Role>;
  ngOnInit() {
    this.service.getRoleList().then(
      res => {
        console.log(res);
        this.roles = res.resultContent;
      }
    ).catch(err => {
      console.error(err);
    })
  }
  //选择角色
  selectRole(idx) {
    console.log(idx);
    this.roles[idx].selected = !this.roles[idx].selected;
    this.account.roles = this.roles.filter(ele => {
      if (ele.selected) {
        return ele;
      }
    })
    console.log(this.account.roles);
  }
}
