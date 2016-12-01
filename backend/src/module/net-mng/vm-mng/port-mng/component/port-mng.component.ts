import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
import { DCModel } from "../model/dc.model";
import { ClusterMode } from "../model/cluster.model";

//service
import { PortMngService } from '../service/port-mng.service';
  

@Component({
    selector: 'port-mng-list',
    templateUrl: '../template/port-mng.html',
    styleUrls: [],
    providers: []
})

export class PortMngComponent implements OnInit {

    constructor(
        private router: Router,
        private service: PortMngService,
        private layoutService: LayoutService,
    ) {


    }
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    defaultCluster: ClusterMode = new ClusterMode();
    selectCluster = this.defaultCluster;//当前选中的可用区

    dcList: Array<DCModel>;

    allPorts: Array<PortMngModel>;
    filterPorts: Array<PortMngModel>;
   
    ngOnInit() {
        this.getDcList();
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.allPorts = response["resultContent"].portResList;
                    this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getDcList() {
        this.layoutService.show();
        this.service.getDCList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.dcList = response["resultContent"];
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filterPorts = this.allPorts.filter((p) => {
            return (this.selectedDC == this.defaultDc || this.selectedDC.dcId === p.dcId) &&
                (this.selectCluster === this.defaultCluster || this.selectCluster.clusterId === p.clusterId);
        });
    }


    selectPort(port: PortMngModel) {
        this.filterPorts.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }


    gotoSetPage() {
        const port = this.filterPorts.find((p) => { return p.selected; });
        if (!port) {
            this.showAlert("请先选择需要设置的企业的端口组");
            return;
        }
        this.router.navigate([`net-mng/vm-mng/port-mng-set/${port.clusterId}`]);
    }

    gotoVm() {
        this.router.navigate([`net-mng/vm-mng/vmware/vmware-std-net`]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
}
