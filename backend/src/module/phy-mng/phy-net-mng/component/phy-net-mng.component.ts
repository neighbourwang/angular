import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PaginationComponent, PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { TranslateService } from 'ng2-translate';

//Model
import { PhyNetListModel, PhyNetCreateModel, PhyNetEditModel, PhyResPoolModel, PhyNetDetailsModel, IpScopeModel } from '../model/phy-net.model';

//Service
import { PhyNetMngService } from '../service/phy-net-mng.service';
import { PhyNetDictService } from '../service/phy-net-dict.service';
import { IPValidationService } from '../service/ip-validation.service';

@Component({
    selector: "physical_network",
    templateUrl: "../template/physical_network.html",
    styleUrls: [],
    providers: []
}
)
export class PhyNetMngComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private service: PhyNetMngService,
        private dictService: PhyNetDictService,
        private ipService: IPValidationService,
        //private ipService: IPValidationService,
        private translateService: TranslateService
    ) {
    }
    @ViewChild("pager")
    pager: PaginationComponent;
    
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("createphynetbox")
    createphynetbox: PopupComponent;

    @ViewChild("editphynetbox")
    editphynetbox: PopupComponent;

    @ViewChild("ipsbox")
    ipsbox: PopupComponent;

    @ViewChild("enablebox")
    enablebox: PopupComponent;

    @ViewChild("disablebox")
    disablebox: PopupComponent;

    @ViewChild("deletebox")
    deletebox: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 3;
    totalPage = 1;

    phynets: Array<PhyNetListModel> = [];  // 物理机网络首页list

    selectedphynet: PhyNetListModel = new PhyNetListModel();  // 物理机网络首页选中的网络

    phynet_create: PhyNetCreateModel = new PhyNetCreateModel();　// 创建物理机网络框

    phynet_changed: PhyNetEditModel = new PhyNetEditModel();　// 编辑物理机网络框
    phynet_edit: PhyNetEditModel = new PhyNetEditModel();

    ipscope_changed: IpScopeModel = new IpScopeModel();


    statusDictArray: Array<SystemDictionary> = [];

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
        this.getPhyNetList();

        this.dictService.statusDict
        .then((items) => {
            this.statusDictArray = items;
            console.log(this.statusDictArray, "this.statusDictArray");
        });
    }

    //获取物理机网络列表
    getPhyNetList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getPhyNetList(this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.phynets = response.resultContent;
                    console.log(this.phynets, "PhyNets!!!");
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //Menu: 查看网络信息
    showDetails() {
        let pn = this.getSelected();
        if(pn){
            this.selectedphynet = pn;
            this.router.navigate([`phy-mng/phy-net/phy-net-details`, {"pn_id": this.selectedphynet.id}]);
        }
    }
    

    //Menu: 创建网络
    createPhyNet(): void {
        this.createphynetbox.open();
    }

    validatePhyNetCreateInfo(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "PHY_NET_MNG.PHY_NET_NAME"
                , 'value': this.phynet_create.networkName
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_IP_INFORMATION"
                , 'value': this.phynet_create.subnetIP
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_MASK"
                , 'value': this.phynet_create.subnetMask
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': this.phynet_create.gateway
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_IP_INFORMATION"
                , 'value': this.phynet_create.subnetIP
                , "op": "ip"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_MASK"
                , 'value': this.phynet_create.subnetMask
                , "op": "ipmask"
            },            
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': this.phynet_create.gateway
                , "op": "ip"
            },
            {
                "name": "DNS1"
                , 'value': this.phynet_create.dnsPre
                , "op": "iporempty"
            },
            {
                "name": "DNS2"
                , 'value': this.phynet_create.dnsAlt
                , "op": "iporempty"
            },            
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': [this.phynet_create.gateway, this.phynet_create.subnetIP, this.phynet_create.subnetMask]
                , "op": "gatewayinsubnetandmask"
            },
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined) 

        if (notValid !== void 0) {
            console.log("validateSubnetModify Failed!!!");
            this.createphynetbox.close();
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.createphynetbox.open();                
            };            
            return false;
        } else {
            console.log("validateSubnetModify OK!!!");
            return true;
        }
    }

    acceptPhyNetCreateModify(): void {
        console.log('clicked acceptPhyNetCreateModify');        
        if (this.validatePhyNetCreateInfo()) {
            this.layoutService.show();
            this.service.createPhyNet(this.phynet_create)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "PHY_NET_MNG.CREATE_PHY_NET_SUCCESS")
                    } else {
                        this.createphynetbox.close();
                        this.showMsg("PHY_NET_MNG.CREATE_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(()=>{                    
                    this.createphynetbox.close();
                    this.getPhyNetList();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.CREATE_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.createphynetbox.close();
                    this.showMsg("PHY_NET_MNG.CREATE_PHY_NET_EXCEPTION");
                    this.okCallback = () => { 
                        this.createphynetbox.open();  };
                })
        }
    }

    cancelPhyNetCreateModify(): void {
        this.phynet_create.dnsAlt = "";
        this.phynet_create.dnsPre = "";
        this.phynet_create.gateway = "";
        this.phynet_create.networkName = "";
        this.phynet_create.subnetIP = "";
        this.phynet_create.subnetMask = "";
    }

    //Menu: 编辑网络
    editPhyNet(): void {
        let phynet = this.getSelected();
        if (phynet) {
            this.selectedphynet = phynet;
            this.phynet_changed.dnsAlt = this.selectedphynet.dnsAlt;
            this.phynet_changed.dnsPre = this.selectedphynet.dnsPre;
            this.phynet_changed.gateway = this.selectedphynet.gateway;
            this.phynet_changed.networkName = this.selectedphynet.networkName;
            this.phynet_changed.subnetIP = this.selectedphynet.subnetIP;
            this.phynet_changed.subnetMask = this.selectedphynet.subnetMask;
            this.editphynetbox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return;
        }
    }

    validatePhyNetEditInfo(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "PHY_NET_MNG.PHY_NET_NAME"
                , 'value': this.phynet_changed.networkName
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_IP_INFORMATION"
                , 'value': this.phynet_changed.subnetIP
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_MASK"
                , 'value': this.phynet_changed.subnetMask
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': this.phynet_changed.gateway
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_IP_INFORMATION"
                , 'value': this.phynet_changed.subnetIP
                , "op": "ip"
            },
            {
                "name": "PHY_NET_MNG.SUBNET_MASK"
                , 'value': this.phynet_changed.subnetMask
                , "op": "ipmask"
            },            
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': this.phynet_changed.gateway
                , "op": "ip"
            },
            {
                "name": "DNS1"
                , 'value': this.phynet_changed.dnsPre
                , "op": "iporempty"
            },
            {
                "name": "DNS2"
                , 'value': this.phynet_changed.dnsAlt
                , "op": "iporempty"
            },            
            {
                "name": "PHY_NET_MNG.GATEWAY_ADDRESS"
                , 'value': [this.phynet_changed.gateway, this.phynet_changed.subnetIP, this.phynet_changed.subnetMask]
                , "op": "gatewayinsubnetandmask"
            },
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined) 

        if (notValid !== void 0) {
            console.log("validateSubnetModify Failed!!!");
            this.editphynetbox.close();
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.editphynetbox.open();                
            };            
            return false;
        } else {
            console.log("validateSubnetModify OK!!!");
            return true;
        }
    }

    acceptPhyNetEditModify(): void {
        console.log('clicked acceptPhyNetCreateModify');        
        if (this.validatePhyNetEditInfo()) {
            this.layoutService.show();
            this.service.editPhyNet(this.phynet_changed)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {
                        console.log(res, "PHY_NET_MNG.EDIT_PHY_NET_SUCCESS")
                    } else {
                        this.editphynetbox.close();
                        this.showMsg("PHY_NET_MNG.EDIT_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.selectedphynet.dnsAlt = this.phynet_changed.dnsAlt;
                    this.selectedphynet.dnsPre = this.phynet_changed.dnsPre;
                    this.selectedphynet.gateway = this.phynet_changed.gateway;
                    this.selectedphynet.networkName = this.phynet_changed.networkName;
                    this.selectedphynet.subnetIP = this.phynet_changed.subnetIP;
                    this.selectedphynet.subnetMask = this.phynet_changed.subnetMask;
                    this.editphynetbox.close();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.EDIT_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.editphynetbox.close();
                    this.showMsg("PHY_NET_MNG.EDIT_PHY_NET_EXCEPTION");
                    this.okCallback = () => {
                        this.editphynetbox.open();
                    };
                })
        }
    }

    cancelPhyNetEditModify(): void {
        this.phynet_changed.dnsAlt = "";
        this.phynet_changed.dnsPre = "";
        this.phynet_changed.gateway = "";
        this.phynet_changed.networkName = "";
        this.phynet_changed.subnetIP = "";
        this.phynet_changed.subnetMask = "";
    }

    //Menu: 网络资源分配
    setupPhyNetResource(): void {
        let pn = this.getSelected();
        if(pn){
            this.selectedphynet = pn;
            this.router.navigate([`phy-mng/phy-net/phy-net-setup-resource`, {"pn_id": this.selectedphynet.id}]);
        }
    }

    //Menu: 设置子网IP地址范围
    setupPhyNetIPs(): void {
        let phynet = this.getSelected();
        if (phynet) {
            this.selectedphynet = phynet;
            this.ipscope_changed.dnsAlt = this.selectedphynet.dnsAlt;
            this.ipscope_changed.dnsPre = this.selectedphynet.dnsPre;
            this.ipscope_changed.gateway = this.selectedphynet.gateway;
            this.ipscope_changed.networkName = this.selectedphynet.networkName;
            this.ipscope_changed.subnetIP = this.selectedphynet.subnetIP;
            this.ipscope_changed.subnetMask = this.selectedphynet.subnetMask;
            this.ipscope_changed.subnetCIDR = this.selectedphynet.subnetCIDR;
            this.ipscope_changed.id = this.selectedphynet.id;
            this.layoutService.show();
            this.service.getPhyNetIpRange(this.ipscope_changed.id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) { 
                    this.ipscope_changed = response.resultContent;
                    console.log(this.ipscope_changed, "this.ipscope_changed");
                } else {
                    this.showAlert("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => this.onRejected(e));
            this.ipsbox.open();
        } else {          
            this.showAlert("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return;
        }

    }

    validatePhyNetIPModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "PHY_NET_MNG.SUBNET_IP_INFORMATION"
                , 'value': this.ipscope_changed.subnetCIDR
                , "op": "cidr"
            },
            {
                "name": "PHY_NET_MNG.IP_ADDRESS_SCOPE"
                , 'value': this.ipscope_changed.ipRange
                , "op": "*"
            },
            {
                "name": "PHY_NET_MNG.IP_ADDRESS_SCOPE"
                , 'value': [this.ipscope_changed.ipRange, this.ipscope_changed.subnetCIDR]
                , "op": "ipscope"
            },
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined);

        if (notValid !== void 0) {
            console.log("validateIPModify Failed!!!");
            this.ipsbox.close();
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.ipsbox.open();
            };            
            return false;
        } else {
            console.log("validateIPModify OK!!!")
            return true;
        }
    }

    acceptPhyNetIPsModify(): void {
        //console.log('clicked acceptIPsModify');        
        if (this.validatePhyNetIPModify()) {
            this.layoutService.show();
            this.service.updatePhyNetIpRange(this.ipscope_changed)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.ipsbox.close();
                        this.showMsg("PHY_NET_MNG.SET_IP_SCOPE_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    this.getPhyNetList();
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('设置IP地址范围异常', err);
                    this.layoutService.hide();
                    this.ipsbox.close();
                    this.showMsg("PHY_NET_MNG.SET_IP_SCOPE_EXCEPTION");
                    this.okCallback = () => { 
                        this.ipsbox.open();  };
                })
        }
    }

    cancelPhyNetIPsModify(): void {
        //console.log('clicked cancelIPsModify');
        this.ipscope_changed.ipRange = "";
        this.ipscope_changed.dnsAlt = "";
        this.ipscope_changed.dnsPre = "";
        this.ipscope_changed.gateway = "";
        this.ipscope_changed.networkName = "";
        this.ipscope_changed.subnetIP = "";
        this.ipscope_changed.subnetMask = "";
        this.ipscope_changed.subnetCIDR = "";
        this.ipscope_changed.id = "";
    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        let pn = this.getSelected();
        if(pn){
            this.selectedphynet = pn;
            this.router.navigate([`phy-mng/phy-net/phy-net-mng-ip-addr`, 
            {
                "pn_id": this.selectedphynet.id,
                "pn_name": this.selectedphynet.networkName
            }]);
        }
    }

    //Menu: 导出IP地址信息
    
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

    //根据value显示
    displayIt(value: any): any {
        if(this.validationService.isBlank(value)){
            //console.log(value, "In dispalyIt()1")
            //return "未设置";
            return "COMMON.UNSET";
        } else {
            //console.log(value, "In dispalyIt()2")
            return value.toString();            
        }
    }

    //选择行
    selectItem(index:number): void {
        this.phynets.map(n=> {n.checked = false;});
        this.phynets[index].checked = true;
        console.log(this.phynets, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.phynets.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item = this.phynets.find((n) => n.checked) as PhyNetListModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return null;
        }
    }

    onSelect(phynet: PhyNetListModel): void {
        let tmpphynet = new PhyNetListModel();
        tmpphynet.id = phynet.id;
        tmpphynet.gateway = phynet.gateway;
        tmpphynet.ipAllCount = phynet.ipAllCount;
        tmpphynet.ipFreeCount = phynet.ipFreeCount;
        tmpphynet.ipUsedCount = phynet.ipUsedCount;
        tmpphynet.networkName = phynet.networkName;
        tmpphynet.status = phynet.status;
        tmpphynet.subnetCIDR = phynet.subnetCIDR;
        this.selectedphynet = tmpphynet;
    }

    //Menu: 启用网络
    enablePhyNet(): void {
        console.log('call enablePhyNet');
        let pn = this.getSelected();
        if (pn) {
            this.selectedphynet = pn;
            if (this.selectedphynet.status == this.statusDictArray.find(n => n.code === "enable").value) {
                this.showMsg("PHY_NET_MNG.PHY_NET_ENABLED");
                return;
            }
            this.enablebox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return;
        }
    }

    acceptPhyNetEnableModify(): void {
        console.log('clicked acceptPhyNetEnableModify');        
        if (this.selectedphynet) {
            this.layoutService.show();
            this.service.updateStatusPhyNet(this.selectedphynet.id, this.statusDictArray.find(n => n.code === "enable").value)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.selectedphynet.status = <string>this.statusDictArray.find(n => n.code === "enable").value;
                        console.log(res, "PHY_NET_MNG.ENABLE_PHY_NET_SUCCESS")
                    } else {
                        this.enablebox.close();
                        this.showMsg("PHY_NET_MNG.ENABLE_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.enablebox.close();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.ENABLE_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.enablebox.close();
                    this.showMsg("PHY_NET_MNG.ENABLE_PHY_NET_EXCEPTION");
                    this.okCallback = () => { this.enablebox.open(); };
                })
        }
    }

    cancelPhyNetEnableModify(): void {
        console.log('clicked cancelPhyNetEnableModify');
    }

    //Menu: 禁用网络
    disablePhyNet(): void {
        console.log('call disablePhyNet');
        let pn = this.getSelected();
        if (pn) {
            this.selectedphynet = pn;
            if(this.selectedphynet.status == this.statusDictArray.find(n => n.code === "disable").value){
                this.showMsg("PHY_NET_MNG.PHY_NET_DISABLED");
                return; 
            }
            this.disablebox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return; 
        }
    }

    acceptPhyNetDisableModify(): void {
        console.log('clicked acceptPhyNetDisableModify');        
        if (this.selectedphynet) {
            this.layoutService.show();
            console.log(this.selectedphynet.id);
            this.service.updateStatusPhyNet(this.selectedphynet.id, this.statusDictArray.find(n => n.code === "disable").value)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.selectedphynet.status = <string>this.statusDictArray.find(n => n.code === "disable").value;
                        console.log(res, "PHY_NET_MNG.DISABLE_PHY_NET_SUCCESS")
                    } else {
                        this.disablebox.close();
                        this.showMsg("PHY_NET_MNG.DISABLE_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.disablebox.close();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.DISABLE_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.disablebox.close();
                    this.showMsg("PHY_NET_MNG.DISABLE_PHY_NET_EXCEPTION");
                    this.okCallback = () => { this.disablebox.open(); };
                })
        }
    }

    cancelPhyNetDisableModify(): void {
        console.log('clicked cancelPhyNetDisableModify');
    }

    //Menu: 删除网络
    deletePhyNet(): void {
        console.log('call deletePhyNet');
        let pn = this.getSelected();
        if (pn) {
            this.selectedphynet = pn;
            if(this.selectedphynet.status == this.statusDictArray.find(n => n.code === "delete").value){
                this.showMsg("PHY_NET_MNG.PHY_NET_DELETED");
                return; 
            }
            if(this.selectedphynet.status == this.statusDictArray.find(n => n.code === "enable").value){
                this.showMsg("PHY_NET_MNG.PHY_NET_NEED_TO_DISABLED_FIRSTLY");
                return; 
            }
            this.deletebox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_NETWORK");
            return; 
        }
    }

    acceptPhyNetDeleteModify(): void {
        console.log('clicked acceptPhyNetDeleteModify');        
        if (this.selectedphynet) {
            this.layoutService.show();
            console.log(this.selectedphynet.id);
            this.service.updateStatusPhyNet(this.selectedphynet.id, this.statusDictArray.find(n => n.code === "delete").value)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.selectedphynet.status = <string>this.statusDictArray.find(n => n.code === "delete").value;
                        console.log(res, "PHY_NET_MNG.DELETE_PHY_NET_SUCCESS")
                    } else {
                        this.deletebox.close();
                        this.showMsg("PHY_NET_MNG.DELETE_PHY_NET_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.deletebox.close();
                    this.getPhyNetList();
                })
                .catch(err => {
                    console.log('PHY_NET_MNG.DELETE_PHY_NET_EXCEPTION', err);
                    this.layoutService.hide();
                    this.deletebox.close();
                    this.showMsg("PHY_NET_MNG.DELETE_PHY_NET_EXCEPTION");
                    this.okCallback = () => { this.deletebox.open(); };
                })
        }
    }

    cancelPhyNetDeleteModify(): void {
        console.log('clicked cancelPhyNetDeleteModify');
    }

}