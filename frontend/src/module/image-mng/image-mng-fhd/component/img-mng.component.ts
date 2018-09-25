import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent } from "../../../../architecture";


@Component({
    selector: "img-mng",
    templateUrl: "../template/img-mng.html",
    styleUrls: ["../style/img-mng.less"],
    providers: []
})
export class ImgMngComponent_fhd implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {

    }


    ngOnInit() {
        this.layoutService.show();

    }
     
}