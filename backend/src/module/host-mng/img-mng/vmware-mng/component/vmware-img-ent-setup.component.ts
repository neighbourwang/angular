import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary, SelectboxComponent } from '../../../../../architecture';

//model
import { EnterpriseModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgEntSetupService } from '../service/vmware-img-ent-setup.service';
import { VmwareImgDictService } from '../service/vmware-img-dict.service';

@Component({
    selector: "vmware-img-ent-setup",
    templateUrl: "../template/image-ent-set-vmware.html",
    styleUrls: [],
    providers: [ VmwareImgEntSetupService
    ]
}
)
export class VmwareImgEntSetupComponent implements OnInit {

    constructor(
        private router: Router,
        private dictService: VmwareImgDictService,
        private entService: VmwareImgEntSetupService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
        } else {
            this.showMsg('HOST_VMWARE_MNG.MUST_CHOOSE_PLATFORM');
        }

    }
    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
    
    @ViewChild("testbox")
    testbox: SelectboxComponent;

    noticeTitle = "";
    noticeMsg = "";

    //路由参数
    platformId: string;
    imageId: string;
    imageName: string;
    imagedisplayName: string;
    imageOs: string;
    imagebitsType: string;

    //
    selectedEnts: Array<EnterpriseModel>;
    unselectedEnts: Array<EnterpriseModel>;
    
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["imageId"] != null) {
                this.imageId = params["imageId"];                
                console.log(this.imageId, "this.imageId");
            }
            if (params["imageName"] != null) {
                this.imageName = params["imageName"];                
                console.log(this.imageName, "this.imageName");
            }
            if (params["imagedisplayName"] != null) {
                this.imagedisplayName = params["imagedisplayName"];                
                console.log(this.imagedisplayName, "this.imagedisplayName");
            }
            if (params["imageOs"] != null) {
                this.imageOs = params["imageOs"];                
                console.log(this.imageOs, "this.imageOs");
            }
            if (params["imagebitsType"] != null) {
                this.imagebitsType = params["imagebitsType"];                
                console.log(this.imagebitsType, "this.imagebitsType");
            }
        });
        this.getAllEnts();
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

    getAllEnts(): void {
        this.layoutService.show();
        this.entService.getAllEnts(this.platformId, this.imageId)
            .then(
            response => {  
                this.layoutService.hide();              
                if (response && 100 == response["resultCode"]) {                    
                    this.selectedEnts = response.resultContent.selectedTenants;
                    this.unselectedEnts = response.resultContent.unselectedTenants;
                    console.log(this.selectedEnts, "selectedEnts!!!");
                    console.log(this.unselectedEnts, "unselectedEnts!!!");
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

    //Menu: 设置企业，保存镜像的企业信息
    onSaveVmwareImgEnts() {
        this.layoutService.show();
        this.entService.saveVmwareImgEnts(this.imageId, this.selectedEnts)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.showAlert("HOST_VMWARE_MNG.SAVE_SUCCESS");
                    this.VmwareImgListPage();
                } else {
                    this.showAlert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    /*
    moveToRight() {
        //将选中的企业加入到右边
        for (var i = this.unselectedEnts.length - 1; i >= 0; i--) {
            if (this.unselectedEnts[i].selected) {
                let e = this.unselectedEnts.splice(i, 1);
                e[0].selected = false;
                this.selectedEnts.push(e[0]);
            }
        }
    }

    moveToLeft() {
        //将选中的企业加入到左边
        for (var i = this.selectedEnts.length - 1; i >= 0; i--) {
            if (this.selectedEnts[i].selected) {
                let e = this.selectedEnts.splice(i, 1);
                e[0].selected = false;
                this.unselectedEnts.push(e[0]);
            }
        }
    }
    */

}