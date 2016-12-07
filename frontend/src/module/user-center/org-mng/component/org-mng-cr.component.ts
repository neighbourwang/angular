import { Component, OnInit, Input,ViewChild } from '@angular/core';
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

  org: Org =new Org();
  members: Array<Member>;
  ngOnInit() {   
    //获取机构成员
    this.service.getNoMngUser(1, 10).then(
      res => {
        console.log('getNoMngUser', res);
        this.members = res.resultContent;
      }
    ).catch(
      err => {
        console.error(err);
      }
      )
    if (this.isEdit) {
      console.log('edit 读取接口',this.editId);
      this.service.getOrgById(this.editId).then(res=>{
          console.log(res);
      })
    } else {
      console.log('创建');
       //
      this.org== new Org();
    }
  }
  //选择机构成员
  selectMember(member) {
    console.log(member)
    member.selected = !member.selected;
    this.org.members = this.members.filter(ele => {
      if (ele.selected == true) {
        return ele
      }
    })
    console.log(this.org.members)
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
    this.org.resource[arg] = e;
    console.log(e);

  }
  /////////////////////edit   getUserByOrg

}
