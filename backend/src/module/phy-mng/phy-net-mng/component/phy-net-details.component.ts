import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent } from '../../../../architecture';

//model
import { PhyNetDetailsModel } from '../model/phy-net.model';

//service
import { PhyNetDetailsService } from '../service/phy-net-details.service';

@Component({
    selector: "phy-net-details",
    templateUrl: "../template/phy_net_details.html",
    styleUrls: [],
    providers: []
}
)
export class PhyNetDetailsComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute,
        private service: PhyNetDetailsService
    ) {
        /*
        if (activatedRouter.snapshot.params["pnid"]) {
            this.pnid = activatedRouter.snapshot.params["pnid"];
        } else {
            this.showMsg('HOST_VMWARE_MNG.MUST_CHOOSE_PLATFORM');
        }*/
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

    pn_id: string;

    phynetdetailsinfo: PhyNetDetailsModel = new PhyNetDetailsModel();

    private okCallback: Function = null;
    okClicked() {
        console.log('okClicked');
        if (this.okCallback) {
            console.log('okCallback()');
            this.okCallback();
            this.okCallback = null;
        }
    }

    private confirmedHandler: Function = null;
    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }

    
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["pn_id"] != null) {
                this.pn_id = params["pn_id"];
                console.log(this.pn_id);
            }
        });

        this.getPhyNetInfo();
    }

    getPhyNetInfo(): void {
        this.layoutService.show();
        this.service.getPhyNetInfo(this.pn_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.phynetdetailsinfo.phynet_info.id = response.resultContent.id;
                    this.phynetdetailsinfo.phynet_info.networkName = response.resultContent.networkName;
                    this.phynetdetailsinfo.phynet_info.subnetIP = response.resultContent.subnetIP;
                    this.phynetdetailsinfo.phynet_info.subnetMask = response.resultContent.subnetMask;
                    this.phynetdetailsinfo.phynet_info.gateway = response.resultContent.gateway;
                    this.phynetdetailsinfo.phynet_info.dnsPre = response.resultContent.dnsPre;
                    this.phynetdetailsinfo.phynet_info.dnsAlt = response.resultContent.dnsAlt;
                    this.phynetdetailsinfo.phyres_pools = response.resultContent.resourcePoolList;
                    console.log(this.phynetdetailsinfo, "phynetdetailsinfo!!!");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    phyNetMngPage() {
        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}