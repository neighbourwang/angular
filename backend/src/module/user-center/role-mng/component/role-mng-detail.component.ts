import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RoleMngService } from "../service/role-mng.service";

@Component({
    selector: 'role-mng-detail',
    templateUrl: '../template/role-mng-detail.component.html',
    styleUrls: [],
    providers: []
})
export class RoleMngDetailComponent implements OnInit{

    constructor(
        private router : Router,
        private route : ActivatedRoute,
        private service : RoleMngService
    ){}

    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            console.log(params['id']);
            this.service.getRoleTree().then(
              res => {
                console.log('getRoleTree',res);

                this.service.getRoleDetail(params['id']).then(
                  res => {
                    console.log('getRoleDetail',res);
                  }
                ).catch(
                  err => {
                    console.error(err);
                  }
                )
              }
            ).catch(
              err => {
                console.error(err);
              }
            )
        });
    }

    options = { isExpandedField: 'false' }
    nodes = [
    {
      name : '运营运维管理门户',
      children : [
        { name : '平台管理' , checked : 'checked'},
        { name : '企业管理' , checked : 'checked'},
        { name : '产品管理' , checked : 'checked'},
        { name : '运营中心' , checked : 'checked'},
        { 
          name : '用户中心' ,
          children : [
            { name : '帐号管理' , checked : 'checked'},
            { name : '组织管理' , checked : 'checked'},
            { 
              name : '角色管理',
              children : [
                { name : '角色管理' , checked : 'checked'},
                { name : '查看角色' , checked : 'checked'}
              ]
            },
            { name : '认证管理' },
            { name : '个人账户管理' }
          ]
        },
        { name : '审批中心' }
      ]
    }]
} 