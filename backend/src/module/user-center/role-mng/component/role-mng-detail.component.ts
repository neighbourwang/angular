import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RoleMngService } from "../service/role-mng.service";
import { Location } from "@angular/common";
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
        private service : RoleMngService,
        private location : Location
    ){}

    roleTree : any;

    roleDetail : any;


    options = { isExpandedField: 'false' }
    nodes = []

    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            console.log(params['id']);
            this.service.getRoleTree().then(
              res => {
                console.log('getRoleTree',res);
  
                this.roleTree = res.resultContent;

                this.service.getRoleDetail(params['id']).then(
                  res => {
                    console.log('getRoleDetail',res);

                    this.roleDetail = res.resultContent.roleName;
                    // this.roleDetailTree = res.resultContent.menus;
                    this.nodes = res.resultContent.menus;

                    console.log(this.nodes);
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
    //
    back() {
        this.location.back();
    }
} 