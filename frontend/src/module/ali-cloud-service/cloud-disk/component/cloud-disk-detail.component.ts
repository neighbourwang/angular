import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel, diskOrderModel, diskListModel, DiskQueryObject } from "../model/cloud-disk.model";
import { instanceListModel, VmQueryObject } from "../../cloud-vm/model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../service/cloud-disk.service";
import { AliCloudDiskDictService } from "../service/cloud-disk-dict.service";
import { AliCloudVmService } from "../../cloud-vm/service/cloud-vm.service";


@Component({
    selector: "alics_diskdetail",
    templateUrl: "../template/cloud-disk-detail.html",
    styleUrls: ["../style/cloud-disk.less"],
    providers: []
})
export class AliCloudDiskDetailComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudDiskService,
        private vmService: AliCloudVmService,
        private dictService: AliCloudDiskDictService,
        private activatedRouter: ActivatedRoute,
    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("attachdisk")
    attachdisk: PopupComponent;

    @ViewChild("detachdisk")
    detachdisk: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    confirmTitle = "";
    confirmMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    regionId: string = null;
    diskId: string = null;
    disk: diskListModel = new diskListModel();
    queryObject: DiskQueryObject = new DiskQueryObject();

    diskCategoryDictArray: Array<SystemDictionary> = [];
    diskStatusDictArray: Array<SystemDictionary> = [];
    diskChargeTypeDictArray: Array<SystemDictionary> = [];
    diskTypeDictArray: Array<SystemDictionary> = [];
    diskBoolDictArray: Array<SystemDictionary> = [];

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

    ngOnInit(): void {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["regionId"] != null) {
                this.regionId = params["regionId"];
                console.log(this.regionId);
            } else {
                console.log("No regionId!");
                return;
            }
            if (params["diskId"] != null) {
                this.diskId = params["diskId"];
                console.log(this.diskId);
            } else {
                console.log("No diskId!");
                return;
            }
        });

        this.getKeySecret();

        this.dictService.diskCategoryDict
        .then((items) => {
            this.diskCategoryDictArray = items;
            console.log(this.diskCategoryDictArray, "this.diskCategoryDictArray");
        });
        this.dictService.diskStatusDict
        .then((items) => {
            this.diskStatusDictArray = items;
            console.log(this.diskStatusDictArray, "this.diskStatusDictArray");
        });
        this.dictService.diskChargeTypeDict
        .then((items) => {
            this.diskChargeTypeDictArray = items;
            console.log(this.diskChargeTypeDictArray, "this.diskChargeTypeDictArray");
        });
        this.dictService.diskTypeDict
        .then((items) => {
            this.diskTypeDictArray = items;
            console.log(this.diskTypeDictArray, "this.diskTypeDictArray");
        });
        this.dictService.diskBoolDict
        .then((items) => {
            this.diskBoolDictArray = items;
            console.log(this.diskBoolDictArray, "this.diskBoolDictArray");
        });

    } 
    getKeySecret(): void {
        this.layoutService.show();
        this.service.getKeySecret()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.service.keysecret = response.resultContent;
                    this.vmService.keysecret = response.resultContent;
                    this.getDisk();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getDisk() {
        this.queryObject.keyword = this.diskId;
        this.queryObject.criteria = "disk_ids";
        this.layoutService.show();
        this.service.getDiskList(1, 100, this.regionId, this.queryObject)
        .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.disk = result.Disks.Disk[0];
                    console.log(this.disk, "disk!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
        })
        .catch((e) => {
                this.onRejected(e);
            });
    }

    onCancel(disk: diskListModel) {
        disk.EnableEdit = false;
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }


}