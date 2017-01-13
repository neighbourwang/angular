import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, SelectboxComponent } from '../../../../../architecture';

import { Enterprise } from '../model/enterprise.model';
import { DlrMngService } from '../service/dlr-mng.service';
import { DlrDetailModel } from '../model/dlr-detail.model';
@Component({
    selector:'dlr-mng',
    templateUrl:'../template/vmware-nsx-set-ent.html',
    providers: []
})
export class DlrMngSetComponent implements OnInit {
    constructor(
        private router: Router,
        private service: DlrMngService,
        private layoutService: LayoutService,
        private router2: ActivatedRoute
    ){

    }

    dlrId: string;
    platformId: string;
    selectedEnterprise: Array<Enterprise>;
    unselectedEnterprise: Array<Enterprise>;
    dlrs: Array<DlrDetailModel>;
    
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
            this.dlrId = params['DlrId'];
			console.log("接收的platform_id:" + this.platformId);
            console.log("接收的DlrId:" + this.dlrId);
			
		});
        this.getDrlDetailData();
    }

    getDrlDetailData() {
        this.layoutService.show();
       
        this.service.getDrlDetailData(this.dlrId, this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.selectedEnterprise = response["resultContent"].enterpriseSelectedList;
                    this.unselectedEnterprise = response["resultContent"].enterpriseUnselectedList;
                    this.dlrs = response["resultContent"].portResList;

                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));

    }

    saveEnterpriseGroup() {
        this.layoutService.show();
        this.service.saveEnterpirseGroup(this.selectedEnterprise, this.dlrId, this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("NET_MNG_VM_DBT_PORT.SAVE_SUCCESS");
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
        this.router.navigate(['net-mng/vm-mng-nsx/dlr-mng', {"pid": this.platformId}]);
    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
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
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }
}
