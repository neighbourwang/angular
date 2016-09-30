import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService } from '../../../../architecture';

import { EntAdminCreService} from '../service/ent-admin-cre.service';


@Component({
    selector: 'ent-admin-cre',
    templateUrl: '../template/ent-admin-cre.html',
    styleUrls: [],
    providers: []
})

export class EntAdminCreComponent implements OnInit {

     mngId:String ="";

    constructor(
        private service: EntAdminCreService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["mng-id"]) {
            this.mngId = activatedRouter.snapshot.params["mng-id"];
        }
    }



    ngOnInit() {
        
        this.service.getAdminById(this.mngId).then(
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

    showError(title: string, msg: string) {
        alert(msg);
    }

   
   create():void{

   }

   cancel():void{
         this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
   }
  
    onRejected(reason: any) {
        alert(reason);
    }
}
