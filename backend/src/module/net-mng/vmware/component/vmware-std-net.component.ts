import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ConfirmComponent,PaginationComponent, ValidationService,  PopupComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';

import { StdNet } from '../model/std-net.model';
import { StdNet_mock } from '../model/std-net.mock.model';
import { VmwareService } from '../service/vmware.service';

@Component({
    selector: "wmware-std-net",
    templateUrl: "../template/vmware-std-net.html",
    styleUrls: ["../style/vmware.less"],
    providers: []
}
)

export class VmwareStdNetComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service:VmwareService,
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

    @ViewChild('createStdNet')
    createStdNet: PopupComponent;

    @ViewChild('editStdNet')
    editStdNet: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    selectedDC = ""; //当前选中的DC
    selectedVDS = "";//当前选中的可用区

    dcList: Array<string>;
    vdsList: Array<string>;
    allnets: Array<StdNet>;
    filternets: Array<StdNet>;

    
    statusDic: Array<SystemDictionary>;//状态
    
    editPort: StdNet = new StdNet();
    tempEditNet: StdNet = new StdNet();

    ngOnInit() {
        this.dicService.getItems("PORTGROUP", "STATUS")
            .then(
            dic => {
                this.statusDic = dic;
                this.getData();
            });               
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
            return (this.selectedDC === "" || this.selectedDC === p.dcName) &&
                (this.selectedVDS === "" || this.selectedVDS === p.clusterName);
        });
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

    

    
    
    saveEditNet(stdnet: StdNet) {
        this.layoutService.show();
        if (this.validationService.isBlank(this.tempEditNet.portGroupName)) {
            this.showAlert("端口组名称不能为空.");
            return;
        }
        this.service.saveEditNet(this.tempEditNet)
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

    openEditPort(stdnet): void {
        
        let cstdnet = new StdNet();
        
        cstdnet.id = stdnet.id;
        cstdnet.dcName = stdnet.dcName;
        cstdnet.clusterName = stdnet.clusterName;
        cstdnet.clusterDisplayName = stdnet.clusterDisplayName;
        cstdnet.portDisplayName = stdnet.portDisplayName;
        cstdnet.portGroupName = stdnet.portGroupName;
        cstdnet.vlanId = stdnet.vlanId;
        cstdnet.stateDict = stdnet.stateDict;
        cstdnet.lastUpdate = stdnet.lastUpdate;
        
        this.editPort = cstdnet;
    }

    updatePort(stdnet: StdNet) {
        this.layoutService.show();
        if (this.validationService.isBlank(this.editPort.portDisplayName)) {
            this.showAlert("镜像名称不能为空.");
            return;
        }
        this.service.updatePort(this.editPort)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let cstdnet = this.editPort;
                    stdnet.id = cstdnet.id;
                    stdnet.dcName=cstdnet.dcName;
                    stdnet.clusterName =cstdnet.clusterName;
                    stdnet.clusterDisplayName =cstdnet.clusterDisplayName ;
                    stdnet.portDisplayName =cstdnet.portDisplayName;
                    stdnet.portGroupName= cstdnet.portGroupName;
                    stdnet.vlanId=cstdnet.vlanId;
                    stdnet.stateDict= cstdnet.stateDict;
                    stdnet.lastUpdate=cstdnet.lastUpdate ;
                    
                    stdnet.nameEditing = false;
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    
    create() {
        console.log('create');
        this.tempEditNet =  new StdNet();
        this.createStdNet.open('创建标准网络');


    }

    selectNet(stdnet: StdNet) {
        this.filternets.forEach(e => { e.selected = false; });
        stdnet.selected = true;
    }
    edit() {
        console.log('edit');
        
        
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
          if (!selectedNet)
          {
              this.showAlert("请选择网络");
              return false;
          }
          let cstdnet = new StdNet();
        cstdnet.id = selectedNet.id;
        cstdnet.dcName = selectedNet.dcName;
        cstdnet.clusterName = selectedNet.clusterName;
        cstdnet.clusterDisplayName = selectedNet.clusterDisplayName;
        cstdnet.portDisplayName = selectedNet.portDisplayName;
        cstdnet.portGroupName = selectedNet.portGroupName;
        
        cstdnet.vlanId = selectedNet.vlanId;
        cstdnet.stateDict = selectedNet.stateDict;
        cstdnet.lastUpdate = selectedNet.lastUpdate;
        
        this.tempEditNet = cstdnet;
        this.editStdNet.open('编辑标准网络');
    }

    cancelEdit() { }

    //启用标准网络
    netEnable(){
        const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected });
        if (!selectedNet) {
            this.showAlert(`请先选择需要启用的标准网络！`);
            return;
        }
        this.noticeTitle = "启用网络";

        if (selectedNet.stateDict == "1") {
            this.showAlert("该网络已处于启用状态");
            return;
        }
        this.noticeMsg = `您选择启用 '${selectedNet.portDisplayName}'端口组，其端口组名称为${selectedNet.portGroupName}' ， 
                        请确认；如果确认，用户将能够在订购中选择此网络。`;
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.netEnable(selectedNet.id)
                .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("启用成功");
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

        if (selectedNet.stateDict == "2") {
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
                    } else {
                        alert("Res sync error");
                    }
                }
                )
                .catch((e) => this.onRejected(e));

        };
        this.confirm.open();
    }


}