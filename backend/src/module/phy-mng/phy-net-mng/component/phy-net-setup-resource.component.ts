import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
    RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService,
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent
} from '../../../../architecture';

//Model
import { PhySetResPmPoolModel, PhySetResPmModel } from '../model/phy-net.model';

//service
import { PhyNetSetupResourceService } from '../service/phy-net-setup-resource.service';

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
        private service: PhyNetSetupResourceService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter: ActivatedRoute
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

    first_step: boolean = true;
    second_step: boolean = false;
    showclosebtn: boolean = false;

    pn_id: string = "";
    pmpool_ids: string = "";

    selectedPmpools: Array<PhySetResPmPoolModel> = [];
    unselectedPmpools: Array<PhySetResPmPoolModel> = [];

    selectedPms: Array<PhySetResPmModel> = [];
    unselectedPms: Array<PhySetResPmModel> = [];

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
        this.first_step = true;
        this.second_step = false;
        this.showclosebtn = false;

        this.getPhyResPmPool();
    }

    getPhyResPmPool(): void {
        this.layoutService.show();
        this.service.getPhyResPmPool(this.pn_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.selectedPmpools = response.resultContent.inUsedPools;
                    this.unselectedPmpools = response.resultContent.noUsedPools;
                    console.log(this.selectedPmpools, "selectedPmpools!!!");
                    console.log(this.unselectedPmpools, "unselectedPmpools!!!");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getPhyResPmHost(): void {
        this.layoutService.show();
        this.service.getPhyResPmHost(this.pn_id, this.pmpool_ids)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.selectedPms = response.resultContent.inUsedPMs;
                    this.unselectedPms = response.resultContent.noUsedPMs;
                    console.log(this.selectedPms, "selectedPms!!!");
                    console.log(this.unselectedPms, "unselectedPms!!!");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //setPhyRes() {
    save() {
        this.layoutService.show();
        let flag: boolean = false;
        let pmIds = "";
        let poolIds = "";
        let pmpools_array = this.selectedPmpools.map((pool) => {
            return <string>pool.pmPoolId;
        });
        let pmhosts_array = this.selectedPms.map((pm) => {
            return <string>pm.pmId;
        });
        poolIds = pmpools_array.join(",");
        pmIds = pmhosts_array.join(",");
        console.log(poolIds, pmIds);
        this.service.setPhyRes(this.pn_id, pmIds, poolIds)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log("setPhyRes successfully!");
                    flag = true;
                    this.showAlert("PHY_NET_MNG.PHY_NET_RESOURCE_SETUP_SUCCESS", () => {
                        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
                    });
                } else {
                    flag = false;
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            })
            .catch((e) => { this.onRejected(e); });
    }

    close(): void {
        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
    }

    next(): void {
        //console.log(this.selectedPmpools.length, "this.selectedPmpools.length");
        if (this.selectedPmpools.length == 0) {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_RES_POOL");
            this.second_step = false;
            this.first_step = true;
            this.showclosebtn = false;
            return;
        }
        let pmpool_id_array: Array<string> = [];
        pmpool_id_array = this.selectedPmpools.map((pool) => {
            return <string>pool.pmPoolId;
        });
        //console.log(pmpool_id_array, "pmpool_id_array");
        this.pmpool_ids = pmpool_id_array.join(",");
        console.log(this.pmpool_ids, "this.pmpool_ids");

        this.getPhyResPmHost();

    }

    previous(): void {
        this.selectedPms = [];
        this.unselectedPms = [];
        this.showclosebtn = false;
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

    showAlert(msg: string, of?: any): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
        this.notice.nof = of;
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}