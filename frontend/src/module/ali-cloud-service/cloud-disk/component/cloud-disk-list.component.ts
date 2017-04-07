import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel, diskOrderModel, diskListModel } from "../model/cloud-disk.model";
import { instanceListModel } from "../../cloud-vm/model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../service/cloud-disk.service";
import { AliCloudDiskDictService } from "../service/cloud-disk-dict.service";
import { AliCloudVmService } from "../../cloud-vm/service/cloud-vm.service";


@Component({
    selector: "alics_disklist",
    templateUrl: "../template/cloud-disk-list.html",
    styleUrls: ["../style/cloud-disk.less"],
    providers: []
})
export class AliCloudDiskListComponent implements OnInit {
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

    //keysecret: keysecretModel = new keysecretModel();

    regions: Array<RegionModel> = [];
    choosenRegion: RegionModel = new RegionModel();

    disks: Array<diskListModel> = []; //订购body模型
    selectedDiskItem: diskListModel = new diskListModel();

    diskCategoryDictArray: Array<SystemDictionary> = [];
    diskStatusDictArray: Array<SystemDictionary> = [];
    diskChargeTypeDictArray: Array<SystemDictionary> = [];
    diskTypeDictArray: Array<SystemDictionary> = [];
    diskBoolDictArray: Array<SystemDictionary> = [];

    instances: Array<instanceListModel> = []; 
    selectedInstanceId: string = "";
    deleteWithInstance: boolean = false;
    Selected: boolean = false;

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
        this.service.getAllRegions()
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
        this.getDiskList(region); // 列出对应region的disk list
        /*
        if (region.areas == null || region.areas.length == 0) {
            this.getArea(region);
        }
        */
    }

    getDiskList(region: RegionModel) {
        this.layoutService.show();
        this.service.getDiskList(this.pageIndex, this.pageSize, region.RegionId)
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
                    this.disks = result.Disks.Disk;
                    this.totalPage = Math.ceil(result.TotalCount/this.pageSize);
                    console.log(result.TotalCount, this.totalPage, "result.TotalCount, this.totalPage!");
                    for(let i=0; i<this.disks.length; i++) {
                        console.log(this.disks[i].DiskId, " == ");
                    }
                    console.log(this.disks, "this.disks!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
        })
        .catch((e) => {
                this.onRejected(e);
            });

    }

    //根据regionId获取可用区列表
    getArea(region:RegionModel) {
        this.layoutService.show();
        this.service.getArea(region.RegionId)
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
                    region.areas = result.Zones.Zone;
                    console.log(region.areas, "areas of selected Region!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    goToDiskOrder() {
        this.router.navigate([`ali-cloud-service/cloud-disk/cloud-disk-order`]);
    }

    displayDiskType(disktype: string):string {
        let diskDict:Array<SystemDictionary> = this.diskCategoryDictArray.filter((item) => {
            return item.value == disktype;
        });
        if (diskDict.length != 0) {
            return diskDict[0].displayValue;
        } else {
            return disktype;
        }
    }

    attachDisk() {
        this.selectedDiskItem = this.getSelected();
        if (this.selectedDiskItem) {
            this.layoutService.show();
                this.vmService.getInstanceList(1, 100, this.choosenRegion.RegionId)
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
                    this.instances = result.Instances.Instance;
                    for(let i=0; i<this.instances.length; i++) {
                        console.log(this.instances[i].InstanceId, " == ");
                    }
                    console.log(this.instances, "this.instances!");
                    this.attachdisk.open();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
        })
        .catch((e) => {
                this.onRejected(e);
        });            
        } else {
            this.showAlert("请选择云硬盘");
            return;
        }
    }
    acceptAttachDiskModify() {
        if(this.selectedInstanceId != "") {
            this.layoutService.show();
            this.service.attachDisk(this.selectedDiskItem, this.selectedInstanceId, this.deleteWithInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    this.attachdisk.close();
                    if (response && 100 == response["resultCode"]) {
                        this.selectRegion(this.choosenRegion);
                        this.showAlert("挂载云硬盘成功！");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                })
                .catch((e) => this.onRejected(e));
        } else {
            this.showAlert("请选择实例");
        }
        
    }
    cancelAttachDiskModify() {
        
    }

    detachDisk() {
        this.selectedDiskItem = this.getSelected();
        if (this.selectedDiskItem) {
            /*
            this.confirmTitle = "卸载硬盘";
            this.confirmMsg = "卸载硬盘" + this.selectedDiskItem.DiskId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.detachDisk(this.selectedDiskItem)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_VM_IP_MNG.DISABLE_NET_SUCCESS");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                })
                .catch((e) => this.onRejected(e));
            }
            this.confirm.open();
            */
            this.detachdisk.open();
        } else {
            this.showAlert("请选择云硬盘");
            return;
        }

    }
    acceptDetachDiskModify() {        
        if(this.selectedDiskItem.InstanceId != "") {
            this.detachdisk.close();
            this.layoutService.show();
                this.service.detachDisk(this.selectedDiskItem)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.selectRegion(this.choosenRegion);
                        this.showAlert("卸载云硬盘成功！");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                })
                .catch((e) => this.onRejected(e));
        } else {
            this.detachdisk.close();
            this.showAlert("COMMON.OPERATION_ERROR");
        }
        
    }
    cancelDetachDiskModify() {

    }

    deleteDisk() {
        this.selectedDiskItem = this.getSelected();
        console.log(this.selectedDiskItem, "this.selectedDiskItem!");
        if (this.selectedDiskItem && this.choosenRegion) {
            this.confirmTitle = "删除硬盘";
            this.confirmMsg = "删除硬盘" + this.selectedDiskItem.DiskId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.deleteDisk(this.selectedDiskItem)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("删除硬盘成功");
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

    onSelect(disk: diskListModel) {

    }

    onSave(disk: diskListModel) {

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

    chooseItem(): void {
        this.deleteWithInstance = !this.deleteWithInstance;
        if(this.deleteWithInstance == true) {
            this.Selected = true;
        } else {
            this.Selected = false;
        }
        console.log(this.deleteWithInstance, "selected deleteWithInstance!");
    }

    //选择行
    selectItem(index:number): void {
        this.disks.map(n=> {n.checked = false;});
        this.disks[index].checked = true;
        this.selectedDiskItem = this.disks[index];
        console.log(this.selectedDiskItem, "this.selectedDiskItem");
    }

    UnselectItem(): void {
        this.disks.map(n=> {n.checked = false;});
        if(this.selectedDiskItem) this.selectedDiskItem.checked = false;
    }

    getSelected() {
        let item = this.disks.find((n) => n.checked) as diskListModel;
        if (item){
            return item;
        }            
        else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_ITEM");
            return null;
        }
    }

}