import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent ,PopupComponent} from '../../../../architecture';

import { OrgMngCrComponent } from './org-mng-cr.component';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org, OrgPer } from '../model/org-mng.org.model';
import { EntResource } from '../model/ent-resource-obj.model';


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
  editId:string;
  percent:string='20%';
  setPercent(arg){
    let styles={width:this.percent}      
      return styles;
  }
  //企业资源对象
  entResourceObj:EntResource;
  ngOnInit() {
    this.entResourceObj=new EntResource();
    this.service.getCurEntId();
    this.getOrgs(0, this.pp);
    this.service.getNoMngUser();
    this.entResourceObj=this.service.entResourceObj;
    console.log('qiyeresource',this.entResourceObj);
  }

  //获取企业资源  
  getOrgs(page: number, size: number) {
    this.service.getOrg(page, size).then(
      res => {
        this.orgs = res.resultContent;
        let pageInfo = res.pageInfo;
        this.tp = pageInfo.totalPage;
        console.log(this.orgs);
      }
    ).catch(
      err => {
        console.error(err);
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
                this.notice.open('操作错误', '组织状态已启用')
                return;
        }
        this.confirmTitle = "启用部门";
        this.confirmMessage = "您选择启用"+org.name+"，请确认";
        this.confirmDialog.open();
        this.confirmType = type;
        break;
      case 'edit':
        this.isEdit = true;
        this.temporary=false;
        window.setTimeout(()=>{
          this.creOrgPop.open('编辑部门');
          this.temporary=true;          
        },0);
        this.editId=org.id;
        break;
      case 'delete':
       if (org.status == 1) {
                this.notice.open('操作错误', '不能删除启用状态下的组织')
                return;
        }
        console.log('删除');
        this.confirmTitle = "删除部门";
        this.confirmMessage = "您选择删除"+org.name+"，请确认。如果确认，部门将删除且该部门中的用户将被移除";
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
        this.confirmMessage = "您选择禁用"+org.name+"，请确认。如果确认，机构成员将无法操作相关资源";
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
   temporary:boolean=false//刷新弹出框组件
  openCreate() {
    console.log('create');
    
    this.isEdit = false;
    this.temporary=false;
        window.setTimeout(()=>{
          this.creOrgPop.open('创建部门');
          this.temporary=true;          
        },0);
    // $('#crModel').modal('show');
   
  };
  //弹出框 点击确认
  createOrg() {
    this.crModel.save().then(res => {
                    console.log(res);
                    if (res == false)
                        return;
                    // $('#crModel').modal('hide');

                    this.creOrgPop.close();
                    this.getOrgs(0, 10);
                }
            ).catch(err=>{
                console.error(err);
            });;
    if (this.isEdit) {
      console.log('edit');
    } else {
      console.log('create');
    }
    
  }
  ccf(){}
}
