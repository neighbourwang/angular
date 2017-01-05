import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { TranslateService } from 'ng2-translate';

//Mock
import { RegionInfo_mock } from '../model/vmware-net.mock';

//Model
import { PlatformModel, DCModel, RegionModel, VmwareNetModel, NsxNetModel, VmNetStatusModel } from '../model/vmware-net.model';

//Service
import { VmwareMngIndexService } from '../service/vm-mng-index.service';
import { IPValidationService } from '../service/validation.service';
import { selectedPlatform } from "../service/platform.service";

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
        private service: VmwareMngIndexService,
        private ipService: IPValidationService,
        private translateService: TranslateService
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

    typeDictArray: Array<SystemDictionary> = [];
    nsxresDictArray: Array<SystemDictionary> = [];
    nsxverDictArray: Array<SystemDictionary> = [];

    nsxTestFlag: string = "";

    regionList: Array<RegionModel> = [];

    defaultRegion: RegionModel = new RegionModel(); 
    defaultDC: DCModel = new DCModel();
    defaultPlatform: PlatformModel = new PlatformModel();
    selectedRegion: RegionModel = this.defaultRegion;
    selectedDC: DCModel = this.defaultDC;
    selectedPlatform: PlatformModel = this.defaultPlatform;

    queryOpt: PlatformModel = new PlatformModel();
    queryOpt2: PlatformModel = new PlatformModel();

    NsxInfo: NsxNetModel = new NsxNetModel();  //fiter下面的显示行

    networkList: Array<VmwareNetModel> = [];   //表格里的内容
    selectedNet: VmwareNetModel = new VmwareNetModel();   //选择后的表格行
    changedNet: VmwareNetModel = new VmwareNetModel();   //选择的表格行的变化值

    NsxMngInfo: NsxNetModel = new NsxNetModel();   //设置NSX网络管理信息的弹出框的后台数据
    changedNsxMngInfo: NsxNetModel = new NsxNetModel();//设置NSX网络管理信息的弹出框的展示数据

    VmNetStatus: VmNetStatusModel = new VmNetStatusModel();  //设置网络类型所需的nsx状态

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

        this.service.typeDict
        .then((items) => {
            this.typeDictArray = items;
            console.log(this.typeDictArray, "this.typeDictArray");
        });
        this.service.nsxresDict
        .then((items) => {
            this.nsxresDictArray = items;
            console.log(this.nsxresDictArray, "this.nsxresDictArray");
        });
        this.service.nsxverDict
        .then((items) => {
            this.nsxverDictArray = items;
            console.log(this.nsxverDictArray, "this.nsxverDictArray");
        });
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
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    return;
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
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    return;
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
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    return;
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    showNetAndNxsInfo(): void {
        if (this.queryOpt2 && !this.validationService.isBlank(this.queryOpt2.platformId)){
            console.log(this.queryOpt2.platformId, "this.queryOpt2.platformId");
            this.getNetworkList(this.queryOpt2.platformId);
            //this.getNsxInfo(this.queryOpt2.platformId);
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
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
                    console.log(this.NsxMngInfo, "this.NsxMngInfo");

                    this.changedNsxMngInfo.nsxVer = '';
                    this.changedNsxMngInfo.nsxAddress = '';
                    this.changedNsxMngInfo.userName = '';
                    this.changedNsxMngInfo.adminPassword = '';
                    this.changedNsxMngInfo.platformId = '';
                    /*这里只是为了调试workarround
                    this.changedNsxMngInfo.nsxVer = this.NsxMngInfo.nsxVer;
                    this.changedNsxMngInfo.nsxAddress = this.NsxMngInfo.nsxAddress;
                    this.changedNsxMngInfo.userName = this.NsxMngInfo.userName;
                    this.changedNsxMngInfo.adminPassword = this.NsxMngInfo.adminPassword;
                    this.changedNsxMngInfo.platformId = this.NsxMngInfo.platformId;
                    console.log(this.changedNsxMngInfo, "this.changedNsxMngInfo");
                    */
                    this.setnsxmnginfo.open();
                } else {
                    this.showMsg("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => this.onRejected(e));
        } else {          
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
        }

    }

    acceptNsxMngInfoModify(): void {
        console.log('clicked acceptNsxMngInfoModify');        
        if (this.validateNsxMngInfoModify()) {
            this.layoutService.show();
            this.service.updateNsxMngInfo(this.queryOpt.platformId, this.changedNsxMngInfo)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置NSX管理信息成功")
                    } else {
                        this.setnsxmnginfo.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_NSX_MNG_INFO_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    //this.getNsxInfo(this.queryOpt.platformId);
                    //this.getIpMngList(); // Need to get list since we need to get ipcount after setting up ipscope.
                    this.NsxInfo.nsxAddress = this.changedNsxMngInfo.nsxAddress;
                    this.setnsxmnginfo.close();
                })
                .catch(err => {
                    console.log('设置NSX管理信息异常', err);
                    this.layoutService.hide();
                    this.setnsxmnginfo.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_NSX_MNG_INFO_EXCEPTION");
                    this.okCallback = () => { 
                        this.setnsxmnginfo.open();  };
                })
        } else {
            console.log("validateNsxMngInfoModify failed!");
        }
    }

    cancelNsxMngInfoModify(): void {
        console.log('clicked cancelNsxMngInfoModify');
        this.changedNsxMngInfo.nsxVer = "";
        this.changedNsxMngInfo.nsxAddress = "";
        this.changedNsxMngInfo.userName = "";
        this.changedNsxMngInfo.adminPassword = "";
        this.changedNsxMngInfo.platformId = "";
        this.nsxTestFlag = "";
    }

    validateNsxMngInfoModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "NET_MNG_VM_IP_MNG.NSX_VERSION"
                , 'value': this.changedNsxMngInfo.nsxVer
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.NSX_MNG_ADDRESS"
                , 'value': this.changedNsxMngInfo.nsxAddress
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.NSX_MNG_USERNAME"
                , 'value': this.changedNsxMngInfo.userName
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.NSX_MNG_PASSWORD"
                , 'value': this.changedNsxMngInfo.adminPassword
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.NSX_MNG_ADDRESS"
                , 'value': this.changedNsxMngInfo.nsxAddress
                , "op": "url"
            }
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)        
        //console.log(notValid, "notValid!!!")
        if (notValid !== void 0) {
            console.log("validateIPModify Failed!!!");
            this.setnsxmnginfo.close();
            //this.showMsg(this.ipService.validate(notValid.name, notValid.value, notValid.op));  
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];            
            let con = this.translateService.getParsedResult(this.translateService.getBrowserCultureLang(), name, null) 
                      + this.translateService.getParsedResult(this.translateService.getBrowserCultureLang(), msg, null);
            console.log(con, "con");
            this.showMsg(con);
            this.okCallback = () => {
                this.setnsxmnginfo.open();                
            };            
            return false;
        } else {
            console.log("validateIPModify OK!!!");
            return true;
        }
    }

    testNsxMngInfo(): any {
        if (this.validateNsxMngInfoModify()) {
            this.layoutService.show();
            this.service.testNsxMngInfo(this.queryOpt.platformId, this.changedNsxMngInfo)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "测试NSX管理信息成功");
                        this.nsxTestFlag = "success";
                    } else {
                        console.log('测试NSX管理信息失败');
                        //this.showMsg("NET_MNG_VM_IP_MNG.TEST_NSX_MNG_INFO_FAILED");
                        this.nsxTestFlag = "failure";
                    }
                })
                .catch(err => {
                    console.log('测试NSX管理信息异常', err);
                    this.layoutService.hide();
                    //this.showMsg("NET_MNG_VM_IP_MNG.TEST_NSX_MNG_INFO_EXCEPTION");
                    this.nsxTestFlag = "failure";
                })
        } else {
            console.log("validateNsxMngInfoModify failed!");
            this.nsxTestFlag = "";
        }
    }

    setNetworkType(): void {
        if (this.queryOpt2 && !this.validationService.isBlank(this.queryOpt2.platformId)) {
            this.selectedNet = this.getSelected();
            if (this.selectedNet) {
                this.layoutService.show();
                this.service.getNsxStatus(this.queryOpt2.platformId)
                    .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.VmNetStatus.checkResult = response.resultContent.checkResult;
                            console.log(this.VmNetStatus, "this.VmNetStatus before");
                            this.changedNet.dcName = this.selectedNet.dcName;
                            this.changedNet.dcId = this.selectedNet.dcId;
                            this.changedNet.clusterName = this.selectedNet.clusterName;
                            this.changedNet.clusterId = this.selectedNet.clusterId;
                            this.changedNet.clusterDisplayName = this.selectedNet.clusterDisplayName;
                            this.changedNet.networkType = this.selectedNet.networkType;
                            console.log(this.changedNet, "this.changedNet");
                            this.setnettype.open();
                        } else {
                            this.showMsg("NET_MNG_VM_IP_MNG.GET_NXS_STATUS_FAILED");
                            return;
                        }
                    })
                    .catch((e) => this.onRejected(e));
            } else {
                this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET");
                return;
            }
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
        }

    }

    acceptNetworkTypeModify(): void {
        console.log('clicked acceptNetworkTypeModify');
        if (!this.validationService.isBlank(this.VmNetStatus.vmNetStatus)) {
            this.layoutService.show();
            this.service.updateNetworkType(this.VmNetStatus, this.changedNet)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置网络类型成功")
                    } else {
                        this.setnettype.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_NETWORK_TYPE_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.selectedNet.networkType = this.VmNetStatus.vmNetStatus; //更新数据回页面展示
                    this.setnettype.close();
                })
                .catch(err => {
                    console.log('设置网络类型异常', err);
                    this.layoutService.hide();
                    this.setnettype.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_NETWORK_TYPE_EXCEPTION");
                    this.okCallback = () => {
                        this.setnettype.open();
                    };
                })
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET_TYPE");
        }
    }

    cancelNetworkTypeModify(): void {
        console.log('clicked cancelNetworkTypeModify');
        this.changedNet.dcName = "";
        this.changedNet.dcId = "";
        this.changedNet.clusterName = "";
        this.changedNet.clusterId = "";
        this.changedNet.clusterDisplayName = "";
        this.changedNet.networkType = "";
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
            selectedPlatform.regionName = this.selectedRegion.regionName;
            selectedPlatform.dcName = this.selectedDC.datacenterName;
            selectedPlatform.platformName = this.selectedPlatform.platformName;
            selectedPlatform.platformUrl = this.selectedPlatform.platformUrl;
            this.router.navigate([`net-mng/vm-mng/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
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
            selectedPlatform.regionName = this.selectedRegion.regionName;
            selectedPlatform.dcName = this.selectedDC.datacenterName;
            selectedPlatform.platformName = this.selectedPlatform.platformName;
            selectedPlatform.platformUrl = this.selectedPlatform.platformUrl;
            this.router.navigate([`net-mng/vm-mng-dbt/index/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
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
            selectedPlatform.regionName = this.selectedRegion.regionName;
            selectedPlatform.dcName = this.selectedDC.datacenterName;
            selectedPlatform.platformName = this.selectedPlatform.platformName;
            selectedPlatform.platformUrl = this.selectedPlatform.platformUrl;
            this.router.navigate([`net-mng/vm-mng-nsx/index/${this.queryOpt.platformId}`]);
        }
        } else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PF");
            return;
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
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET");
            return null;
        }
    }
    

}