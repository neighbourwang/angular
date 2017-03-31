import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent } from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { instanceListModel } from "../model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../../cloud-disk/service/cloud-disk.service";
import { AliCloudDiskDictService } from "../../cloud-disk/service/cloud-disk-dict.service";
import { AliCloudVmService } from "../service/cloud-vm.service";


@Component({
    selector: "alics_vmlist",
    templateUrl: "../template/cloud-vm-list.html",
    styleUrls: ["../../cloud-disk/style/cloud-disk.less"],
    providers: []
})
export class AliCloudVmListComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudVmService,
        private commonService: AliCloudDiskService,
        private activatedRouter : ActivatedRoute,

    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;
    
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    confirmTitle = "";
    confirmMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    regions: Array<RegionModel> = [];
    choosenRegion: RegionModel = new RegionModel();

    instances: Array<instanceListModel> = []; 
    selectedInstance: instanceListModel = new instanceListModel();

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

        this.getKeySecret();

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
                    //console.log(this.service.keysecret, "this.keysecret!");
                    this.getAllRegions();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getAllRegions(): void {

        this.layoutService.show();
        this.commonService.getAllRegions()
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
                    this.regions = result.Regions.Region;
                    console.log(this.regions, "this.regions!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    selectRegion(region: RegionModel) {
        this.regions.map((item) => {
            item.selected = false;
        });
        region.selected = true;
        this.getInstanceList(region); // 列出对应region的instance list
        /*
        if (region.areas == null || region.areas.length == 0) {
            this.getArea(region);
        }
        */
    }

    getInstanceList(region: RegionModel) {
        this.layoutService.show();
        this.service.getInstanceList(this.pageIndex, this.pageSize, region.RegionId)
        .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.instances = result.Instances.Instance;
                    this.totalPage = Math.ceil(result.TotalCount/this.pageSize);
                    console.log(result.TotalCount, this.totalPage, "result.TotalCount, this.totalPage!");
                    for(let i=0; i<this.instances.length; i++) {
                        console.log(this.instances[i].InstanceId, " == ");
                    }
                    console.log(this.instances, "this.instances!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
        })
        .catch((e) => {
                this.onRejected(e);
            });

    }

    goToInstanceOrder() {
        this.router.navigate([`ali-cloud-service/cloud-vm/cloud-vm-order`]);
    }

    deleteInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.confirmTitle = "释放实例";
            this.confirmMsg = "释放实例：" + this.selectedInstance.InstanceId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.deleteInstance(this.selectedInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("释放实例成功！");
                        this.selectRegion(this.choosenRegion);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                })
                .catch((e) => this.onRejected(e));
            }
            this.confirm.open();
        } else {
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_ITEM");
            return;
        }
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

    //选择行
    selectItem(index:number): void {
        this.instances.map(n=> {n.checked = false;});
        this.instances[index].checked = true;
        this.selectedInstance = this.instances[index];
        console.log(this.selectedInstance, "this.selectedInstance");
    }

    UnselectItem(): void {
        this.instances.map(n=> {n.checked = false;});
        if(this.selectedInstance) this.selectedInstance.checked = false;
    }

    getSelected() {
        let item = this.instances.find((n) => n.checked) as instanceListModel;
        if (item){
            return item;
        }            
        else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_ITEM");
            return null;
        }
    }

}