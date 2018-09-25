import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary } from '../../../../../architecture';

import { TranslateService } from 'ng2-translate';

//model
import { VmwareImgSyncModel, TenantModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgSyncService } from '../service/vmware-img-sync.service';
import { VmwareImgDictService } from '../service/vmware-img-dict.service';

@Component({
    selector: "vmware-img-sync",
    templateUrl: "../template/image-sync-vmware.html",
    styleUrls: [],
    providers: [ VmwareImgSyncService
    ]
}
)
export class VmwareImgSyncComponent implements OnInit {

    constructor(
        private router: Router,
        private dictService: VmwareImgDictService,
        private syncService: VmwareImgSyncService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute,
        private translateService: TranslateService
    ) {
        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
        } else {
            this.showMsg("HOST_VMWARE_MNG.MUST_CHOOSE_PLATFORM");
        }

    }
    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    bitDictArray: Array<SystemDictionary>;
    osDictArray: Array<SystemDictionary>;
    formatDictArray: Array<SystemDictionary>;

    platformId: string;
    platformName: string;
    vmwaresyncimgs: Array<VmwareImgSyncModel>;
    newvmwaresyncimgs : Array<VmwareImgSyncModel>;
    selectedsyncvmimgs: Array<VmwareImgSyncModel>;
    unselectedsyncvmimgs: Array<VmwareImgSyncModel>;

    ngOnInit() {
       this.activatedRouter.params.forEach((params: Params) => {
            this.platformName = params['platformName'] ? params['platformName']:'HOST_VMWARE_MNG.HPE_VMWARE_PLATFORM';
            console.log("接收的platformName:" + this.platformName);
		});

        this.dictService.bitDict
        .then((items) => {
            this.bitDictArray = items;
            console.log(this.bitDictArray, "this.bitDictArray");
        });
        this.dictService.osDict
        .then((items) => {
            this.osDictArray = items;
            console.log(this.osDictArray, "this.osDictArray");
        });
        this.dictService.formatDict
        .then((items) => {
            this.formatDictArray = items;
            console.log(this.formatDictArray, "this.formatDictArray");
        });

        this.getVmwareImgSyncList();
    }

    showMsg(msg: string) {
        this.notice.open("HOST_VMWARE_MNG.SYSTEM_PROMPT", msg);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("HOST_VMWARE_MNG.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_VMWARE_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    /*/根据value获取字典的txt
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
            //return value;
            return "HOST_VMWARE_MNG.UNSET";
        }
    }
    */

    displayIt(tenants: Array<TenantModel>): String {
        if (tenants.length == 0)
            return "all";
        else if (tenants.length == 1)
            return "special";
        else
            return "some";
    }    

    //选择行
    selectItem(index:number): void {
        if(this.vmwaresyncimgs[index].checked == true)
        {
            this.vmwaresyncimgs[index].checked = false;
            console.log(this.vmwaresyncimgs[index], "=== Unselected ===");
        }
        else if(this.vmwaresyncimgs[index].checked == false || this.validationService.isBlank(this.vmwaresyncimgs[index].checked))
        {
            this.vmwaresyncimgs[index].checked = true;
            console.log(this.vmwaresyncimgs[index], "=== Selected ===");
        } else {
            console.log("Can't select/unselect the item!");
        }
        
    }

    UnselectItem(): void {
        this.vmwaresyncimgs.map(n=> {n.checked = false;});
        console.log(this.vmwaresyncimgs, "=== Please see all items are Unselected ===");
    }

    getSelectedItems() {
        this.selectedsyncvmimgs = this.vmwaresyncimgs.filter(n=> { return (n.checked == true);});
        if (this.selectedsyncvmimgs.length != 0){
            return this.selectedsyncvmimgs;
        }
        else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return null;
        }
    }

    getVmwareImgSyncList(): void {
        this.layoutService.show();
        this.syncService.getVmwareImgSyncList(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.vmwaresyncimgs = response.resultContent;
                    console.log(this.vmwaresyncimgs, "vmwaresyncimgs!!!");
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //Menu: 返回Vmware镜像管理界面
    VmwareImgListPage(): void {
        this.router.navigate([`host-mng/img-mng/vmware-img-list/${this.platformId}`]);
    }

    VmwareSyncImages(): void {        
        this.getSelectedItems();
        console.log(this.selectedsyncvmimgs, "[[[[[[[[[[马上要同步的镜像]]]]]]]]]]");
        if(this.selectedsyncvmimgs.length > 0) {
            for(let i=0; i<this.selectedsyncvmimgs.length; i++) {
                if(this.validateImgOSBit(this.selectedsyncvmimgs[i])) {
                    console.log(this.selectedsyncvmimgs[i], " have os and bit!");
                } else {
                    //this.showAlert("HOST_VMWARE_MNG.MUST_CHOOSE_OS_AND_BIT");
                    console.log("You must choose os/bitType for any images which will be synced!");
                    return;
                }
            }
            this.layoutService.show();
            this.syncService.VmwareSyncImages(this.platformId, this.selectedsyncvmimgs)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    console.log("镜像同步成功");
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                    return;
                }
            }
            ).then( n =>
                {
                    this.getVmwareImgSyncList();
                    this.showAlert("HOST_VMWARE_MNG.IMAGE_SYNC_SUCCESS");
                    console.log(this.vmwaresyncimgs, "New sync images!!!");
                }
            )
            .catch((e) => this.onRejected(e));
        } else {
            this.showAlert("HOST_VMWARE_MNG.NO_MORE_IMAGE_NEED_TO_SYNC");
            console.log("No image need to be synced.");
        }
    }


    validate(name: string, val: any, op: string) {
        let map: any = {
            "*": {
                "func": this.validationService.isBlank,
                "msg": "HOST_VMWARE_MNG.NO_EMPTY" //不能为空
            },
             "email": {
                "func": val => !this.validationService.isEmail(val),
                "msg": "HOST_VMWARE_MNG.EMAIL_INVALID"  //邮箱地址无效
            },
            "number": {
                "func": val => { return (Number(val)==0 || isNaN(Number(val)) || Number(val)<0) },
                "msg": "HOST_VMWARE_MNG.NOT_NUMBER"  //邮箱地址无效
            }
        }

        if (map[op].func(val)) {
            return [name, map[op].msg];
        }
        else
            return undefined;
    }

    validateImgOSBit(img: VmwareImgSyncModel): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "HOST_VMWARE_MNG.OS"  //操作系统
                , 'value': img.os
                , "op": "*"
            },
            {
                "name": "HOST_VMWARE_MNG.BIT"  //操作系统位数
                , 'value': img.bitsType
                , "op": "*"
            }
            ].find(n => this.validate(n.name, n.value, n.op) !== undefined);
        
        console.log(notValid, "notValid!!!");

        if (notValid !== void 0) {
            let name = this.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            return false;
        } else {
            console.log("validateImgOSBit OK!!!");
            return true;
        }
    }

}