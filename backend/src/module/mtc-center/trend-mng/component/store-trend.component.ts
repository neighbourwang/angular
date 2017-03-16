import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { StoreTrendService } from "../service/store-trend.service";


@Component({
    selector: "store-trend",
    templateUrl: "../template/store-trend.html",
    styleUrls: [],
    providers: []
})
export class StoreTrendComponent implements OnInit {
    constructor(
        private service: StoreTrendService ,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

   
    ngOnInit() {
        
    }

    

   
}