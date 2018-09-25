import { Component,OnInit } from '@angular/core';

import { RoleMngService } from '../service/role-mng.service';
import { Role } from '../model/role';

@Component({
    selector: 'role-mng-list',
    templateUrl: '../template/role-mng-list.component.html',
    styleUrls: [],
    providers: []
})
export class RoleMngListComponent{
        constructor(
        private service : RoleMngService
        ) { }

        page : number = 0;
        size : number = 10;

        roles : Array<Role> = new Array<Role>();

        ngOnInit(){
            this.service.getRoleList(this.page , this.size).then(
                res => {
                    console.log(res);
                    this.roles = res.resultContent;
                }
            ).catch(
                err => {
                    console.error(err);
                }
            )
        }
} 