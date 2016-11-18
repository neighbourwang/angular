import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
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

    selectedDC = ""; //当前选中的DC
    selectedVDS = "";//当前选中的可用区

    dcList: Array<string>;
    vdsList: Array<string>;
    allPorts: Array<PortMngModel>;
    filterPorts: Array<PortMngModel>;
    ngOnInit() {
        console.log('init');
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.dcList = response["resultContent"].dcNameList;
                    this.vdsList = response["resultContent"].clusterNameList;
                    this.allPorts = response["resultContent"].portResList;
                    this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filterPorts = this.allPorts.filter((p) => {
            return (this.selectedDC === "" || this.selectedDC === p.dcName) &&
                (this.selectedVDS === "" || this.selectedVDS === p.clusterName);
        });
    }

    gotoSetPage() {
        const port = this.filterPorts.find((p) => { return p.selected; });
        if (!port) {
            this.showAlert("请先选择需要设置的企业的端口组");
            return;
        }
        this.router.navigate([`net-mng/vm-mng/port-mng-set/${port.id}`]);
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
