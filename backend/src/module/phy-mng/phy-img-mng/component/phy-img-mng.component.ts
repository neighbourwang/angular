import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent } from '../../../../architecture';

//model

//service

@Component({
    selector: "phy-img-mng",
    templateUrl: "../template/physical_image.html",
    styleUrls: [],
    providers: []
}
)
export class PhyImgMngComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute
    ) {
        /*
        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
        } else {
            this.showMsg('HOST_VMWARE_MNG.MUST_CHOOSE_PLATFORM');
        }
        */
    }
    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("testbox")
    testbox: SelectboxComponent;

    noticeTitle = "";
    noticeMsg = "";

    
    ngOnInit() {
    }


}