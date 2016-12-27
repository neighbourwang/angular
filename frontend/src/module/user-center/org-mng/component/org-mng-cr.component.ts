import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';
//service
import { OrgMngService } from '../service/org-mng.service';
//model
import { Org, Member, Resource } from '../model/org-mng.org.model';
import { EntResource } from '../model/ent-resource-obj.model';

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
  curEntResource:EntResource;
  resource:Resource=new Resource();
  ngOnChanges(changes: SimpleChanges) {
    this.curEntResource=this.service.entResourceObj;
    console.log(this.curEntResource);
    this.org = new Org();
    this.org.resource=new Resource();
    console.log(this.editId);    
    if (this.isEdit) {
      this.getUserList();
      this.getOrgDetail();
      this.org.resource=new Resource();      
      this.service.getOrgResourceById(this.editId)
        .then(
        res => {
          console.log("部门资源", res);
          res.resultContent.usedMem/=1024;
          this.resource = res.resultContent;
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
    this.org.resource=this.resource;
    if(this.orgForm.valid){
      this.org.resource.mem*=1024;
      if(!this.isEdit){
        console.log('new',this.org)
        return this.service.createOrg(this.org)
      }else{
        console.log('edit',this.org)
        return this.service.editOrg(this.editId, this.org);
      }
    }else{
       return Promise.reject("error");
    }
    // 
    
    //  if (this.orgForm.invalid) {
           
    //     } else if (this.isEdit) {
    //         return this.service.editOrg(this.editId, this.org);
    //     } else {
    //         this.service.createOrg(this.org);
    //     }
  }

  //同步countBar数据
  outputValue(e, arg) {
    this.resource[arg]=e;
  }
  /////////////////////edit   getUserByOrg
  
}
