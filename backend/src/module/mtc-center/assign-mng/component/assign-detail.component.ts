import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { AssignDetailService } from "../service/assign-detail.service";


@Component({
    selector: "assign-detail",
    templateUrl: "../template/assign-detail.html",
    styleUrls: [],
    providers: []
})
export class AssignDetailComponent implements OnInit {
    constructor(
        private service: AssignDetailService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    ngOnInit() {
        
    }

    
   
}