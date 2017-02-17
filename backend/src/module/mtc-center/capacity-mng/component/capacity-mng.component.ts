import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { CapacityMngService } from "../service/capacity-mng.service";


@Component({
    selector: "capacity-mng",
    templateUrl: "../template/capacity-mng.html",
    styleUrls: [],
    providers: []
})
export class CapacityMngComponent implements OnInit {
    constructor(
        private service: CapacityMngService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    ngOnInit() {
        
    }

    gotoComputeRes() {
        this.router.navigate([`mtc-center/capacity-mng/compute-res`]);
    }

    gotoStoreRes() {
        this.router.navigate([`mtc-center/capacity-mng/store-res`]);   
    }
}