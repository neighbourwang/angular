import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService } from '../../../../architecture';

import { Admin } from '../model/admin.model';

import { EntAdminMngService } from '../service/ent-admin-mng.service';




@Component({
    selector: 'ent-admin-cre',
    templateUrl: '../template/ent-admin-mng.html',
    styleUrls: [],
    providers: []
})

export class EntAdminMngComponent implements OnInit {

     key:String ="";
     pageIndex:Number=0;
     pageSize:Number=20;
    constructor(
        private service: EntAdminMngService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ){}

    admins:Admin[];

    ngOnInit() {
        
        this.service.getAdminByKey(this.key).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                   /* 
                   let resultContent = response["resultContent"];
                    this.resSync.zonesCount = resultContent["zonesCount"];
                    this.resSync.storagesCount = resultContent["storagesCount"];
                    this.resSync.flavorsCount = resultContent["flavorsCount"];
                    this.resSync.regionsCount = resultContent["regionsCount"];
                    this.resSync.imagesCount = resultContent["imagesCount"];
                    */
                } else {
                    alert("Res sync error");
                }
            }
        ).catch(this.onRejected);
    }

    gotoCreatePage(): void {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-cre");
    }

    showError(title: string, msg: string) {
        alert(msg);
    }

   
  
    onRejected(reason: any) {
        alert(reason);
    }
}
