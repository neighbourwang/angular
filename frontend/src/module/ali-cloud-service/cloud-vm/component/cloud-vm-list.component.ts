import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent } from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { instanceListModel, VmQueryObject, FloatingIPAddressModel } from "../model/cloud-vm.model";

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

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    forcereboot: boolean = false;

    queryObject: VmQueryObject = new VmQueryObject();

    remoteUrl: string = "";

    regions: Array<RegionModel> = [];
    defaultRegion: RegionModel = new RegionModel();
    choosenRegion: RegionModel = this.defaultRegion;    

    instances: Array<instanceListModel> = []; 
    selectedInstance: instanceListModel = new instanceListModel();
    changedInstance: instanceListModel = new instanceListModel();

    freeips: Array<FloatingIPAddressModel> = [];
    defaultfreeip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedfreeip: FloatingIPAddressModel = this.defaultfreeip;

    vmips: Array<FloatingIPAddressModel> = [];
    defaultvmip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedvmip: FloatingIPAddressModel = this.defaultvmip;

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
        this.queryObject.criteria = "instance_name";
        this.queryObject.keyword = "";
        this.getInstanceList(region); // 列出对应region的instance list
    }

    getInstanceList(region: RegionModel) {
        this.layoutService.show();
        this.service.getInstanceList(this.pageIndex, this.pageSize, region.RegionId, this.queryObject)
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

    search() {
        console.log(this.queryObject);
        if (this.choosenRegion == this.defaultRegion) {
            this.showMsg("请选择区域");
        } else if(this.queryObject.keyword != "") {
            this.getInstanceList(this.choosenRegion);
        } else {
            console.log(this.queryObject.keyword, "queryObject.keyword is '' or please choose Region!");
        }
    }

    goToInstanceOrder() {
        this.router.navigate([`ali-cloud-service/cloud-vm/cloud-vm-order`]);
    }

    startInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.confirmTitle = "启动实例";
            this.confirmMsg = "启动实例：" + this.selectedInstance.InstanceId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.startInstance(this.selectedInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("启动实例成功！");
                        this.selectRegion(this.choosenRegion);
                    } else {
                        this.showAlert("启动实例失败！");
                    }
                })
                .catch((e) => this.onRejected(e));
            }
            this.confirm.open();
        } else {
            this.showAlert("请选择实例");
            return;
        }
    }

    stopInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.confirmTitle = "停止实例";
            this.confirmMsg = "停止实例：" + this.selectedInstance.InstanceId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.stopInstance(this.selectedInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("停止实例成功！");
                        this.selectRegion(this.choosenRegion);
                    } else {
                        this.showAlert("停止实例失败！");
                    }
                })
                .catch((e) => this.onRejected(e));
            }
            this.confirm.open();
        } else {
            this.showAlert("请选择实例");
            return;
        }
    }

    reStartInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.restartvm.open();
        } else {
            this.showAlert("请选择实例");
            return;
        }
    }

    displayvalue() {
        console.log(this.forcereboot);
    }

    acceptRestartInstanceModify() {
        this.layoutService.show();
        this.service.reStartInstance(this.selectedInstance, this.forcereboot)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showMsg("重启实例成功");
                    this.getInstanceList(this.choosenRegion);
                } else {
                    this.showMsg("重启实例失败");
                    return;
                }
            })
            .then(() => {
                this.restartvm.close();
            })
            .catch(err => {
                console.log('重启实例异常', err);
                this.layoutService.hide();
                this.restartvm.close();
                this.showMsg("重启实例异常");
                this.okCallback = () => {
                    this.restartvm.open();
                };
            });
    }

    cancelRestartInstanceModify() {
        this.forcereboot = false;
    }

    attachIPToInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.layoutService.show();
            this.service.getFreeFloatingIps(this.selectedInstance.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log("Got free floating ip!");
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.freeips = result.EipAddresses.EipAddress;
                    console.log(this.freeips, "free ips!");
                    this.allocateip.open();
                } else {
                    this.showMsg("获取弹性IP失败");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
        } else {
            this.showAlert("请选择实例");
            return;
        }

    }

    freeIPChanged() {
        window.setTimeout(()=> {

        }, 50);
    }

    acceptAttachIPToInstanceModify() {
        if (this.selectedfreeip != this.defaultfreeip) {
            this.layoutService.show();
            this.service.allocateIPToInstane(this.selectedInstance, this.selectedfreeip)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showMsg("绑定弹性IP到实例成功");
                        this.getInstanceList(this.choosenRegion);
                    } else {
                        this.showMsg("绑定弹性IP到实例失败");
                        return;
                    }
                })
                .then(() => {
                    this.allocateip.close();
                })
                .catch(err => {
                    console.log('绑定弹性IP到实例异常', err);
                    this.layoutService.hide();
                    this.allocateip.close();
                    this.showMsg("绑定弹性IP到实例异常");
                    this.okCallback = () => {
                        this.allocateip.open();
                    };
                });
        } else {
            this.showMsg("请选择弹性IP");
        }

    }

    cancelAttachIPToInstanceModify() {
        this.freeips = [];
        this.selectedfreeip = new FloatingIPAddressModel();
    }

    detachIPToInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.layoutService.show();
            this.service.getFloatingIpsInInstance(this.selectedInstance.RegionId, this.selectedInstance)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    console.log("Got specific floating ip!");
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.vmips = result.EipAddresses.EipAddress;
                    console.log(this.vmips, "Instance ips!");
                    this.unallocateip.open();
                } else {
                    this.showMsg("获取弹性IP失败");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });            
        } else {
            this.showAlert("请选择实例");
            return;
        }

    }

    vmIPChanged() {

    }

    acceptDetachIPToInstanceModify() {
        if(this.selectedvmip != this.defaultvmip) {
        this.layoutService.show();
        this.service.unAllocateIPToInstane(this.selectedInstance, this.selectedvmip)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showMsg("从实例中解绑弹性IP成功");
                    this.getInstanceList(this.choosenRegion);
                } else {
                    this.showMsg("从实例中解绑弹性IP失败");
                    return;
                }
            })
            .then(() => {
                this.unallocateip.close();                
            })
            .catch(err => {
                console.log('从实例中解绑弹性IP异常', err);
                this.layoutService.hide();
                this.unallocateip.close();
                this.showMsg("从实例中解绑弹性IP异常");
                this.okCallback = () => {
                    this.unallocateip.open();
                };
            });
        } else {
            this.showMsg("请选择弹性IP");
        }

    }

    cancelDetachIPToInstanceModify() {
        this.vmips = [];
        this.selectedvmip = new FloatingIPAddressModel();
    }
    
    remoteToInstance() {
        this.selectedInstance = this.getSelected();
        if (this.selectedInstance) {
            this.showMsg("远程控制台Url, 有效时间为15秒，请尽快输入密码登陆！");
            this.layoutService.show();
            this.service.remoteControlInstance(this.choosenRegion.RegionId, this.selectedInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    console.log(response, "response!");
                    if (response && 100 == response["resultCode"]) {
                        console.log(this.remoteUrl, "remoteUrl!");
                        this.remoteUrl = response.resultContent;
                        window.open(this.remoteUrl);
                    } else {
                        this.showMsg("COMMON.GETTING_DATA_FAILED");
                        return;
                    }
                })
                .catch((e) => {
                    this.onRejected(e);
                });
        } else {
            this.showAlert("请选择实例");
            return;
        }
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
                        this.showAlert("COMMON.GETTING_DATA_FAILED");
                    }
                })
                .catch((e) => this.onRejected(e));
            };
            this.confirm.open();
        } else {
            this.showAlert("请选择实例");
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
        console.log(this.selectedInstance, "this.selectedInstance!");
    }

    UnselectItem(): void {
        this.instances.map(n=> {n.checked = false;});
        if(this.selectedInstance) this.selectedInstance.checked = false;
    }

    getSelected() {
        let item = this.instances.find((n) => n.checked) as instanceListModel;
        if (item){
            return item;
        } else {
            this.showMsg("COMMON.GETTING_DATA_FAILED");
            return null;
        }
    }

    onSelect(instance: instanceListModel) {
        if (instance) {
            this.changedInstance.InstanceName = instance.InstanceName;
            this.changedInstance.InstanceId = instance.InstanceId;
        } else {
            this.showAlert("COMMON.GETTING_DATA_FAILED");
            return;
        }

    }

    onSave() {
        if (this.changedInstance.InstanceName != "") {
            this.layoutService.show();
            this.service.updateInstance(this.changedInstance)
                .then(
                response => {
                    this.layoutService.hide();
                    console.log(response, "response!");
                    if (response && 100 == response["resultCode"]) {
                        console.log("云主机名称更改成功！");
                        this.showMsg("云主机名称更改成功！");
                        this.selectRegion(this.choosenRegion);
                    } else {
                        this.showMsg("COMMON.GETTING_DATA_FAILED");
                        return;
                    }
                })
                .catch((e) => {
                    this.onRejected(e);
                });

        } else {
            this.showMsg("云主机名称不能为空！");
        }

    }

    onCancel(instance: instanceListModel) {
        instance.EnableEdit = false;
    }

}