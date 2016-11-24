import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

//model
import { VmwareImgSyncModel, TenantModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgSyncService } from '../service/vmware-img-sync.service';
//import { VmwareEntListService } from '../service/enterprise-list.service';

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
        private dicService: SystemDictionaryService,
        private syncService: VmwareImgSyncService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
        } else {
            this.showMsg("必须指定相关的平台");
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

    typeDict: Array<SystemDictionary>;//镜像类型
    statusDict: Array<SystemDictionary>;//镜像状态
    bitDict: Array<SystemDictionary>;//os位数
    syncReslDict: Array<SystemDictionary>;//同步结果

    platformId: string;
    vmwaresyncimgs: Array<VmwareImgSyncModel>;

    ngOnInit() {
        this.dicService.getItems("IMAGES", "TYPE")
            .then(
            (dic) => {
                this.typeDict = dic;
                console.log(this.typeDict, "typeDict!!!");
                return this.dicService.getItems("IMAGES", "BITS_TYPE");
            })
            .then((dic) => {
                this.bitDict = dic;
                console.log(this.bitDict, "bitDict!!!");
                return this.dicService.getItems("IMAGES", "SYNC_RESULT");
            })
            .then((dic) => {
                this.syncReslDict = dic;
                console.log(this.syncReslDict, "syncResDict!!!");
                return this.dicService.getItems("IMAGES", "STATUS");
            })
            .then((dic) => {
                this.statusDict = dic;
                console.log(this.statusDict, "statusDict!!!");
                this.getVmwareImgSyncList();
            });

    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
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

    displayIt(tenants: Array<TenantModel>): String {
        //console.log(tenants.length, "tenants.length")
        if (tenants.length == 0)
            return "all";
        else if (tenants.length == 1)
            return "special";
        else
            return "some";

    }

    getVmwareImgSyncList(): void {
        this.layoutService.show();
        this.syncService.getVmwareImgSyncList(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.vmwaresyncimgs = response.resultContent;
                    console.log(this.vmwaresyncimgs, "vmwaresyncimgs!!!");
                } else {
                    alert("Res sync error");

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
        this.layoutService.show();
        this.syncService.VmwareSyncImages(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    //this.vmwaresyncimgs = response.resultContent;
                    //console.log(this.vmwaresyncimgs, "vmwaresyncimgs!!!");
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));

    }

}