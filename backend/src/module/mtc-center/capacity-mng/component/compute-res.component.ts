import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { ComputeResService } from "../service/compute-res.service";


@Component({
    selector: "compute-res",
    templateUrl: "../template/compute-res.html",
    styleUrls: [],
    providers: []
})
export class ComputeResComponent implements OnInit {
    constructor(
        private service: ComputeResService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    ngOnInit() {
        
    }

    gotoHostDtail() {
         this.router.navigate([`mtc-center/capacity-mng/host-detail`]);
    }

    BacktoCapacityMng(){
        this.router.navigate([`mtc-center/capacity-mng/capacity-mng`]);
    }
}