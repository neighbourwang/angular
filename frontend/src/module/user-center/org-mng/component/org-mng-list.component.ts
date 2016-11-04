import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

import { OrgMngCrComponent } from './org-mng-cr.component';



@Component({
  selector: 'org-mng-list',
  templateUrl: '../template/org-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngListComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}


  confirmTitle : string;
  confirmMessage : string;
  confirmType : number; // 0 启用 1 禁用 2 删除
  isEdit : boolean = false;

  @ViewChild('confirm')
  private confirmDialog: ConfirmComponent;

  @ViewChild('crModel')
  private crModel : OrgMngCrComponent;


  ngOnInit() {
    
  }


  confirmOk(){
    switch(this.confirmType){
      case 0 :
        console.log('启用');
        break;
      case 1 : 
        console.log('禁用');
        break;
      case 2 :
        console.log('删除');
    }
  }

  //启用
  enable(){
    this.confirmTitle = "启用部门";
    this.confirmMessage = "您选择启用xxx，请确认";
    this.confirmDialog.open();
    this.confirmType = 0;
  }

  //禁用
  disable(){
    this.confirmTitle = "禁用部门";
    this.confirmMessage = "您选择禁用xxx，请确认。如果确认，机构成员将无法操作相关资源";
    this.confirmDialog.open();
    this.confirmType = 1;
  }

  //删除
  delete (){
    this.confirmTitle = "删除部门";
    this.confirmMessage = "您选择删除xxx，请确认。如果确认，部门将删除且该部门中的用户将被移除";
    this.confirmDialog.open();
    this.confirmType = 2;
  }

  //编辑
  openEdit (){
    console.log('edit');
    this.isEdit = true;
    $('#crModel').modal('show')
  }

  //创建
  openCreate (){
    console.log('create');
    this.isEdit = false;
    $('#crModel').modal('show')
  }
  // 弹出框 点击确认
  updata(){
    this.crModel.save();
    if(this.isEdit){
      console.log('edit');
    }else{
      console.log('create');
    }
    $('#crModel').modal('hide');
  }

  
}
