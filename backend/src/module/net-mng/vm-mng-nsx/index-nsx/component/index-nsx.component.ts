import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
    RestApi, RestApiCfg, LayoutService, NoticeComponent, dictPipe,
    ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionaryService, SystemDictionary
} from '../../../../../architecture';


import { dlr} from "../model/dlr.model"
import { port } from '../model/port.model';
import { port_mock } from '../model/port.mock.model';
import { VmNSXIndexService } from '../service/index-nsx.service';

@Component({
    selector: "index",
    templateUrl: "../template/index-nsx.html",
    styleUrls: [],
    providers: []
}
)

export class VmNSXIndexComponent implements OnInit {

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private service: VmNSXIndexService,
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

    @ViewChild('detail')
    detail: PopupComponent;
    

    noticeTitle = "";
    noticeMsg = "";

    defaultDlr: dlr = new dlr();
    selectedDlr: dlr = this.defaultDlr; //当前选中的dlr
    

    platformId: string;

    dlrList: Array<dlr>;

    allports: Array<port>;
    filterports: Array<port>;

    editPort: port = new port();

    statusDic: Array<SystemDictionary>;//状态
    synDic: Array<SystemDictionary>;

    ngOnInit() {
         this.getDlrList();
        this.getData();
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
            return (this.selectedDlr == this.defaultDlr || this.selectedDlr.dlrId === p.dlrId);
        });
    }

    selectPort(port: port) {
        this.filterports.forEach((port) => {
            port.selected = false;
        });
        port.selected = true;
    }

    //弹出编辑DLR子网显示名称
    openEdit(Port:port): void {
        let cport = new port();
        cport.dlrPortId = Port.dlrPortId;
        cport.dlrId = Port.dlrId;
        cport.dlrRouteName = Port.dlrRouteName;
        cport.dlrInterfaceName = Port.dlrInterfaceName;
        cport.drlSubnetDisplayName = Port.drlSubnetDisplayName;    
        cport.dlrInterfaceIPaddress = Port.dlrInterfaceIPaddress;
        cport.gateway = Port.gateway;
        cport.subnetCIDR = Port.subnetCIDR;
        cport.dlrSubnet = Port.dlrSubnet;
        cport.dlrInterfaceType = Port.dlrInterfaceType;
        cport.lswName = Port.lswName;
        cport.lswId = Port.lswId;
        cport.lswTransportZone=Port.lswTransportZone
        cport.status = Port.status;
        cport.lastUpdate = Port.lastUpdate;
        cport.platformId = Port.platformId;
        this.editPort = cport;
    }
    
    //保存DLR子网显示名称
    saveEdit(Port: port) {
        this.layoutService.show();
        if (this.validationService.isBlank(this.editPort.drlSubnetDisplayName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.PG_DIS_NAME_CANT_NULL");
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

    viewDetail(port:port) {
        this.detail.open('NET_VM_NSX_INDEX.TRANSPORT_DETAIL');
    }

    //启用标准网络
    portEnable() {
        const selectedPort = this.filterports.find((port) => { return port.selected });
        if (!selectedPort) {
            this.showAlert(`NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_DBT_NET_TO_ENABLE`);
            return;
        }
        this.noticeTitle = "NET_MNG_VM_IP_MNG.ENABLE_NET";

        if (selectedPort.status == "1") {
            this.showAlert("NET_MNG_VM_IP_MNG.NET_ALREADY_ENABLED");
            return;
        }
        //this.noticeMsg = `您选择启用 '${selectedPort.distPortGroupDisplayName}'分布式端口组，其VLAN ID为'${selectedPort.vlanId}' ， 
        //                请确认；如果确认，用户将能够在订购中选择此网络。`;
        this.noticeMsg = 'NET_MNG_VM_IP_MNG.ENABLE_DBT_PORTGROUP_WARNING^^^'+selectedPort.dlrInterfaceName+'^^^'+selectedPort.lswId;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.portEnable(selectedPort.dlrPortId)  
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_VM_IP_MNG.ENABLE_NET_SUCCESS");
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
            this.showAlert(`NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_DBT_NET_TO_DISABLE`);
            return;
        }
        this.noticeTitle = "NET_MNG_VM_IP_MNG.DISABLE_NET";

        if (selectedPort.status == "2") {
            this.showAlert("NET_MNG_VM_IP_MNG.NET_ALREADY_DISABLED");
            return;
        }
        //this.noticeMsg = `您选择禁用 '${selectedPort.distPortGroupDisplayName}'分布式端口组，其VLAN ID为'${selectedPort.vlanId}' ， 
        //                请确认；如果确认，用户将不能够在订购中选择此网络。`;
        this.noticeMsg = 'NET_MNG_VM_IP_MNG.DISABLE_DBT_PORTGROUP_WARNING^^^'+selectedPort.dlrInterfaceName+'^^^'+selectedPort.lswId;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.portDisable(selectedPort.dlrPortId)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_VM_IP_MNG.DISABLE_NET_SUCCESS");
                        this.getData();
                    } else if(10002001==response["resultCode"]){
                        this.showAlert("NET_MNG_VM_IP_MNG.CANT_DISABLE_AS_ENABLED_IP");
                    }
                    else {
                        alert("Res sync error");
                    }
                }
                )
                .catch((e) => this.onRejected(e));

        };
        this.confirm.open();
    }

    //gotoPortMng() {
    //    this.router.navigate([`net-mng/vm-mng-dbt/port-mng`, {"pid":this.platformId}]);
    //    //this.router.navigate([`net-mng/vm-mng-dbt/port-mng/${this.platformId}`]);
    //}

    gotoIpMng() {
        const selectedPort = this.filterports.find((port) => { return port.selected });
        if (selectedPort) {
            this.router.navigate([
                    `net-mng/vm-mng-nsx/ip-mng-list`,
                    {
                        //"dc_Id": selectedPort.dcId,
                        //"switch_Id": selectedPort.switchId,
                        "pid":this.platformId
                    }
                ]
            );
        } else {
            this.router.navigate([
                `net-mng/vm-mng-nsx/ip-mng-list`,
                {
                    "pid":this.platformId
                }
            ]
            );
        }
    }

    goBack() {
        this.router.navigate([`net-mng/vm-mng-index/vmware-net-index`]);
    }
    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}