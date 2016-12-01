import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../../architecture';

//model 
import { IpMngModel, DCModel, SwitchModel, subnetModel, subnetInfoModel, subnetIpModel, IpUsageMngModel } from '../model/ip-mng.model';


//service
import { IpMngListService } from '../service/ip-mng-list.service';
import { IPValidationService } from '../service/ip-mng.validation.service';

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/vmware-dis-ip-mng.html',
    styleUrls: [],
    providers: [
        IpMngListService,
        IPValidationService
    ]
})

export class IpMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : IpMngListService,
        private layoutService : LayoutService,
        private validationService: ValidationService,
        private ipService: IPValidationService,
        private activatedRouter: ActivatedRoute
    ){
/*
        if (activatedRouter.snapshot.params["pg_id"]) {
            this.dc = activatedRouter.snapshot.params["pg_id"] || "";
        } else {
            this.dc = "pg_all";
        }
*/
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("subnetbox")
    subnetbox: PopupComponent;

    @ViewChild("ipsbox")
    ipsbox: PopupComponent;
	
	noticeTitle = "";
    noticeMsg = "";

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    selectedVDS = "";//当前选中的可用区
    dcList: Array<DCModel>;

    rawipmngs: Array<IpMngModel>;
    ipmngs: Array<IpMngModel>;

    subn: subnetModel = new subnetModel();
    ippool: subnetIpModel = new subnetIpModel();
    subnetInfo: subnetInfoModel = new subnetInfoModel();

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
    //启用，禁用，删除的处理
    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }



    ngOnInit (){
        console.log('init');
        this.getDcList();

        this.activatedRouter.params.forEach((params: Params) => {
            if (params["dc_name"] != null) {
                this.selectedDC.dcName = params["dc_name"];                
                console.log(this.selectedDC.dcName, "this.selectedDC.dcName");
            }
            if (params["cls_name"] != null) {
                this.selectedVDS = params["cls_name"];
                console.log(this.selectedVDS, "this.selectedVDS");
            }
        });

        this.getIpMngList();
    }

    getDcList() {
        this.layoutService.show();
        this.service.getDCList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.dcList = response["resultContent"];
                        console.log(this.dcList, "this.dcList--------------------");
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.ipmngs = this.rawipmngs.filter((item)=>{
            return ( this.selectedVDS == "" || item.switchId == this.selectedVDS ) &&
            ( this.selectedDC.dcId == "" || item.dcId == this.selectedDC.dcId )
        })
        this.UnselectItem();
    }

    getIpMngList(): void {
        this.layoutService.show();
        this.service.getIpMngList()
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "IPmngS!!!");
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.rawipmngs = response.resultContent;
                    this.filter();
                    console.log(this.ipmngs, "IPmngS 11111111111111111111111");
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();
                }
            })
            .catch((e) => this.onRejected(e));
    }

    //Menu: 设置IP子网
    setupSubnet(): void {
        console.log('conponent: net-mng/vm-dist-mng/ip-mng-list/subnet');
        //this.layoutService.show();
        let pg = this.getSelected();
        console.log(pg, "========== setupSubnet =============");
         if (pg) {
             // OR get subenet information from API
            this.subn.portGroup = pg.id;
            this.service.getSubnetInfoIps(this.subn.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.subnetInfo = response.resultContent;
                    this.subn.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.subn.subnetMask = this.subnetInfo.subnetMask;
                    this.subn.gateway = this.subnetInfo.gateway;
                    this.subn.dnsPre = this.subnetInfo.dnsPre;
                    this.subn.dnsAlt = this.subnetInfo.dnsAlt;
                    console.log(this.subn, "subn 11111111111111111111111");
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();
                }
            })
            .catch((e) => this.onRejected(e));
            this.subnetbox.open();            
        } else {          
            this.showAlert("请选择相应的PortGroup");
            this.layoutService.hide();
            return;
        }
    }

    //Menu: 设置子网IP地址范围
    setupIPs(): void {
        console.log('conponent: net-mng/vm-dist-mng/ip-mng-list/ips');
        let pg = this.getSelected();
        console.log(pg, "============ setupIPs ===========");
        this.layoutService.show();
        if (pg) {
            // OR get subenet information from API
            this.layoutService.hide();
            this.ippool.portGroup = pg.id;
            this.service.getSubnetInfoIps(this.subn.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.subnetInfo = response.resultContent;
                    this.ippool.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.ippool.gateway = this.subnetInfo.gateway;
                    this.ippool.ips = this.subnetInfo.range;
                    console.log(this.ippool, "ippool 11111111111111111111111");
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();
                }
            })
            .catch((e) => this.onRejected(e));
            //this.ippool.portGroup = pg.id;
            //this.ippool.subnetCIDR = pg.segmentCIDR;
            //this.ippool.gateway = pg.gateWay;
            this.ipsbox.open();

        } else {          
            this.showAlert("请选择相应的PortGroup");
            this.layoutService.hide();
            return;
        }

    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        //attest = attest || new Attest();
        //this.router.navigate([`net-mng/ipusage-mng-list/${this.dc}`]);
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`net-mng/vm-dist-mng/ipusage-mng-list`, { "pg_id": pg.id, "pg_name": pg.switchName}]);
        }        
    }

    //Menu: 返回上一层, 可以在[返回上一层]调用
    vmwareNetworkPage() {
        this.router.navigate([`net-mng/vm-dist-mng/vm-mng`]);     
    }

    acceptIPsModify(): void {
        console.log('clicked acceptIPsModify');
        if (this.validateIPModify()) {
            console.log('clicked acceptIPsModify 2');
            this.service.updateSubnetIPs(this.ippool.portGroup, this.ippool)
                .then(res => {
                    console.log('clicked acceptIPsModify 3');
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        console.log('clicked acceptIPsModify 4');
                        this.showMsg("设置IP地址范围失败");
                        return;
                    }
                })
                .then(()=>{
                    console.log('clicked acceptIPsModify 5');
                    this.getIpMngList();
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptIPsModify 6');
                    console.log('设置IP地址范围,请检查填入项', err);
                    this.showMsg("设置IP地址范围,请检查填入项");
                    this.okCallback = () => { this.ipsbox.open(); };
                })
        }
    }

    cancelIPsModify(): void {
        console.log('clicked cancelIPsModify');
        this.ippool.ips = [];
        this.ippool.subnetCIDR = "";
        this.ippool.gateway = "";
    }

    acceptSubnetModify(): void {
        console.log('clicked acceptSubnetModify');
        if (this.validateSubnetModify()) {
            this.service.updateSubnet(this.subn.portGroup, this.subn)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置IP子网成功");                        
                    } else {
                        this.showMsg("设置IP子网失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getIpMngList();
                    this.subnetbox.close();
                })
                .catch(err => {
                    this.subnetbox.close();
                    console.log('设置IP子网,请检查填入项', err);
                    this.showMsg("设置IP子网,请检查填入项");
                    this.okCallback = () => { this.subnetbox.open(); };
                })
        }        
    }

    cancelSubnetModify(): void {
        console.log('clicked cancelSubnetModify');
        this.subn.dnsAlt = "";
        this.subn.dnsPre = "";
        this.subn.gateway = "";
        this.subn.subnetCIDR = "";
        this.subn.subnetMask = "";        
    }

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
    }

	showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    //根据value显示
    displayIt(value: string): String {
        if(this.validationService.isBlank(value)){
            return "未设置";
        } else {
            return value;
        }
    }

    //选择行
    selectItem(index:number): void {
        this.ipmngs.map(n=> {n.checked = false;});
        this.ipmngs[index].checked = true;
        console.log(this.ipmngs, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.ipmngs.map(n=> {n.checked = false;});
        //console.log(this.ipmngs, "=== Please see all items are Unselected ===");
    }

    getSelected() {
        let item = this.ipmngs.find((n) => n.checked) as IpMngModel;
        if (item){
            //console.log("==========getSelected 1=============");
            return item;
        }
        else {
            //console.log("==========getSelected 2=============");
            this.showMsg("请选择相应的PortGroup");
            return null;
        }
    }


    //验证设置IP地址范围内容
    validateIPModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "IP地址范围"
                , 'value': this.ippool.ips
                , "op": "*"
            },
            {
                "name": "IP地址范围"
                , 'value': [this.ippool.ips, this.ippool.subnetCIDR]
                , "op": "ipscope"
            }
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)
        
        console.log(notValid, "notValid!!!")

        if (notValid !== void 0) {
            this.showMsg(this.ipService.validate(notValid.name, notValid.value, notValid.op));
            this.ipsbox.close();
            this.okCallback = () => {
                this.ipsbox.open();                
            };
            
            return false;
        } else {
            return true;
        }
    }

    //验证设置子网内容
    validateSubnetModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "子网信息"
                , 'value': this.subn.subnetCIDR
                , "op": "*"
            },
            {
                "name": "子网掩码"
                , 'value': this.subn.subnetMask
                , "op": "*"
            },
            {
                "name": "网关地址"
                , 'value': this.subn.gateway
                , "op": "*"
            },
            {
                "name": "子网掩码"
                , 'value': this.subn.subnetMask
                , "op": "ipmask"
            },            
            {
                "name": "网关地址"
                , 'value': this.subn.gateway
                , "op": "ip"
            },
            {
                "name": "DNS1"
                , 'value': this.subn.dnsPre
                , "op": "iporempty"
            },
            {
                "name": "DNS2"
                , 'value': this.subn.dnsAlt
                , "op": "iporempty"
            },
            //1: 子网信息正确，2：netmask和gateway在子网信息中
            //*
            {
                "name": "子网信息"
                , 'value': this.subn.subnetCIDR
                , "op": "cidr"
            },
            {
                "name": "网关地址"
                , 'value': [this.subn.gateway, this.subn.subnetCIDR]
                , "op": "gatewayinsubnet"
            },
            {
                "name": "子网掩码"
                , 'value': [this.subn.subnetMask, this.subn.subnetCIDR]
                , "op": "maskinsubnet"
            },
            //*/
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)
        
        console.log(notValid, "notValid!!!")

        if (notValid !== void 0) {
            this.showMsg(this.ipService.validate(notValid.name, notValid.value, notValid.op));
            this.subnetbox.close();
            this.okCallback = () => {
                this.subnetbox.open();                
            };
            
            return false;
        } else {
            return true;
        }
    }

}