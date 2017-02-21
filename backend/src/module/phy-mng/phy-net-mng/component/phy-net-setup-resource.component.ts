import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent } from '../../../../architecture';

//Model
import { PhyNetListModel } from '../model/phy-net.model';

//service
//import { VmwareImgEntSetupService } from '../service/vmware-img-ent-setup.service';
//import { VmwareImgDictService } from '../service/vmware-img-dict.service';

@Component({
    selector: "phy_net_setup_resource",
    templateUrl: "../template/phy_net_setup_resource.html",
    styleUrls: [],
    providers: []
}
)
export class PhyNetSetupResourceComponent implements OnInit {

    constructor(
        private router: Router,
        //private dictService: VmwareImgDictService,
        //private entService: VmwareImgEntSetupService,
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

    first_step:boolean = true;
    second_step:boolean = false;

    
    ngOnInit() {
        this.first_step = true;
        this.second_step = false;
    }

    close(): void {
        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
    }

    next(): void {

    }

    previous(): void {

    }

    save(): void {
        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
    }


}