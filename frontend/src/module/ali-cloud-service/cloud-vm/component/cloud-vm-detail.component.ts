import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { instanceListModel, VmQueryObject, FloatingIPAddressModel, TagsModel, KeyPairsModel } from "../model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../../cloud-disk/service/cloud-disk.service";
//import { AliCloudDiskDictService } from "../../cloud-disk/service/cloud-disk-dict.service";
import { AliCloudVMDictService } from "../service/cloud-vm-dict.service";
import { AliCloudVmService } from "../service/cloud-vm.service";


@Component({
    selector: "alics_vmdetail",
    templateUrl: "../template/cloud-vm-detail.html",
    styleUrls: ["../../cloud-disk/style/cloud-disk.less"],
    providers: []
})
export class AliCloudVmDetailComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudVmService,
        private dictService: AliCloudVMDictService,
        private commonService: AliCloudDiskService,
        private activatedRouter: ActivatedRoute,

    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("restartvm")
    restartvm: PopupComponent;

    @ViewChild("allocateip")
    allocateip: PopupComponent;

    @ViewChild("unallocateip")
    unallocateip: PopupComponent;

    @ViewChild("remotecontrolvm")
    remotecontrolvm: PopupComponent;


    noticeTitle = "";
    noticeMsg = "";

    confirmTitle = "";
    confirmMsg = "";

    pageIndex:number = 1;
    pageSize:number = 10;
    totalPage:number = 1;

    menu1open:boolean = true;
    menu2open:boolean = false;
    menu3open:boolean = false;

    regionId: string = "";
    instanceId: string = "";
    queryObject: VmQueryObject = new VmQueryObject();
    instance: instanceListModel = new instanceListModel();

    tags: TagsModel = new TagsModel();
    keypairs: KeyPairsModel = new KeyPairsModel();

    remoteUrl: string = "";

    regions: Array<RegionModel> = [];
    defaultRegion: RegionModel = new RegionModel();
    choosenRegion: RegionModel = this.defaultRegion;

    allinstances: Array<instanceListModel> = [];
    instances: Array<instanceListModel> = [];
    selectedInstance: instanceListModel = new instanceListModel();
    changedInstance: instanceListModel = new instanceListModel();

    freeips: Array<FloatingIPAddressModel> = [];
    defaultfreeip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedfreeip: FloatingIPAddressModel = this.defaultfreeip;

    vmips: Array<FloatingIPAddressModel> = [];
    defaultvmip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedvmip: FloatingIPAddressModel = this.defaultvmip;

    instanceStatusDictArray: Array<SystemDictionary> = [];
    instanceChargeTypeDictArray: Array<SystemDictionary> = [];
    ioOptimizedDictArray: Array<SystemDictionary> = [];
    networkTypeDictArray: Array<SystemDictionary> = [];

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
            if (params["instanceId"] != null) {
                this.instanceId = params["instanceId"];
                console.log(this.instanceId);
            } else {
                console.log("No instanceId!");
                return;
            }
        });

        this.getKeySecret();
        
        this.dictService.instanceStatusDict
            .then((items) => {
                this.instanceStatusDictArray = items;
                console.log(this.instanceStatusDictArray, "this.instanceStatusDictArray");
            });
        this.dictService.instanceChargeTypeDict
            .then((items) => {
                this.instanceChargeTypeDictArray = items;
                console.log(this.instanceChargeTypeDictArray, "this.instanceChargeTypeDictArray");
            });
        this.dictService.ioOptimizedDict
            .then((items) => {
                this.ioOptimizedDictArray = items;
                console.log(this.ioOptimizedDictArray, "this.ioOptimizedDictArray");
            });
        this.dictService.networkTypeDict
            .then((items) => {
                this.networkTypeDictArray = items;
                console.log(this.networkTypeDictArray, "this.networkTypeDictArray");
            });
        
        this.getInstance();
        this.getInstanceKeypairTags();
    }

    getKeySecret(): void {
        this.layoutService.show();
        this.commonService.getKeySecret()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.commonService.keysecret = response.resultContent;
                    this.service.keysecret = response.resultContent;
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getInstance() {
        this.queryObject.keyword = this.instanceId;
        this.queryObject.criteria = "instance_ids";
        this.layoutService.show();
        this.service.getInstanceList(1, 100, this.regionId, this.queryObject)  //这个不应该给出pageIndex和pageSize
            .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.instance = result.Instances.Instance[0];
                    console.log(this.instance, "instance!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }

    getInstanceKeypairTags() {
        this.layoutService.show();
        this.service.getInstanceKeypairTags(this.regionId, this.instanceId)  //这个不应该给出pageIndex和pageSize
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    
                    this.tags = response.resultContent.Tags;
                    this.keypairs = response.resultContent.KeyPairs;
                    console.log(this.tags, this.keypairs, "tags, keypairs!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

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

    goVMListPage() {
        this.router.navigate([`ali-cloud-service/cloud-vm/cloud-vm-list`]);
    }


    openMenu(menu: number){
        switch (menu) {
            case 1:
                this.menu1open=true;
                break;
            case 2:
                this.menu2open=true;
                break;
            default:
                this.menu3open=true;
                break;
        }

    }

    closeMenu(menu: number){
        switch (menu) {
            case 1:
                this.menu1open=false;
                break;
            case 2:
                this.menu2open=false;
                break;
            default:
                this.menu3open=false;
                break;
        }

    }

    displayKeyPairs(keypairs: KeyPairsModel):string {
        let displayString = " ";
        if(keypairs.KeyPair.length!=0) {
            keypairs.KeyPair.map((item)=> {
                displayString += (item.KeyPairName + " : " + item.KeyPairFingerPrint) + " </br>";
            });
        }
        return displayString;

    }

    displayTags(tags: TagsModel):string {
        let displayString = " ";
        if(tags.Tag.length!=0) {
            tags.Tag.map((item)=> {
                displayString += (item.TagKey + " : " + item.TagValue) + " </br>";
            });
        }
        return displayString;

    }
    
}