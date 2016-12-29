import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {
    RestApi, RestApiCfg, LayoutService, NoticeComponent,
    ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionary
     } from '../../../../../architecture';

import { StdNet } from '../model/std-net.model';
import { DCModel } from "../model/dc.model";
import {  ClusterMode } from "../model/cluster.model";
import { StdNet_mock } from '../model/std-net.mock.model';
import { VmwareService } from '../service/vmware.service';

@Component({
    selector: "wmware-std-net",
    templateUrl: "../template/vmware-std-net.html",
    styleUrls: [],
    providers: []
}
)

export class VmwareStdNetComponent implements OnInit {

    constructor(
        private activatedRouter: ActivatedRoute,
        private router: Router,
        private service: VmwareService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
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

    @ViewChild('editStdNet')
    editStdNet: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    defaultDc: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDc; //当前选中的DC
    defaultCluster: ClusterMode = new ClusterMode();
    selectCluster = this.defaultCluster;//当前选中的可用区

    selectedDC4Popup: DCModel = this.defaultDc;//创建，编辑框选中的DCModel
    selectedCluster4Popup: ClusterMode = this.defaultCluster;//创建，编辑框选中的DCModel

    platformId: string;

    dcList: Array<DCModel>;
    allnets: Array<StdNet>;
    filternets: Array<StdNet>;


    statusDic: Array<SystemDictionary>;//状态

    editPort: StdNet = new StdNet();
    tempEditNet: StdNet = new StdNet();

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
                    this.allnets = response["resultContent"].networks;
                    this.filter();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter() {
        this.filternets = this.allnets.filter((p) => {
            return (this.selectedDC == this.defaultDc || this.selectedDC.dcId === p.dcId) &&
                (this.selectCluster === this.defaultCluster || this.selectCluster.clusterId === p.clusterId);
        });
    }

    
    //弹出创建框
    create() {
        console.log('create');
        this.tempEditNet = new StdNet();
        this.editStdNet.open('NET_MNG_VM_IP_MNG.CREATE_STD_NET');
    }

    selectStdNet(stdNet: StdNet) {
        this.filternets.forEach((net) => {
            net.selected = false;
        });
        stdNet.selected = true;
    }

    //设置创建编辑框中的被选中DC实例
    setSelectedDC4Popup(dcId,clusterId) {
        this.selectedDC4Popup = this.dcList.find((dc) => { return dc.dcId == dcId });

        if (!this.selectedDC4Popup) {
            this.selectedDC4Popup = this.defaultDc;
        }
        this.selectedCluster4Popup = this.selectedDC4Popup.clusters.find((c) => { return c.clusterId == clusterId });
        if (!this.selectedCluster4Popup) {
            this.selectedCluster4Popup = this.defaultCluster;
        }
    }

    //弹出编辑框
    edit() {
        console.log('edit');
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET");
            return false;
        }
        if (selectedNet.status == "1") {
            this.showAlert("NET_MNG_VM_IP_MNG.CANT_EDIT_WHEN_ENABLED");
            return;
        }
        let cstdnet = new StdNet();
        cstdnet.id = selectedNet.id;
        cstdnet.dcId = selectedNet.dcId;
        cstdnet.dcName = selectedNet.dcName;
        this.setSelectedDC4Popup(selectedNet.dcId,selectedNet.clusterId);
        cstdnet.clusterId = selectedNet.clusterId;
        cstdnet.clusterName = selectedNet.clusterName;
        cstdnet.clusterDisplayName = selectedNet.clusterDisplayName;
        cstdnet.portDisplayName = selectedNet.portDisplayName;
        cstdnet.portGroupId = selectedNet.portGroupId;
        cstdnet.portGroupName = selectedNet.portGroupName;

        cstdnet.vlanId = selectedNet.vlanId;
        cstdnet.status = selectedNet.status;
        cstdnet.lastUpdate = selectedNet.lastUpdate;

        this.tempEditNet = cstdnet;
        this.editStdNet.open('NET_MNG_VM_IP_MNG.EDIT_STD_NET');
    }

    cancelEdit() { }

    //创建/编辑后的数据保存
    saveEditNet(stdnet: StdNet) {
        this.layoutService.show();
        this.tempEditNet.dcId = this.selectedDC4Popup.dcId;
        this.tempEditNet.dcName = this.selectedDC4Popup.dcName;
        this.tempEditNet.clusterId = this.selectedCluster4Popup.clusterId;
        this.tempEditNet.clusterName = this.selectedCluster4Popup.clusterName;
        if (this.validationService.isBlank(this.tempEditNet.dcName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_DATACENTER");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.clusterName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_CLUSTER");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.clusterDisplayName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.CLS_DIS_NAME_CANT_NULL");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.portGroupName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.PG_NAME_CANT_NULL");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.vlanId)) {
            this.showAlert("NET_MNG_VM_IP_MNG.VLAN_ID_CANT_NULL");
            return;
        }
        if (!(this.validationService.isNumber(this.tempEditNet.vlanId)
             &&parseInt(this.tempEditNet.vlanId) >= 0 && parseInt(this.tempEditNet.vlanId) <= 4096))
           {
            this.showAlert("NET_MNG_VM_IP_MNG.VLAN_ID_SCOPE");
            return;
        }
        
        this.service.saveEditNet(this.platformId, this.tempEditNet)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.editStdNet.close();
                    this.getData();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //弹出编辑标准端口组显示名称
    openEditPort(stdnet): void {
        let cstdnet = new StdNet();
        cstdnet.id = stdnet.id;
        cstdnet.dcId = stdnet.dcId;
        cstdnet.dcName = stdnet.dcName;
        cstdnet.clusterId = stdnet.clusterId;
        cstdnet.clusterName = stdnet.clusterName;
        cstdnet.clusterDisplayName = stdnet.clusterDisplayName;
        cstdnet.portDisplayName = stdnet.portDisplayName;
        cstdnet.portGroupId = stdnet.portGroupId;
        cstdnet.portGroupName = stdnet.portGroupName;
        cstdnet.vlanId = stdnet.vlanId;
        cstdnet.status = stdnet.status;
        cstdnet.lastUpdate = stdnet.lastUpdate;
        this.editPort = cstdnet;
    }

    //保存标准端口组显示名称
    updatePort(stdnet: StdNet) {
        this.layoutService.show();
        if (this.validationService.isBlank(this.editPort.portDisplayName)) {
            this.showAlert("NET_MNG_VM_IP_MNG.PG_DIS_NAME_CANT_NULL");
            return;
        }
        this.service.saveEditNet(this.platformId, this.editPort)
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
    netEnable() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET_TO_ENABLE`);
            return;
        }
        this.noticeTitle = "NET_MNG_VM_IP_MNG.ENABLE_NET";

        if (selectedNet.status == "1") {
            this.showAlert("NET_MNG_VM_IP_MNG.NET_ALREADY_ENABLED");
            return;
        }
        //this.noticeMsg = `您选择启用 '${selectedNet.portGroupName}'端口组，其VLAN ID为'${selectedNet.vlanId}' ， 
        //                请确认；如果确认，用户将能够在订购中选择此网络。`;
        this.noticeMsg = 'NET_MNG_VM_IP_MNG.ENABLE_PORTGROUP_WARNING^^^'+selectedNet.portGroupName+'^^^'+selectedNet.vlanId;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netEnable(selectedNet.id)
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
    netDisable() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET_TO_DISABLE`);
            return;
        }
        this.noticeTitle = "NET_MNG_VM_IP_MNG.DISABLE_NET";

        if (selectedNet.status == "2") {
            this.showAlert("NET_MNG_VM_IP_MNG.NET_ALREADY_DISABLED");
            return;
        }
        //this.noticeMsg = `您选择禁用 '${selectedNet.portGroupName}'端口组，其VLAN ID为'${selectedNet.vlanId}' ， 
        //                请确认；如果确认，用户将不能够在订购中选择此网络。`;
        this.noticeMsg = 'NET_MNG_VM_IP_MNG.DISABLE_PORTGROUP_WARNING^^^'+selectedNet.portGroupName+'^^^'+selectedNet.vlanId;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netDisable(selectedNet.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_VM_IP_MNG.DISABLE_NET_SUCCESS");
                        this.getData();
                    } else if (10002001 == response["resultCode"]) {
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

    //删除标准网络
    netRemove() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_NET_TO_DELETE`);
            return;
        }
        if (selectedNet.status == "1") {
            this.showAlert("NET_MNG_VM_IP_MNG.CANT_DELETE_WHEN_ENABLED");
            return;
        }
        this.noticeTitle = "NET_MNG_VM_IP_MNG.DELETE_NET";


        //this.noticeMsg = `您选择删除 '${selectedNet.portGroupName}'端口组，其VLAN ID为'${selectedNet.vlanId}' ， 
        //                请确认；如果确认，此网络将被删除。`;
        this.noticeMsg = 'NET_MNG_VM_IP_MNG.DELETE_PORTGROUP_WARNING^^^'+selectedNet.portGroupName+'^^^'+selectedNet.vlanId;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netRemove(selectedNet.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("NET_MNG_VM_IP_MNG.DELETE_NET_SUCCESS");
                        this.getData();
                    } else if(10002001==response["resultCode"]){
                        this.showAlert("NET_MNG_VM_IP_MNG.CANT_DELETE_AS_ENABLED_IP");
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

   

    gotoPortMng() {
        this.router.navigate([`net-mng/vm-mng/port-mng`, {"pid":this.platformId}]);
    }

    gotoIpMng() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (selectedNet) {
            this.router.navigate([
                    `net-mng/vm-mng/ip-mng-list`,
                    {
                        "dc_Id": selectedNet.dcId,
                        "cls_Id": selectedNet.clusterId,
                        "pid":this.platformId
                    }
                ]
            );
        } else {
            this.router.navigate([
                `net-mng/vm-mng/ip-mng-list`,
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
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}