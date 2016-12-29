import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService,PopupComponent, NoticeComponent, ValidationService, 
    ConfirmComponent, SystemDictionary } from '../../../../architecture';

import { VmwareNetModel } from '../model/vmware-net.model';

@Component({
    selector: "vmware-net-mng-index",
    templateUrl: "../template/cloud-vmware.html",
    styleUrls: [],
    providers: []
}
)
export class VmwareMngIndexComponent implements OnInit {

    constructor(
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService,
    ) {
    }
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("synEnts")
    synEnts: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    
    ngOnInit() {        
    }

    gotoVMStdNetMng() {
        //const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected })
        const selectedNet = new VmwareNetModel();
        selectedNet.dcId = "ef300001-3bfb-4b09-b804-30954b084001";
        selectedNet.clusterId = "ef349044-3bfb-4b09-b804-30954b084001";
        selectedNet.platformId = "88"
        if (selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng/${selectedNet.platformId}`,
                {
                    "dc_Id": selectedNet.dcId,
                    "cls_Id": selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng/${selectedNet.platformId}`]);
        }
    }

    gotoVMDbtNetMng() {
        //const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected })
        const selectedNet = new VmwareNetModel();
        selectedNet.dcId = "ef300001-3bfb-4b09-b804-30954b084001";
        selectedNet.clusterId = "ef349044-3bfb-4b09-b804-30954b084001";
        selectedNet.platformId = "88"
        if (selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng-dbt/index/${selectedNet.platformId}`,
                {
                    "dc_Id": selectedNet.dcId,
                    "cls_Id": selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng-dbt/index/${selectedNet.platformId}`]);
        }
    }

    gotoVMNsxNetMng() {
        //const selectedNet = this.filternets.find((stdnet) => { return stdnet.selected })
        const selectedNet = new VmwareNetModel();
        selectedNet.dcId = "ef300001-3bfb-4b09-b804-30954b084001";
        selectedNet.clusterId = "ef349044-3bfb-4b09-b804-30954b084001";
        selectedNet.platformId = "88"
        if (selectedNet) {
            this.router.navigate([
                `net-mng/vm-mng-nsx/index/${selectedNet.platformId}`,
                {
                    "dc_Id": selectedNet.dcId,
                    "cls_Id": selectedNet.clusterId
                }
                ]);
        } else {
            this.router.navigate([`net-mng/vm-mng-nsx/index/${selectedNet.platformId}`]);
        }
    }

}