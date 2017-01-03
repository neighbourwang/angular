import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

import { OrgMngCrComponent } from './org-mng-cr.component';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org, OrgPer } from '../model/org-mng.org.model';
@Component({
  selector: 'org-mng-list',
  templateUrl: '../template/org-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngListComponent implements OnInit {
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: OrgMngService
  ) { }

  @ViewChild('confirm')
  private confirmDialog: ConfirmComponent;

  @ViewChild('notice')
  private notice: NoticeComponent;

  @ViewChild('creOrgPop')
  private creOrgPop: PopupComponent;

  @ViewChild('crModel')
  private crModel: OrgMngCrComponent;

  // 机构列表
  orgs: Array<Org> = new Array<Org>();
  // 被选中的当前机构
  org: Org = new Org();
  // 平台数据总页数
  tp: number = 0;
  // 每页显示的数据条数
  pp: number = 10;

  // confirm 的头部 
  confirmTitle: string;
  // confirm 的内容
  confirmMessage: string;
  // confirm 的类型 判断是 禁用 启用 删除
  confirmType: string;
  confirmOrg: OrgPer;
  isEdit: boolean = false;
  editId: string;
  percent: string = '20%';
  curEntId: string;
  // entResourceObj: EntResource=new EntResource();
  //企业资源对象
  ngOnInit() {
    this.service.getCurEntId().then(() => {
      this.getOrgs(0, this.pp);
    });
    
  }
  //获取组织列表
  getOrgs(page: number, size: number) {
    this.layoutService.show();
    this.service.getOrg(page, size).then(
      res => {
        this.orgs = res.resultContent;
        let pageInfo = res.pageInfo;
        this.tp = pageInfo.totalPage;
        console.log(this.orgs);
        this.layoutService.hide();
      }
    ).catch(
      err => {
        console.error(err);
        this.layoutService.hide();
      }
      )
  }
  
  paging(page) {
    this.getOrgs(page, 10);
  }
  statusChange(org, type) {
    console.log(org)
    console.log(type)
    this.confirmOrg = org;
    switch (type) {
      case 'start':
        console.log('启用');
        if (org.status == 1) {
          this.notice.open('ORG_MNG_LIST.OPERATION_ERROR', 'ORG_MNG_LIST.ORGANIZATIONAL_STATUS_IS_ENABLED')
          return;
        }
        this.confirmTitle = "ORG_MNG_LIST.ENABLE_DEPARTMENT";
        this.confirmMessage = "ORG_MNG_LIST.YOU_CHOOSE_TO_ENABLE_VALUE_PLEASE_CONFIRM^^^" + org.name;
        this.confirmDialog.open();
        this.confirmType = type;
        break;
      case 'edit':
        this.isEdit = true;
        this.temporary = false;
        window.setTimeout(() => {
          this.creOrgPop.open('ORG_MNG_LIST.EDIT_DEPARTMENT');
          this.temporary = true;
        }, 0);
        this.editId = org.id;
        break;
      case 'delete':
        if (org.status == 1) {
          this.notice.open('ORG_MNG_LIST.OPERATION_ERROR', 'ORG_MNG_LIST.YOU_CAN_NOT_DELETE_ORGANIZATIONS_THAT_ARE_ENABLED')
          return;
        }
        console.log('删除');
        this.confirmTitle = "删除部门";
        this.confirmMessage = "您选择删除" + org.name + "，请确认。如果确认，部门将删除且该部门中的用户将被移除";
        this.confirmDialog.open();
        this.confirmType = type;
        break;
      case 'disabled':
        if (org.status == 5) {
          this.notice.open('操作错误', '该组织状态已禁用');
          return;
        }
        console.log('禁用');
        this.confirmTitle = "禁用部门";
        this.confirmMessage = "您选择禁用" + org.name + "，请确认。如果确认，机构成员将无法操作相关资源";
        this.confirmDialog.open();
        this.confirmType = type;
    }
  }
  //确认操作
  confirmOk() {
    switch (this.confirmType) {
      case 'start':
        this.service.enableOrg(this.confirmOrg.id).then(
          res => {
            console.log(res);
            this.getOrgs(0, 10);
          }
        ).catch(
          err => {
            console.error(err);
          }
          )
        break;
      case 'delete':
        this.service.deleteOrg(this.confirmOrg.id).then(
          res => {
            console.log(res);
            this.getOrgs(0, 10);
          }
        ).catch(
          err => {
            console.error(err);
          }
          )
        break;
      case 'disabled':
        this.service.disableOrg(this.confirmOrg.id).then(
          res => {
            console.log(res);
            this.getOrgs(0, 10);
          }
        ).catch(
          err => {
            console.error(err);
          }
          )
    }
  }

  //创建
  temporary: boolean = false//刷新弹出框组件
  openCreate() {
    console.log('create');
    this.isEdit = false;
    this.temporary = false;
    window.setTimeout(() => {
      this.creOrgPop.open('创建部门');
      this.temporary = true;
    }, 0);
  };
  //弹出框 点击确认
  createOrg() {
    this.crModel.save().then(res => {
      console.log(res);
      if (res == false)
        return;
      //刷新企业资源
      this.service.getCurEntResource(this.service.curEntId);
      this.creOrgPop.close();
      this.getOrgs(0, 10);

    }
    ).catch(err => {
      console.error(err);
    });;
    
  }
  ccf() { }
}
