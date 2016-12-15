import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
    RestApi, RestApiCfg, LayoutService, NoticeComponent, dictPipe,
    ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionaryService, SystemDictionary
} from '../../../../../architecture';

import { DCModel } from "../model/dc.model";
import { switchMode} from "../model/switch.model"
import { port } from '../model/port.model';
//import { port_mock } from '../model/port.mock.model';
import { VmDisIndexService } from '../service/index.service';

@Component({
    selector: "index",
    templateUrl: "../template/vmware-distributed.html",
    styleUrls: [],
    providers: []
}
)
export class VmDisIndexComponent implements OnInit {

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private service: VmDisIndexService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
         if (activatedRouter.snapshot.params["pid"]) {
            this.platformId = activatedRouter.snapshot.params["pid"] || "";
        } else {
            this.platformId = "88";
        } 
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("synDbt")
    synDbt: PopupComponent;
    

    noticeTitle = "";
    noticeMsg = "";

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    defaultSwitch: switchMode = new switchMode();
    selectSwitch = this.defaultSwitch;//当前选中的可用区

    platformId: string;

    dcList: Array<DCModel>;

    allports: Array<port>;
    filterports: Array<port>;

    editPort: port = new port();

    statusDic: Array<SystemDictionary>;//状态
    synDic:Array<SystemDictionary>;
   

    ngOnInit() {
        this.getDcList();
        this.getData();
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

    getData() {
        this.layoutService.show();
        this.service.getData(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.allports = response["resultContent"];
                    this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filterports = this.allports.filter((p) => {
            return (this.selectedDC == this.defaultDc || this.selectedDC.dcId === p.dcId) &&
                (this.selectSwitch === this.defaultSwitch || this.selectSwitch.switchId === p.switchId);
        });
    }

   selectPort(port: port) {
        this.filterports.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }

    //弹出编辑标准端口组显示名称
    openEdit(Port:port): void {
        let cport = new port();
        cport.id = Port.id;
        cport.dcId = Port.dcId;
        cport.dcName = Port.dcName;
        cport.switchId = Port.switchId;
        cport.switchName = Port.switchName;    
        cport.dvPortGroupName = Port.dvPortGroupName;
        cport.distPortGroupDisplayName = Port.distPortGroupDisplayName;
        cport.vlanId = Port.vlanId;
        cport.status = Port.status;
        cport.lastUpdate = Port.lastUpdate;
        this.editPort = cport;
    }
    
    //保存标准端口组显示名称
    saveEdit(Port: port) {
        this.layoutService.show();
        if (this.validationService.isBlank(this.editPort.distPortGroupDisplayName)) {
            this.showAlert("标准端口组显示名称不能为空.");
            return;
        }
        this.service.saveEdit(this.editPort)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    
                    this.getData();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //启用标准网络
    portEnable() {
        const selectedPort = this.filterports.find((port) => { return port.selected });
        if (!selectedPort) {
            this.showAlert(`请先选择需要启用的分布式网络！`);
            return;
        }
        this.noticeTitle = "启用网络";

        if (selectedPort.status == "1") {
            this.showAlert("该网络已处于启用状态");
            return;
        }
        this.noticeMsg = `您选择启用 '${selectedPort.distPortGroupDisplayName}'分布式端口组，其VLAN ID为'${selectedPort.vlanId}' ， 
                        请确认；如果确认，用户将能够在订购中选择此网络。`;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.portEnable(selectedPort.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("启用成功");
                        this.getData();
                    } else {
                        alert("Res sync error");
                    }
                }
                )
                .catch((e) => this.onRejected(e));

        };
        this.confirm.open();
    }


    //禁用网络
    portDisable() {
        const selectedPort = this.filterports.find((port) => { return port.selected });
        if (!selectedPort) {
            this.showAlert(`请先选择需要禁用的分布式网络！`);
            return;
        }
        this.noticeTitle = "禁用网络";

        if (selectedPort.status == "2") {
            this.showAlert("该网络已处于禁用状态");
            return;
        }
        this.noticeMsg = `您选择禁用 '${selectedPort.distPortGroupDisplayName}'分布式端口组，其VLAN ID为'${selectedPort.vlanId}' ， 
                        请确认；如果确认，用户将不能够在订购中选择此网络。`;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.portDisable(selectedPort.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("禁用成功");
                        this.getData();
                    } else {
                        alert("Res sync error");
                    }
                }
                )
                .catch((e) => this.onRejected(e));

        };
        this.confirm.open();
    }

    gotoPortMng() {
        this.router.navigate([`net-mng/vm-mng-dbt/port-mng`, {"pid":this.platformId}]);
        //this.router.navigate([`net-mng/vm-mng-dbt/port-mng/${this.platformId}`]);
    }

    gotoIpMng() {
        const selectedPort = this.filterports.find((port) => { return port.selected });
        if (selectedPort) {
            this.router.navigate([
                    `net-mng/vm-mng-dbt/ip-mng-list`,
                    {
                        "dc_Id": selectedPort.dcId,
                        "switch_Id": selectedPort.switchId,
                        "pid":this.platformId
                    }
                ]
            );
        } else {
            this.router.navigate([
                `net-mng/vm-mng-dbt/ip-mng-list`,
                {
                    "pid":this.platformId
                }
            ]
            );
        }
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

//同步列表弹出框
    infoListForSyn:Array<port>;
    createPopor(){
        //获取信息
        this.layoutService.show();
        this.service.getSynInfolist(this.platformId)
        .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {

                    this.infoListForSyn = response["resultContent"];
                    this.synDbt.open('同步分布式网络信息-网络信息');
                } else {
                    alert("Res sync error");
                }
            }
        )
            .catch((e) => this.onRejected(e));
        
    }
    //同步
    doSynDbt(){
        let id:string;
        this.infoListForSyn.forEach(
            (p)=>{
                if(p.selected){
                    id = p.switchId ;
                }
            }
        )
        if(id && id!=""){
            this.layoutService.show();
            this.service.doSyn(id, this.platformId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("同步成功");
                        this.synDbt.close();
                        // //  刷新列表
                        // this.service.getSynInfolist(this.platformId)
                        // .then(
                        //     response => {
                        //         this.layoutService.hide();
                        //         if (response && 100 == response["resultCode"]) {

                        //             this.infoListForSyn = response["resultContent"];
                        //         } else {
                        //             alert("Res sync error");
                        //         }
                        //     }
                        //  ).catch((e) => this.onRejected(e));

                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
        }else{
            this.showAlert("请选择一个");
        }
        
    }
    closeSynDbt(){
        this.synDbt.close();
    }
    selectSyn(port: port) {
        this.infoListForSyn.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }
    
}