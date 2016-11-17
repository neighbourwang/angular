import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { IpMngQuery } from '../model/ipquery.model';
//import { IpUsageQuery } from '../model/ipusagequery.model';
import { subnetModel } from '../model/subnet.model';
import { subnetIpModel } from '../model/subnet-ip.model';


//service
import { IpMngListService } from '../service/ip-mng-list.service';

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/ip_addr_mng.html',
    styleUrls: [],
    providers: []
})

export class IpMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : IpMngListService,
        private layoutService : LayoutService,
        private validationService: ValidationService,
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

	/*
    @ViewChild("pager")
    pager: PaginationComponent;
	pageIndex = 1;
    pageSize = 10;
    totalPage = 1;
    */

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

    rawipmngs: Array<IpMngModel>;
    ipmngs: Array<IpMngModel>;
    ipmng: IpMngModel = new IpMngModel();
    ipmngquery: IpMngQuery = new IpMngQuery();
    cluster: Array<string>;
    datacenter: Array<string>;

    subn: subnetModel = new subnetModel();
    ippool: subnetIpModel = new subnetIpModel();

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
        this.getDcCluster();

        this.activatedRouter.params.forEach((params: Params) => {
            if (params["dc_name"] != null) this.ipmngquery.dataCenter = params["dc_name"];
            if (params["cls_name"] != null) this.ipmngquery.cluster = params["cls_name"];
            console.log(this.ipmngquery.dataCenter, "this.ipmngquery.dataCenter");
            console.log(this.ipmngquery.cluster, "this.ipmngquery.cluster");
        });

        this.getIpMngList();
    }

    getDcCluster(): void {
        this.layoutService.show();
        this.service.getDcCluster().then(res => {
            if (res.resultCode !== "100") {
                throw "";
            }
            return res.resultContent;
        }).then((resultContent) => {
            console.log(resultContent, "Areas!!!");
            this.datacenter = resultContent.dcNameList;            
            this.cluster = resultContent.areaNameList;
            console.log(this.datacenter);
            console.log(this.cluster);
            this.layoutService.hide();
        }).catch(error => {
            console.log("getDcCluster error!");
            this.layoutService.hide();
        });
    }

    filter(): void {
        this.ipmngs = this.rawipmngs.filter((item)=>{
            return (this.ipmngquery.cluster == "" || item.clusterName == this.ipmngquery.cluster) && 
            (this.ipmngquery.dataCenter == "" || item.dataCenter == this.ipmngquery.dataCenter)

        })
    }


    getIpMngList(): void {
        console.log(this.ipmngquery, "Query!!!");
        this.layoutService.show();
        this.service.getIpMngList()
            .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "IPmngS!!!");
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

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
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
    selectItem(index:number):void
    {
        this.ipmngs.map(n=> {n.checked = false;});
        this.ipmngs[index].checked = true;
        console.log(this.ipmngs, "===============");
    }

    getSelected() {
        let item = this.ipmngs.find((n) => n.checked) as IpMngModel;
        if (item){
            console.log("==========getSelected 1=============");
            return item;
        }
        else {
            console.log("==========getSelected 2=============");
            this.showMsg("请选择相应的PortGroup");
            return null;
        }
    }

    setupSubnet(): void {
        console.log('conponent: net-mng/ip-mng-list/subnet');
        //this.layoutService.show();
        let pg = this.getSelected();
        console.log(pg, "==========setupSubnet=============");
         if (pg) {
             // OR get subenet information from API
            this.subn.portGroup = pg.id;
            this.subnetbox.open();            
        }
    }

    setupIPs(): void {
        console.log('conponent: net-mng/ip-mng-list/ips');
        let pg = this.getSelected();
        console.log(pg, "=======================");
        this.layoutService.show();
        if (pg) {
            this.layoutService.hide();
            // OR get ippool information from API
            this.ippool.portGroup = pg.id;
            this.ippool.subnetCIDR = pg.segmentCIDR;
            this.ippool.gateway = pg.gateWay;
            this.ipsbox.open();

        } else {          
            this.showAlert("请选择相应的PortGroup");
            this.layoutService.hide();
            return;
        }

    }

    ipUsageMngPage() {
        //attest = attest || new Attest();
        //this.router.navigate([`net-mng/ipusage-mng-list/${this.dc}`]);
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`net-mng/ipusage-mng-list`, { "pg_id": pg.id, "pg_name": pg.clusterName}]);
        }
        
    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
    }

    isIP(val: any): boolean {
        const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
        return reg.test(val);
    }

    isIPorEmpty(val: any): boolean {
        if (this.validationService.isBlank(val)) return true;
        else {
            const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
            return reg.test(val);
        }
    }

    isIPMask(val: any): boolean {
        const reg = /^(((128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(0|128|192|224|240|248|252|254)\.0\.0)|(255\.255\.(0|128|192|224|240|248|252|254)\.0)|(255\.255\.255\.(0|128|192|224|240|248|252|254)))$/
        return reg.test(val);
    }

    isIPpool(val: any): boolean {
        //console.log(val, "val--------------------1")
        let flag = 0;
        const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
        val = val.replace(/\s+/g, "");
        //console.log(val, "val--------------------2")
        let arrayips = val.split(';');
        //console.log(arrayips, "arrayips--------------------3")
        for (let i = 0; i < arrayips.length; i++) {
            let lineips = arrayips[i].split(',');
            //console.log(lineips, "lineips--------------------4")
            for (let j = 0; j < lineips.length; j++) {
                if (lineips[j] != "") {
                    if (reg.test(lineips[j])) {
                        flag = flag + 0;
                    }
                    else {
                        //console.log(lineips[j], "===============")
                        flag = flag + 1;
                    }
                }
            }
        }
        console.log(flag, "flag--------------------5")
        if (flag == 0) return true;
        else return false;
    }

    validate(name: string, val: any, op: string) {
        let map: any = {
            "*": {
                "func": this.validationService.isBlank,
                "msg": "不能为空"
            },
             "email": {
                "func": val => !this.validationService.isEmail(val),
                "msg": "邮箱地址无效"
            },
            "ip": {
                "func": val => !this.isIP(val),
                "msg": "不符合IP规范"
            },
            "ipmask": {
                "func": val => !this.isIPMask(val),
                "msg": "不符合IP mask规范"
            },
            "iporempty":{
                "func": val => !this.isIPorEmpty(val),
                "msg": "不符合IP规范或不为空"
            },
            "ippool":{
                "func": val => !this.isIPpool(val),
                "msg": "不符合IP规范或不为空"
            },
        }

        if (map[op].func(val)) {
            return name + map[op].msg;
        }
        else
            return undefined;
    }

    //验证设置IP地址范围内容
    validateIPModify(): boolean {
        let notValid = null;
        notValid = [
            /*
            {
                "name": "子网信息"
                , 'value': this.ippool.subnetCIDR
                , "op": "*"
            },
            {
                "name": "子网信息"
                , 'value': this.ippool.subnetCIDR
                , "op": "ip"
            },
            {
                "name": "网关地址"
                , 'value': this.ippool.gateway
                , "op": "*"
            },
            {
                "name": "网关地址"
                , 'value': this.ippool.gateway
                , "op": "ip"
            },
            */
            {
                "name": "IP地址范围"
                , 'value': this.ippool.ips
                , "op": "*"
            },
            {
                "name": "IP地址范围"
                , 'value': this.ippool.ips
                , "op": "ippool"
            }
            ].find(n => this.validate(n.name, n.value, n.op) !== undefined)
        
        console.log(notValid, "notValid!!!")

        if (notValid !== void 0) {
            this.showMsg(this.validate(notValid.name, notValid.value, notValid.op));
            this.ipsbox.close();
            this.okCallback = () => {
                this.ipsbox.open();                
            };
            
            return false;
        } else {
            return true;
        }
    }
    acceptIPsModify(): void {
        console.log('acceptIPsModify');
        if (this.validateIPModify()) {
            this.service.updateSubnetIPs(this.ippool)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.showMsg("设置IP地址范围失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getIpMngList();
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('设置IP地址范围,请检查填入项', err);
                    this.showMsg("设置IP地址范围,请检查填入项");
                    this.okCallback = () => { this.ipsbox.open(); };
                })
        }
    }
    cancelIPsModify(): void {
        console.log('cancelIPsModify');
        this.ippool.ips = "";
        this.ippool.subnetCIDR = "";
        this.ippool.gateway = "";
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
                "name": "子网信息"
                , 'value': this.subn.subnetCIDR
                , "op": "ip"
            },
            {
                "name": "子网掩码"
                , 'value': this.subn.subnetMask
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
                , "op": "*"
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
            }
            ].find(n => this.validate(n.name, n.value, n.op) !== undefined)
        
        console.log(notValid, "notValid!!!")

        if (notValid !== void 0) {
            this.showMsg(this.validate(notValid.name, notValid.value, notValid.op));
            this.subnetbox.close();
            this.okCallback = () => {
                this.subnetbox.open();                
            };
            
            return false;
        } else {
            return true;
        }
    }

    acceptSubnetModify(): void {
        console.log('acceptSubnetModify');
        if (this.validateSubnetModify()) {
            this.service.updateSubnet(this.subn)
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
                    console.log('设置IP子网,请检查填入项', err);
                    this.showMsg("设置IP子网,请检查填入项");
                    this.okCallback = () => { this.subnetbox.open(); };
                })
        }
        
    }
    cancelSubnetModify(): void {
        console.log('cancelSubnetModify');
        this.subn.dnsAlt = "";
        this.subn.dnsPre = "";
        this.subn.gateway = "";
        this.subn.subnetCIDR = "";
        this.subn.subnetMask = "";        
    }

}
