import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent ,SelectboxComponent} from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
//service
import { PortMngSetService } from '../service/port-mng-set.service';

@Component({
    selector: 'port-mng-list',
    templateUrl: '../template/port-mng-set.html',
    styleUrls: [],
    providers: []
})
export class PortMngSetComponent implements OnInit {

    constructor(
        private router: Router,
        private service: PortMngSetService,
        private layoutService: LayoutService,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["id"]) {
            this.pid = activatedRouter.snapshot.params["id"] || "";
        } else {
            this.pid = "1";
        }

    }

    pid: string; //
    platform_id: string;
    selectedEnterprise: Array<Enterprise>;
    unselectedEnterprise: Array<Enterprise>;
    ports: Array<PortMngModel>;
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("selectbox")
    selectbox: SelectboxComponent;

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            this.platform_id = params["platform_id"];
        });
        console.log('init');
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData(this.pid, this.platform_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.selectedEnterprise = response["resultContent"].enterpriseSelectedList;
                    this.unselectedEnterprise = response["resultContent"].enterpriseUnselectedList;
                    this.ports = response["resultContent"].portResList;

                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    // moveToRight() {
    //     //将选中的企业加入到右边
    //     for (var i = this.unselectedEnterprise.length - 1; i >= 0; i--) {
    //         if (this.unselectedEnterprise[i].selected) {
    //             let e = this.unselectedEnterprise.splice(i, 1);
    //             e[0].selected = false;
    //             this.selectedEnterprise.push(e[0]);
    //         }
    //     }
    // }

    // moveToLeft() {
    //     //将选中的企业加入到左边
    //     for (var i = this.selectedEnterprise.length - 1; i >= 0; i--) {
    //         if (this.selectedEnterprise[i].selected) {
    //             let e = this.selectedEnterprise.splice(i, 1);
    //             e[0].selected = false;
    //             this.unselectedEnterprise.push(e[0]);
    //         }
    //     }
    // }

    saveEnterpriseGroup() {
        this.layoutService.show();
        this.service.saveEnterpirseGroup(this.selectedEnterprise, this.pid,this.platform_id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_VM_PORT.SAVE_SUCCESS");
                    this.gotoPortMng();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }


    gotoPortMng() {
        this.router.navigate([`net-mng/vm-mng/port-mng`, { pid: this.platform_id }]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    hh(e: Enterprise) {
        alert(e.com);
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_PORT.GETTING_DATA_FAILED");
    }
}
