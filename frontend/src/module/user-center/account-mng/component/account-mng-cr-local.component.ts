import { Component, OnInit, Input, OnChanges, SimpleChanges ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
//service
import { AccountMngService } from '../service/account-mng.service';
import { PutLocalAccService } from '../../person-acc-mng/service/person-acc-put.service';
//model
import { Account, Role, Organization } from '../model/account.model'

@Component({
  selector: 'account-mng-cr-local',
  templateUrl: '../template/account-mng-cr-local.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngCrLocalComponent implements OnInit, OnChanges {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: AccountMngService,
    private putLocalAccService: PutLocalAccService
  ) { }

  @Input()
  isEdit: boolean;
  @Input()
  editId: string;

  @ViewChild('accountForm')
  'accountForm':NgForm;

  account = new Account();
  roles: Array<Role>;
  orgs: Array<Organization>;
  active:boolean;
  ngOnInit() {
        
    console.log(this.editId);
    //获取所有角色
    this.service.getRoleList().then(
      res => {
        console.log('角色', res);
        this.roles = res.resultContent;
      }
    ).catch(err => {
      console.error(err);
    })
    //获取所有机构
    this.service.getOrgList().then(
      res => {
        console.log('机构', res);
        this.orgs = res.resultContent;
      }
    ).catch(err => {
      console.error(err);
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.editId);
    if (this.isEdit) {
      this.service.getLocalAcc(this.editId).then(
        res => {
          console.log('账号', res);
          this.account = res.resultContent;
        }
      ).catch(err => {
        console.error(err);
      })
    }
  }



  //选择角色
  selectRole(idx) {
    console.log(idx);
    this.roles.forEach(ele => {
      ele.selected = false;
    });
    this.roles[idx].selected = true;
    this.account.roles = this.roles.filter(ele => {
      if (ele.selected) {
        return ele;
      }
    })
    console.log(this.account.roles);
  }
  //选择部门
  selectOrg(idx) {
    console.log(idx);
    this.orgs.forEach(ele => {
      ele.selected = false;
    });
    this.orgs[idx].selected = true;
    this.account.organizations = this.orgs.filter(ele => {
      if (ele.selected) {
        return ele;
      }
    })
    console.log(this.account.organizations);
  }
  save() {
    console.log(this.account);
    if(this.accountForm.invalid){
        return Promise.reject('error');
    }else if(this.isEdit){
        return this.service.editAccount(this.editId,this.account);
    }else{
        return this.service.createAccount(this.account)
    }   
    
  }
}
