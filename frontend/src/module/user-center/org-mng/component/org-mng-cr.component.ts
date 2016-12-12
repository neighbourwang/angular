import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org, Member, Resource } from '../model/org-mng.org.model';

@Component({
  selector: 'org-mng-cr',
  templateUrl: '../template/org-mng-cr.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngCrComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: OrgMngService
  ) { }

  @Input()
  isEdit: boolean;
  @Input()
  editId: string;

  @ViewChild("orgForm")
  'orgForm': NgForm;

  org: Org = new Org();
  members: Array<Member>;
  users:Array<Member>;
  ngOnChanges(changes: SimpleChanges) {
    this.org = new Org();
    console.log(this.editId);    
    if (this.isEdit) {
      this.getUserList();
      this.getOrgDetail();
      this.org.resource=new Resource();      
      this.service.getOrgResourceById(this.editId)
        .then(
        res => {
          console.log("账号资源", res);
          this.org.resource = res.resultContent;
        }
        )
        .catch(err => {
          console.error(err);
        });
    }
  }
  ngOnInit() {    
    
  }
  //获取机构用户for leader列表
  getUserList(){    
    this.service.getUserByOrg(this.editId).then(
      res => {
        console.log('getNoMngUser', res);
         this.users = res.resultContent;
      }
    ).catch(
      err => {
        console.error(err);
      }
      )
  }
  //选择机构成员
  selectMember(member) {
    console.log(member)
    member.selected = !member.selected;
    this.org.members = this.service.members.filter(ele => {
      if (ele.selected == true) {
        return ele
      }
    })
    console.log(this.org.members)
  }
  获取部门详情
  getOrgDetail(){
    this.service.getOrgById(this.editId)
        .then(
        res => {
          console.log("部门基本", res);
          this.org = res.resultContent;
        }
        )
        .catch(err => {
          console.error(err);
        });
  }
  //保存 给父组件调用
  save() {
    console.log(this.org);
    return this.service.createOrg(this.org)
    //  if (this.orgForm.invalid) {
    //         return Promise.reject("error");
    //     } else if (this.isEdit) {
    //         return this.service.editOrg(this.editId, this.org);
    //     } else {
    //         this.service.createOrg(this.org);
    //     }
  }

  //同步countBar数据
  outputValue(e, arg) {
    console.log(arg);
    console.log(e);
    this.org.resource[arg]=e;
  }
  /////////////////////edit   getUserByOrg

}
