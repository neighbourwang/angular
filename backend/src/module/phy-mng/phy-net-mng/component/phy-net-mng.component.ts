import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PaginationComponent, PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { TranslateService } from 'ng2-translate';

//Model
import { PhyNetListModel, PhyNetCreateModel, PhyNetEditModel, PhyResPoolModel, PhyNetDetailsModel } from '../model/phy-net.model';

//Service
import { PhyNetMngService } from '../service/phy-net-mng.service';

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

        this.service.statusDict
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
                    this.showAlert("HOST_VMWARE_MNG.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //Menu: 查看网络信息
    showDetails() {
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`phy-mng/phy-net/phy-net-details`]);
        }
    }
    

    //Menu: 创建网络
    createPhyNet(): void {
        this.layoutService.hide();
        this.createphynetbox.open();
    }

    validatePhyNetInfo(): boolean {
        return true;
    }

    acceptPhyNetCreateModify(): void {
        console.log('clicked acceptPhyNetCreateModify');
        this.layoutService.show();
        if (this.validatePhyNetInfo()) {
            this.service.createPhyNet(this.phynet_create)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "创建物理机网络成功")
                    } else {
                        this.createphynetbox.close();
                        this.showMsg("创建物理机网络失败");
                        return;
                    }
                })
                .then(()=>{                    
                    this.createphynetbox.close();
                    this.getPhyNetList();
                })
                .catch(err => {
                    console.log('创建物理机网络异常', err);
                    this.layoutService.hide();
                    this.createphynetbox.close();
                    this.showMsg("创建物理机网络异常");
                    this.okCallback = () => { 
                        this.createphynetbox.open();  };
                })
        } else {
            this.layoutService.hide();
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
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return;
        }
    }


    acceptPhyNetEditModify(): void {
        console.log('clicked acceptPhyNetCreateModify');
        this.layoutService.show();
        if (this.validatePhyNetInfo()) {
            this.service.editPhyNet(this.phynet_changed)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {
                        console.log(res, "编辑物理机网络成功")
                    } else {
                        this.editphynetbox.close();
                        this.showMsg("编辑物理机网络失败");
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
                    console.log('编辑物理机网络异常', err);
                    this.layoutService.hide();
                    this.editphynetbox.close();
                    this.showMsg("编辑物理机网络异常");
                    this.okCallback = () => {
                        this.editphynetbox.open();
                    };
                })
        } else {
            this.layoutService.hide();
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

    //Menu: 设置子网IP地址范围
    setupPhyNetIPs(): void {
        console.log('conponent: net-mng/vm-mng/ip-mng-list/ips');
        //this.pg = this.getSelected();
        //if (this.pg) {
        if (true) {
            /*
            this.ippool.portGroup = this.pg.id;
            console.log(this.ippool.portGroup, "========== setupIPs =============");
            this.layoutService.show();
            this.service.getSubnetInfoIps(this.ippool.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) { 
                    this.subnetInfo = response.resultContent;
                    console.log(this.subnetInfo, "this.subnetInfo")
                    this.ippool.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.ippool.gateway = this.subnetInfo.gateway;
                    this.ippool.subnetMask = this.subnetInfo.subnetMask;
                    this.ippool.ips = this.subnetInfo.range;
                    if(!this.ippool.ips){
                        console.log("No ips from response!");
                        this.ippool.ipstr = "";
                    } else {
                        console.log("Ips from response!");
                        this.ippool.ipstr = this.ippool.ips.join('');
                    }
                    console.log(this.ippool.ips, this.ippool.ipstr, this.ippool, "ips, ipstr, and ippool object");
                } else {
                    console.log("========== setupIPs [if]else=============");
                    this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    //alert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
            */
            this.layoutService.hide();
            this.ipsbox.open();

        } else {          
            //this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            //return;
        }

    }

    acceptPhyNetIPsModify(): void {
        /*
        console.log('clicked acceptIPsModify');
        this.layoutService.show();
        if (this.validateIPModify()) {
            //console.log('clicked acceptIPsModify 2');
            this.service.updateSubnetIPs(this.ippool.portGroup, this.ippool)
                .then(res => {
                    //console.log('clicked acceptIPsModify 3');
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        console.log('clicked acceptIPsModify 4');
                        this.ipsbox.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    console.log('clicked acceptIPsModify 5');
                    this.getIpMngList(); // Need to get list since we need to get ipcount after setting up ipscope.
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptIPsModify 6');
                    console.log('设置IP地址范围异常', err);
                    this.layoutService.hide();
                    this.ipsbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_EXCEPTION");
                    this.okCallback = () => { 
                        this.ipsbox.open();  };
                })
        } else {
            this.layoutService.hide();
        }
        */
    }

    cancelPhyNetIPsModify(): void {
        /*
        console.log('clicked cancelIPsModify');
        this.ippool.ips = [];
        this.ippool.ipstr = "";
        this.ippool.subnetCIDR = "";
        this.ippool.subnetMask = "";
        this.ippool.gateway = "";
        */
    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`phy-mng/phy-net/phy-net-mng-ip-addr`]);
        }
        /*
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`phy-mng/phy-net/phy-net-ips-mng`,  
            {
                //"pg_id": pg.id,
                //"pg_name": pg.clusterName,
                //"pid": this.platformId
            }]);
        }
        */
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
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
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
                this.showMsg("HOST_VMWARE_MNG.IMAGE_ENABLED");
                return;
            }
            this.enablebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
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
                        console.log(res, "网络启用成功")
                    } else {
                        this.enablebox.close();
                        this.showMsg("网络启用失败");
                        return;
                    }
                })
                .then(() => {
                    this.enablebox.close();
                })
                .catch(err => {
                    console.log('网络启用异常', err);
                    this.layoutService.hide();
                    this.enablebox.close();
                    this.showMsg("网络启用异常");
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
                this.showMsg("HOST_VMWARE_MNG.IMAGE_DISABLED");
                return; 
            }
            this.disablebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
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
                        console.log(res, "网络禁用成功")
                    } else {
                        this.disablebox.close();
                        this.showMsg("网络禁用失败");
                        return;
                    }
                })
                .then(() => {
                    this.disablebox.close();
                })
                .catch(err => {
                    console.log('网络禁用异常', err);
                    this.layoutService.hide();
                    this.disablebox.close();
                    this.showMsg("网络禁用异常");
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
                this.showMsg("HOST_VMWARE_MNG.IMAGE_DISABLED");
                return; 
            }
            this.deletebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
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
                        console.log(res, "网络删除成功")
                    } else {
                        this.deletebox.close();
                        this.showMsg("网络删除失败");
                        return;
                    }
                })
                .then(() => {
                    this.deletebox.close();
                    this.getPhyNetList();
                })
                .catch(err => {
                    console.log('网络删除异常', err);
                    this.layoutService.hide();
                    this.deletebox.close();
                    this.showMsg("网络删除异常");
                    this.okCallback = () => { this.deletebox.open(); };
                })
        }
    }

    cancelPhyNetDeleteModify(): void {
        console.log('clicked cancelPhyNetDeleteModify');
    }

}