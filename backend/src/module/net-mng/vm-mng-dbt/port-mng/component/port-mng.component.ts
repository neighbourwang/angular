import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../../architecture';

//model 
import { Enterprise } from '../model/enterprise.model';
import { PortMngModel } from "../model/port.model";
import { DCModel } from "../model/dc.model";
import { SwitchMode } from "../model/switch.model";

//service
import { PortMngService } from '../service/port-mng.service';
  

@Component({
    selector: 'port-mng',
    templateUrl: '../template/port-mng.html',
    styleUrls: [],
    providers: []
})

export class PortMngComponent implements OnInit {

    constructor(
        private router: Router,
        private service: PortMngService,
        private layoutService: LayoutService,
        private router2:ActivatedRoute
    ) {
        

    }
    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    defaultSwitch: SwitchMode = new SwitchMode();
    selectSwitch = this.defaultSwitch;//当前选中的可用区

    dcList: Array<DCModel>;

    allPorts: Array<PortMngModel>;
    filterPorts: Array<PortMngModel>;
   
    platformId:string;

    ngOnInit() {
        this.router2.params.forEach((params: Params) => {
			this.platformId = params['pid'];
			console.log("接收的platform_id:" + this.platformId);
			
		});
        this.getDcList();
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

    getDcList() {
        this.layoutService.show();
        this.service.getDCList(this.platformId)
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
                (this.selectSwitch === this.defaultSwitch || this.selectSwitch.switchId === p.switchId);
        });
    }


    selectPort(port: PortMngModel) {
        this.filterPorts.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }


    gotoSetPage() {
        if(this.filterPorts){
            const port = this.filterPorts.find((p) => { return p.selected; });
            if (!port) {
                this.showAlert("请先选择需要设置的企业的端口组");
                return;
            }
            //this.router.navigate([`net-mng/vm-mng-dbt/port-mng-set/${port.switchId}`]);
            this.router.navigate(['net-mng/vm-mng-dbt/port-mng-set', {"platform_id": this.platformId,"switchId":port.switchId}]);
        }
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

    back(){
        this.router.navigateByUrl(`/net-mng/vm-mng-dbt/index/${this.platformId}`);
    }
}
