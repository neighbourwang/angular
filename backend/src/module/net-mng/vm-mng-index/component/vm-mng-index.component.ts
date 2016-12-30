import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

//Mock
import { RegionInfo_mock } from '../model/vmware-net.mock';

//Model
import { PlatformModel, DCModel, RegionModel, VmwareNetModel, NsxNetModel } from '../model/vmware-net.model';

//Service
import { VmwareMngIndexService } from '../service/vm-mng-index.service';

@Component({
    selector: "vmware-net-mng-index",
    templateUrl: "../template/cloud-vmware.html",
    styleUrls: [],
    providers: []
}
)
export class VmwareMngIndexComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private service: VmwareMngIndexService
    ) {
    }
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("setnsxmnginfo")
    setnsxmnginfo: PopupComponent;

    @ViewChild("setnettype")
    setnettype: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    regionList: Array<RegionModel> = [];

    defaultRegion: RegionModel = new RegionModel(); 
    defaultDC: DCModel = new DCModel();
    defaultPlatform: PlatformModel = new PlatformModel();
    selectedRegion: RegionModel = this.defaultRegion;
    selectedDC: DCModel = this.defaultDC;
    selectedPlatform: PlatformModel = this.defaultPlatform;

    queryOpt: PlatformModel = new PlatformModel();

    NsxInfo: NsxNetModel = new NsxNetModel();

    networkList: Array<VmwareNetModel> = [];
    selectedNet: VmwareNetModel = new VmwareNetModel();

    NsxMngInfo: NsxNetModel = new NsxNetModel();
    changedNsxMngInfo: NsxNetModel = new NsxNetModel();

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
        this.getRegionInfo();
    }

    getRegionInfo(): void {
        this.layoutService.show();
        this.service.getRegionInfo()
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.regionList = response.resultContent;
                    console.log(this.regionList, "this.regionList");
                } else {
                    alert("Res sync error");
                }
            }
            ) .catch((e) => this.onRejected(e));
    }

    getNsxInfo(platformId:string): void {        
        this.layoutService.show();
        this.service.getNsxInfo(platformId)
            .then(response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.NsxInfo = response.resultContent;
                    console.log(this.NsxInfo, "this.NsxInfo");
                } else {
                    alert("Res sync error");
                }
            }
            ) .catch((e) => this.onRejected(e));
    }

    getNetworkList(platformId:string): void {
        //this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getNetworkList(platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.networkList = response.resultContent;
                    //this.totalPage = response.pageInfo.totalPage;
                    console.log(this.networkList, "this.networkList");
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    search(): void {
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)){
            console.log(this.queryOpt.platformId, "this.queryOpt.platformId");
            this.getNetworkList(this.queryOpt.platformId);
            this.getNsxInfo(this.queryOpt.platformId);
        } else {
            this.showMsg("请选择相应的平台");
        }
        this.UnselectItem();
    }

    setNsxMngInfo(): void {
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)) {
            this.layoutService.show();
            this.service.getNsxInfo(this.queryOpt.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) { 
                    this.NsxMngInfo = response.resultContent;
                    console.log(this.NsxMngInfo, "this.NsxMngInfo")
                    this.changedNsxMngInfo.nsxVer = this.NsxMngInfo.nsxVer;
                    this.changedNsxMngInfo.nsxAddress = this.NsxMngInfo.nsxAddress;
                    this.changedNsxMngInfo.userName = this.NsxMngInfo.userName;
                    this.changedNsxMngInfo.adminPassword = this.NsxMngInfo.adminPassword;
                    this.changedNsxMngInfo.platformId = this.NsxMngInfo.platformId;
                    console.log(this.changedNsxMngInfo, "this.changedNsxMngInfo");
                } else {
                    console.log("========== setupIPs [if]else=============");
                    this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                }
            })
            .catch((e) => this.onRejected(e));
            this.setnsxmnginfo.open();

        } else {          
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return;
        }

    }

    acceptNsxMngInfoModify(): void {
        console.log('clicked acceptNsxMngInfoModify');
        this.layoutService.show();
        if (this.validateNsxMngInfoModify()) {
            this.service.updateNsxMngInfo(this.queryOpt.platformId, this.changedNsxMngInfo)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.setnsxmnginfo.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    this.getNsxInfo(this.queryOpt.platformId);   //************ */
                    //this.getIpMngList(); // Need to get list since we need to get ipcount after setting up ipscope.
                    this.setnsxmnginfo.close();
                })
                .catch(err => {
                    console.log('设置IP地址范围异常', err);
                    this.layoutService.hide();
                    this.setnsxmnginfo.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_EXCEPTION");
                    this.okCallback = () => { 
                        this.setnsxmnginfo.open();  };
                })
        } else {
            this.layoutService.hide();
        }
    }

    cancelNsxMngInfoModify(): void {
        console.log('clicked cancelNsxMngInfoModify');
        this.changedNsxMngInfo.nsxVer = "";
        this.changedNsxMngInfo.nsxAddress = "";
        this.changedNsxMngInfo.userName = "";
        this.changedNsxMngInfo.adminPassword = "";
        this.changedNsxMngInfo.platformId = "";
    }

    validateNsxMngInfoModify(): boolean {
        return true;
    }

    setNetworkType(): void {
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)) {
            this.layoutService.show();
            this.service.getNsxInfo(this.queryOpt.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) { 
                    this.NsxMngInfo = response.resultContent;
                    console.log(this.NsxMngInfo, "this.NsxMngInfo");
                    this.changedNsxMngInfo.nsxVer = this.NsxMngInfo.nsxVer;
                    this.changedNsxMngInfo.nsxAddress = this.NsxMngInfo.nsxAddress;
                    this.changedNsxMngInfo.userName = this.NsxMngInfo.userName;
                    this.changedNsxMngInfo.adminPassword = this.NsxMngInfo.adminPassword;
                    this.changedNsxMngInfo.platformId = this.NsxMngInfo.platformId;
                    console.log(this.changedNsxMngInfo, "this.changedNsxMngInfo");
                } else {
                    console.log("========== setupIPs [if]else=============");
                    this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                }
            })
            .catch((e) => this.onRejected(e));
            this.setnettype.open();
        } else {          
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return;
        }

    }

    acceptNetworkTypeModify(): void {
        console.log('clicked acceptNsxMngInfoModify');
        this.layoutService.show();
        if (this.validateNsxMngInfoModify()) {
            this.service.updateNsxMngInfo(this.queryOpt.platformId, this.changedNsxMngInfo)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.setnettype.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    this.getNsxInfo(this.queryOpt.platformId);   //************ */
                    //this.getIpMngList(); // Need to get list since we need to get ipcount after setting up ipscope.
                    this.setnettype.close();
                })
                .catch(err => {
                    console.log('设置IP地址范围异常', err);
                    this.layoutService.hide();
                    this.setnettype.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_EXCEPTION");
                    this.okCallback = () => { 
                        this.setnettype.open();  };
                })
        } else {
            this.layoutService.hide();
        }
    }

    cancelNetworkTypeModify(): void {
        console.log('clicked cancelNsxMngInfoModify');
        this.changedNsxMngInfo.nsxVer = "";
        this.changedNsxMngInfo.nsxAddress = "";
        this.changedNsxMngInfo.userName = "";
        this.changedNsxMngInfo.adminPassword = "";
        this.changedNsxMngInfo.platformId = "";
    }

    validateNetworkTypeModify(): boolean {
        return true;
    }

    gotoVMStdNetMng() {
        this.selectedNet = this.getSelected();
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)) {
        if (this.selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng/${this.queryOpt.platformId}`,
                {
                    "dc_Id": this.selectedNet.dcId,
                    "cls_Id": this.selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("请选择相应的平台");

        }
    }

    gotoVMDbtNetMng() {
        this.selectedNet = this.getSelected();
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)) {
        if (this.selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng-dbt/index/${this.queryOpt.platformId}`,
                {
                    "dc_Id": this.selectedNet.dcId,
                    "cls_Id": this.selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng-dbt/index/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("请选择相应的平台");

        }
    }

    gotoVMNsxNetMng() {
        this.selectedNet = this.getSelected();
        if (this.queryOpt && !this.validationService.isBlank(this.queryOpt.platformId)) {
        if (this.selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng-nsx/index/${this.queryOpt.platformId}`,
                {
                    "dc_Id": this.selectedNet.dcId,
                    "cls_Id": this.selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng-nsx/index/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("请选择相应的平台");

        }
    }
    
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("NET_MNG_VM_IP_MNG.SYSTEM_PROMPT", msg);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    //根据value显示
    displayIt(value: any): any {
        if(this.validationService.isBlank(value)){
            return "NET_MNG_VM_IP_MNG.UNSET";
        } else {
            return value.toString();
            
        }
    }

    //选择行
    selectItem(index:number): void {
        this.networkList.map(n=> {n.checked = false;});
        this.networkList[index].checked = true;
        console.log(this.networkList[index], "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.networkList.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item = this.networkList.find((n) => n.checked) as VmwareNetModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return null;
        }
    }
    

}