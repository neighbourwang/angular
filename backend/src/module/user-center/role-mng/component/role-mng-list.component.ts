import { Component,OnInit } from '@angular/core';

import { RoleMngService } from '../service/role-mng.service';

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

        ngOnInit(){
            this.service.getRoleList(this.page , this.size).then(
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