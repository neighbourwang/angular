import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, SelectboxComponent } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
//service
import { PortMngSetService } from '../service/port-mng-set.service';

@Component({
    selector: 'port-mng',
    templateUrl: '../template/port-mng-set.html',
    styleUrls: [],
    providers: []
})
export class PortMngSetComponent implements OnInit {

    constructor(
        private router: Router,
        private service: PortMngSetService,
        private layoutService: LayoutService,
        private router2: ActivatedRoute
    ) {
        
    }

    switchId: string;
    platformId: string;
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
        console.log('init');
         this.router2.params.forEach((params: Params) => {
			this.platformId = params['platform_id'];
            this.switchId = params['switchId'];
			console.log("接收的platform_id:" + this.platformId);
            console.log("接收的switchId:" + this.switchId);
			
		});
        this.getData();
    }

    getData() {
        this.layoutService.show();
       
        this.service.getData(this.switchId,this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.selectedEnterprise = response["resultContent"].enterpriseSelectedList;
                    this.unselectedEnterprise = response["resultContent"].enterpriseUnselectedList;
                    this.ports = response["resultContent"].portResList;

                } else {
                    alert("Res sync error");
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
        this.service.saveEnterpirseGroup(this.selectedEnterprise, this.switchId, this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("{{'NET_MNG_VM_DBT_PORT.SAVE_SUCCESS' | translate}}");
                    this.gotoPortMng();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }


    gotoPortMng() {
        //this.router.navigate([`net-mng/vm-mng-dbt/port-mng/${this.platformId}`]);
        this.router.navigate(['net-mng/vm-mng-dbt/port-mng', {"pid": this.platformId}]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "{{'NET_MNG_VM_DBT_PORT.PROMPT' | translate}}";
        this.noticeMsg = msg;
        this.notice.open();
    }

    hh(e:Enterprise) {
        alert(e.com);
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("{{'NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED' | translate}}");
    }
}
