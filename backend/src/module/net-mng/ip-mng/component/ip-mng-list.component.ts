import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

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
        if (item)
            return item;
        else {
            this.showAlert("请选择相应的PortGroup");
            return null;
        }
    }

    setupSubnet(): void {
        console.log('conponent: net-mng/ip-mng-list/subnet');
        //this.layoutService.show();
        let pg = this.getSelected();
        console.log(pg, "=======================");
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

    validateIPModify() {
        return "1";

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

    }

    validateSubnetModify() {
        return "1";

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
        
    }

}
