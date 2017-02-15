import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { TranslateService } from 'ng2-translate';

/*/Mock
import { RegionInfo_mock } from '../model/vmware-net.mock';

//Model
import { PlatformModel, DCModel, RegionModel, VmwareNetModel, NsxNetModel, VmNetStatusModel } from '../model/vmware-net.model';

//Service
import { VmwareMngIndexService } from '../service/vm-mng-index.service';
import { IPValidationService } from '../service/validation.service';
import { selectedPlatform } from "../service/platform.service";
*/

@Component({
    selector: "phy-net-mng-list",
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
        //private service: VmwareMngIndexService,
        //private ipService: IPValidationService,
        private translateService: TranslateService
    ) {
    }
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("createphynet")
    createphynet: PopupComponent;

    @ViewChild("ipsbox")
    ipsbox: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    EnableButton:number = 0;

    typeDictArray: Array<SystemDictionary> = [];
    nsxresDictArray: Array<SystemDictionary> = [];
    nsxverDictArray: Array<SystemDictionary> = [];

    nsxTestFlag: string = "";
    enablepopbutton:boolean = false;    

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
        //this.getRegionInfo();

        /*

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
        */
    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        this.router.navigate([`phy-mng/phy-net/phy-net-ips-mng`]);
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

    //创建网络
    createPhyNet(): void {
        this.layoutService.hide();
        this.createphynet.open();
    }

    acceptPhyNetCreateModify(): void {
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

    cancelPhyNetCreateModify(): void {
        /*
        console.log('clicked cancelIPsModify');
        this.ippool.ips = [];
        this.ippool.ipstr = "";
        this.ippool.subnetCIDR = "";
        this.ippool.subnetMask = "";
        this.ippool.gateway = "";
        */
    }

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
    
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("NET_MNG_VM_IP_MNG.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
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
            return "NET_MNG_VM_IP_MNG.UNSET";
        } else {
            //console.log(value, "In dispalyIt()2")
            return value.toString();
            
        }
    }

    //选择行
    selectItem(index:number): void {
        //this.ipmngs.map(n=> {n.checked = false;});
        //this.ipmngs[index].checked = true;
        //console.log(this.ipmngs, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        //this.ipmngs.map(n=> {n.checked = false;});
    }

    getSelected() {
        let item// = this.ipmngs.find((n) => n.checked) as IpMngModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return null;
        }
    }

}