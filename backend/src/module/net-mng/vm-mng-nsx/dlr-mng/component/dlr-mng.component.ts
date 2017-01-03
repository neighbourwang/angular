import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../../architecture';

import { DlrMngService } from '../service/dlr-mng.service';
import { DlrModel } from "../model/dlr.model";
@Component({
    selector:'dlr-mng',
    templateUrl:'../template/vmware-nsx-dlr-res.html',
    providers: []
})

export class DlrMngComponent implements OnInit{
    constructor(
        private router: Router,
        private service: DlrMngService,
        private layoutService: LayoutService,
        private router2:ActivatedRoute
    ){

    }
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    defaultDlr: DlrModel = new DlrModel();
    selectDlr = this.defaultDlr;//当前选中的DLR

    dlrList: Array<DlrModel>;
    
    allPorts: Array<DlrModel>;
    filterPorts: Array<DlrModel>;
   
    platformId:string;

    ngOnInit() {
        this.router2.params.forEach((params: Params) => {
			this.platformId = params['pid']? params['pid']:'88';
			console.log("接收的platform_id:" + this.platformId);
			
		});
        this.getDlrList();
        this.getData();
    }

    getData() {
        this.layoutService.show();
        this.service.getData(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.allPorts = response["resultContent"];
                    this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getDlrList() {
        this.layoutService.show();
        this.service.getDlrList(this.platformId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.dlrList = response["resultContent"];
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filterPorts = this.allPorts.filter((p) => {
            return (this.selectDlr === this.defaultDlr || this.selectDlr.dlrId === p.dlrId);
        });
    }


    selectPort(port: DlrModel) {
        this.filterPorts.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }


    gotoSetPage() {
        if(this.filterPorts){
            const port = this.filterPorts.find((p) => { return p.selected; });
            if (!port) {
                this.showAlert("请先选择一个网络");
                return;
            }
            //this.router.navigate([`net-mng/vm-mng-dbt/port-mng-set/${port.DlrId}`]);
            this.router.navigate(['net-mng/vm-mng-nsx/dlr-mng-set', {"platform_id": this.platformId,"DlrId":port.dlrId}]);
        }
    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }
    back(){
        this.router.navigateByUrl(`/net-mng/vm-mng-nsx/index/${this.platformId}`);
    }
}