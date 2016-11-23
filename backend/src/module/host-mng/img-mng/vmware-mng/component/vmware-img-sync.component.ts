import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

//model
import { VmwareImgModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgListService } from '../service/vmware-img-list.service';

@Component({
    selector: "vmware-img-sync",
    templateUrl: "../template/image-mng-vmware-list.html",
    styleUrls: [],
    providers: []
}
)
export class VmwareImgSyncComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: VmwareImgListService,
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

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    typeDict: Array<SystemDictionary>;//镜像类型
    statusDict: Array<SystemDictionary>;//镜像状态
    bitDict: Array<SystemDictionary>;//os位数

    platformId: string;
    vmwareimgs: Array<VmwareImgModel>;



    ngOnInit() {
        this.dicService.getItems("IMAGES", "TYPE")
            .then(
            (dic) => {
                this.typeDict = dic;
                return this.dicService.getItems("IMAGES", "BITS_TYPE");
            })
            .then((dic) => {
                this.bitDict = dic;
                return this.dicService.getItems("IMAGES", "STATUS");
            })
            .then((dic) => {
                this.statusDict = dic;
                //this.getNetworkList();
                //this.getOptionInfo();
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

    getVmwareImgList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getVmwareImgList(this.platformId, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.vmwareimgs = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
}