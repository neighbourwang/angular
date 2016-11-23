import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

import { AccountMngCrAdComponent } from './account-mng-cr-ad.component';

import { AccountMngService } from '../service/account-mng.service';

import { Account } from '../model/account';

@Component({
  selector: 'account-mng-list',
  templateUrl: '../template/account-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class AccountMngListComponent implements OnInit {
  
  @ViewChild('crAd')
  private crAd: AccountMngCrAdComponent;

  @ViewChild('confirm')
  private confirm : ConfirmComponent;
  
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service : AccountMngService
  ) {}

  ngOnInit() {
    this.service.getAccountList(this.page , this.size).then(
      res => {
        console.log(res);
        this.accounts = res.resultContent;
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }
  //关键字搜索
  keyword : string;
  //判断 修改 还是 新建
  isEdit : boolean;
  //confirm得title
  confirmTitle : string = '';
  //confirm得信息
  confirmMessage : string = '';
  //获取当前得confirm类型 判断操作
  confirmType : number ;

  page : number = 0;
  size : number = 10;

  accounts : Array<Account> = new Array<Account>();

  accountId : string;

  //保存
  save (){
    this.crAd.save().then(
      res => {
        console.log(res);
        $('#crModel').modal('hide');
      }
    ).catch(
      err => {
        console.error('err');
      }
    )
    
  }
  //搜索
  search(){
    console.log('seach',this.keyword);
  }

  //创建
  create(){
    this.isEdit = false;
    $('#crModel').modal('show');
  }

  //修改
  edit(){
    this.isEdit = true;
    $('#crModel').modal('show');
  }
  //启用
  enable (accountId,index){
    this.confirmTitle = '启用帐号';
    let accountName = this.accounts[index].userName;
    this.accountId = this.accounts[index].id;
    this.confirmMessage = '您选择启用'+accountName+'，请确认';
    this.confirmType = 1;
    this.confirm.open();
  }

  //禁用
  disable (accountId,index){
    this.confirmTitle = '禁用帐号';
    let accountName = this.accounts[index].userName;
    this.accountId = this.accounts[index].id;
    this.confirmMessage = '您选择禁用'+accountName+'，请确认。如果确认，机构成员将无法操作相关资源';
    this.confirmType = 2;
    this.confirm.open();

  }
  //删除
  delete (accountId,index){
    this.confirmTitle = '删除帐号';
    let accountName = this.accounts[index].userName;
    this.accountId = this.accounts[index].id;
    this.confirmMessage = '您选择删除'+accountName+'，请确认。如果确认，部门将被删除且该部门中的用户将被移除。';
    this.confirmType = 3;
    this.confirm.open();
  }

  confirmOk (){
    switch(this.confirmType){
      case 1 : 
        console.log('启用');
        this.enableAcc();
        break;
      case 2 :
        console.log('禁用');
        this.disableAcc();
        break;
      case 3 :
        console.log('删除');
        this.deleteAcc();
        break;
    }
  }

  enableAcc(){
    this.service.enableAcc(this.accountId).then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }

  disableAcc(){
    this.service.disableAcc(this.accountId).then(
      res => {
        console.log(res)
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }

  deleteAcc(){
    this.service.deleteAcc(this.accountId).then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.error(err);
      }
    )
  }

  
}
