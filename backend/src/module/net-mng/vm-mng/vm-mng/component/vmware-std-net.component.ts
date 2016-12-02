import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent, PaginationComponent, ValidationService, PopupComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

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
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: VmwareService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
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

    dcList: Array<DCModel>;

    allnets: Array<StdNet>;
    filternets: Array<StdNet>;


    statusDic: Array<SystemDictionary>;//状态

    editPort: StdNet = new StdNet();
    tempEditNet: StdNet = new StdNet();

    ngOnInit() {
        this.getDcList();
       
        this.dicService.getItems("PORTGROUP", "STATUS")
            .then(
            dic => {
               this.statusDic = dic;
                this.getData();
            });
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

    getData() {
        this.layoutService.show();
        this.service.getData()
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
        this.editStdNet.open('创建标准网络');
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
            this.showAlert("请选择网络");
            return false;
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
        this.editStdNet.open('编辑标准网络');
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
            this.showAlert("请选择数据中心.");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.clusterName)) {
            this.showAlert("请选择可用区.");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.clusterDisplayName)) {
            this.showAlert("可用区显示名称不能为空.");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.portGroupName)) {
            this.showAlert("端口组名称不能为空.");
            return;
        }
        if (this.validationService.isBlank(this.tempEditNet.vlanId)) {
            this.showAlert("VLAN ID不能为空.");
            return;
        }
        if (!(this.validationService.isNumber(this.tempEditNet.vlanId)
             &&parseInt(this.tempEditNet.vlanId) >= 0 && parseInt(this.tempEditNet.vlanId) <= 4096))
           {
            this.showAlert("VLAN ID必须是0~4096的数字.");
            return;
        }
        
        this.service.saveEditNet(this.tempEditNet)
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
            this.showAlert("标准端口组显示名称不能为空.");
            return;
        }
        this.service.saveEditNet(this.editPort)
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
            this.showAlert(`请先选择需要启用的标准网络！`);
            return;
        }
        this.noticeTitle = "启用网络";

        if (selectedNet.status == "1") {
            this.showAlert("该网络已处于启用状态");
            return;
        }
        this.noticeMsg = `您选择启用 '${selectedNet.portDisplayName}'端口组，其端口组名称为${selectedNet.portGroupName}' ， 
                        请确认；如果确认，用户将能够在订购中选择此网络。`;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netEnable(selectedNet.id)
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
    netDisable() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`请先选择需要禁用的标准网络！`);
            return;
        }
        this.noticeTitle = "禁用网络";

        if (selectedNet.status == "2") {
            this.showAlert("该网络已处于禁用状态");
            return;
        }
        this.noticeMsg = `您选择禁用 '${selectedNet.portDisplayName}'端口组，其端口组名称为${selectedNet.portGroupName}' ， 
                        请确认；如果确认，用户将不能够在订购中选择此网络。`;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netDisable(selectedNet.id)
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

    //删除标准网络
    netRemove() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`请先选择需要删除的标准网络！`);
            return;
        }
        this.noticeTitle = "删除网络";


        this.noticeMsg = `您选择删除 '${selectedNet.portDisplayName}'端口组，其端口组名称为${selectedNet.portGroupName}' ， 
                        请确认；如果确认，此网络将被删除。`;
        this.confirm.ccf = () => { };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netRemove(selectedNet.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("删除成功");
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

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        if (!$.isArray(dic)) {
            return value;
        }
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }

    gotoPortMng() {
        this.router.navigate([`net-mng/vm-mng/port-mng`]);
    }

    gotoIpMng() {
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (selectedNet) {
            this.router.navigate([
                    `net-mng/vm-mng/ip-mng-list`,
                    {
                        "dc_Id": selectedNet.dcId,
                        "cls_Id": selectedNet.clusterId
                    }
                ]
            );
        } else {
            this.router.navigate([
                `net-mng/vm-mng/ip-mng-list`]
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
}