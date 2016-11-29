import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PopupComponent, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

//model
import { VmwareImgModel, VmwareEntModel, CriteriaQuery, TenantModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgListService } from '../service/vmware-img-list.service';
import { VmwareEntListService } from '../service/enterprise-list.service';

@Component({
    selector: "vmware-img-list",
    templateUrl: "../template/image-mng-vmware-list.html",
    styleUrls: ["../style/vmware-mng.less"],
    providers: []
}
)
export class VmwareImgListComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: VmwareImgListService,
        private entService: VmwareEntListService,
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

    @ViewChild("editimagebox")
    editimagebox: PopupComponent;

    @ViewChild("enableimagebox")
    enableimagebox: PopupComponent;

    @ViewChild("disableimagebox")
    disableimagebox: PopupComponent;    

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 2;
    totalPage = 2;

    typeDict: Array<SystemDictionary>;//镜像类型
    statusDict: Array<SystemDictionary>;//镜像状态
    bitDict: Array<SystemDictionary>;//os位数

    platformId: string = "";
    queryOpt: CriteriaQuery = new CriteriaQuery();
    vmwareimgs: Array<VmwareImgModel>;
    selectedimg: VmwareImgModel = new VmwareImgModel();
    vmwareents: Array<VmwareEntModel>;

    private okCallback: Function = null;
    okClicked() {
        console.log('okClicked');
        if (this.okCallback) {
            console.log('okCallback()');
            this.okCallback();
            this.okCallback = null;
        }
    }

    private confirmedHandler: Function = null;
    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }

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
                return this.dicService.getItems("IMAGES", "STATUS");
            })
            .then((dic) => {
                this.statusDict = dic;
                console.log(this.statusDict, "statusDict!!!");
                this.getEntList();
                this.getVmwareImgList();
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

    //用于区分地显示镜像的企业
    displayIt(tenants: Array<TenantModel>): String {
        //console.log(tenants.length, "tenants.length")
        if (tenants.length == 0)
            return "all";
        else if (tenants.length == 1)
            return "special";
        else
            return "some";

    }

    //选择行
    selectItem(index:number): void {
        this.vmwareimgs.map(n=> {n.checked = false;});
        this.vmwareimgs[index].checked = true;
        console.log(this.vmwareimgs, this.vmwareimgs[index], "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.vmwareimgs.map(n=> {n.checked = false;});
        console.log(this.vmwareimgs, "=== Please see all items are Unselected ===");
    }

    getSelected() {
        let item = this.vmwareimgs.find((n) => n.checked) as VmwareImgModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("请选择相应的镜像");
            return null;
        }
    }

    getEntList(): void {
        this.layoutService.show();
        this.entService.getEntList(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.vmwareents = response.resultContent;
                    console.log(this.vmwareents, "Ents!!!");
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();
                }
            })
            .catch((e) => this.onRejected(e));
    }


    getVmwareImgList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getVmwareImgList(this.platformId, this.queryOpt, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.vmwareimgs = response.resultContent;
                    console.log(this.vmwareimgs, "Imgs!!!");
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.getVmwareImgList();
    }

    //Menu: 启用镜像
    enableImage(): void {
        console.log('call enableImage');
        let image = this.getSelected();
        if (image) {
            console.log(image, "========== enableImage =============");
            this.selectedimg = image;
            if(this.selectedimg.status == this.statusDict.find(n => n.code === "AVAILABLE").value){
                this.showMsg("镜像已被占用");
                return; 
            }
            this.enableimagebox.open();
        } else {
            this.showMsg("请选择镜像");
            return; 
        }
    }

    acceptVmwareImageEnableModify(): void {
        console.log('clicked acceptVmwareImageEnableModify');
        if (this.selectedimg) {
            this.service.enableImage(this.selectedimg.id, this.statusDict.find(n => n.code === "AVAILABLE").value)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "镜像启用成功")
                    } else {
                        this.showMsg("镜像启用失败");
                        return;
                    }
                })
                .then(() => {
                    this.getVmwareImgList();
                    this.enableimagebox.close();
                })
                .catch(err => {
                    console.log('镜像更新', err);
                    this.showMsg("镜像更新");
                    this.okCallback = () => { this.enableimagebox.open(); };
                })
        }
    }

    cancelVmwareImageEnableModify(): void {
        console.log('clicked cancelVmwareImageEnableModify');
    }

    //Menu: 禁用镜像
    disableImage(): void {
        console.log('call disableImage');
        let image = this.getSelected();
        if (image) {
            this.selectedimg = image;
            if(this.selectedimg.status == this.statusDict.find(n => n.code === "UNAVAILABLE").value){
                this.showMsg("镜像已被占用");
                return; 
            }
            this.disableimagebox.open();
        } else {
            this.showMsg("请选择镜像");
            return; 
        }
    }

    acceptVmwareImageDisableModify(): void {
        console.log('clicked acceptVmwareImageDisableModify');
        if (this.selectedimg) {
            console.log(this.selectedimg.id);
            this.service.disableImage(this.selectedimg.id, this.statusDict.find(n => n.code === "UNAVAILABLE").value)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "镜像禁用成功")
                    } else {
                        this.showMsg("镜像禁用失败");
                        return;
                    }
                })
                .then(() => {
                    this.getVmwareImgList();
                    this.disableimagebox.close();
                })
                .catch(err => {
                    console.log('镜像更新', err);
                    this.showMsg("镜像更新");
                    this.okCallback = () => { this.disableimagebox.open(); };
                })
        }
    }

    cancelVmwareImageDisableModify(): void {
        console.log('clicked cancelVmwareImageDisableModify');
    }

    //Menu: 编辑镜像
    editImage(): void {
        console.log('call editImage');
        let image = this.getSelected();
        if (image) {
            this.selectedimg = image;
            this.editimagebox.open();
        } else {
                this.showMsg("请选择镜像");
                return; 
        }
    }

    acceptVmwareImageModify(): void {
        console.log('clicked acceptVmwareImageModify');
        if (this.selectedimg) {
            if (this.validateImgModify()) {
                console.log(this.selectedimg.id);
                this.service.updateImage(this.selectedimg)
                    .then(res => {
                        if (res && res.resultCode == "100") {
                            console.log(res, "镜像更新成功")
                        } else {
                            this.showMsg("镜像更新失败");
                            return;
                        }
                    })
                    .then(() => {
                        this.getVmwareImgList();
                        this.editimagebox.close();
                    })
                    .catch(err => {
                        console.log('镜像更新', err);
                        this.showMsg("镜像更新");
                        this.okCallback = () => { this.editimagebox.open(); };
                    })
            }
        }
    }

    validate(name: string, val: any, op: string) {
        let map: any = {
            "*": {
                "func": this.validationService.isBlank,
                "msg": "不能为空"
            },
             "email": {
                "func": val => !this.validationService.isEmail(val),
                "msg": "邮箱地址无效"
            }
        }

        if (map[op].func(val)) {
            return name + map[op].msg;
        }
        else
            return undefined;
    }

    validateImgModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "镜像名称"
                , 'value': this.selectedimg.name
                , "op": "*"
            },
            {
                "name": "镜像显示名称"
                , 'value': this.selectedimg.displayName
                , "op": "*"
            },
            {
                "name": "镜像类型"
                , 'value': this.selectedimg.type
                , "op": "*"
            }
            ].find(n => this.validate(n.name, n.value, n.op) !== undefined)
        
        console.log(notValid, "notValid!!!")

        if (notValid !== void 0) {
            this.showMsg(this.validate(notValid.name, notValid.value, notValid.op));
            this.editimagebox.close();
            this.okCallback = () => {
                this.editimagebox.open();                
            };
            
            return false;
        } else {
            return true;
        }
    }

    cancelVmwareImageModify(): void {
        console.log('clicked cancelVmwareImageModify');
    }

    //Menu: 同步镜像
    VmwareImgSyncPage() {
        this.router.navigate([`host-mng/img-mng/vmware-img-sync/${this.platformId}`]);
    }

    //Menu: 设置企业
    VmwareImgEntSetup(): void {
        let image = this.getSelected();
        if (image) {
            if (image.type == this.typeDict.find(n => n.code === "ENT_IMAGE").value) {
                this.router.navigate([`host-mng/img-mng/vmware-img-ent-setup/${this.platformId}`,
                {
                    "imageId": image.id,
                    "imageName": image.name,
                    "imagedisplayName": image.displayName,
                    "imageOs": image.os,
                    "imagebitsTyep": image.bitsType,
                }
                ]);
            } else {
                this.showMsg("只有企业镜像才能设置企业，其他类型的镜像不能设置")
            }
        }

    }

    //Menu: 返回镜像管理界面
    ImgMngPage() {
        this.router.navigate([`host-mng/img-mng/img-index`]);
    }

    //Menu: 编辑镜像的显示名称
    onSelect(img: VmwareImgModel): void {
        let tmpimage = new VmwareImgModel();
        tmpimage.id = img.id;
        tmpimage.name = img.name;
        tmpimage.displayName = img.displayName;
        tmpimage.os = img.os;
        tmpimage.bitsType = img.bitsType;
        tmpimage.capacity = img.capacity;
        tmpimage.type = img.type;
        tmpimage.tenants = img.tenants;
        tmpimage.status = img.status;
        tmpimage.description = img.description;
        this.selectedimg = tmpimage;
    }

    onSave(img: VmwareImgModel): void {
        this.layoutService.show();
        if (this.validationService.isBlank(this.selectedimg.displayName)) {
            this.layoutService.hide();
            this.showAlert("镜像名称不能为空");
            return;
        }
        this.service.updateImage(this.selectedimg)
            .then(res => {
                if (res && res.resultCode == "100") {
                    this.layoutService.hide();
                    let cimage = this.selectedimg;
                    img.id = cimage.id;
                    img.name = cimage.name;
                    img.displayName = cimage.displayName;
                    img.os = cimage.os;
                    img.bitsType = cimage.bitsType;
                    img.capacity = cimage.capacity;
                    img.type = cimage.type;                    
                    img.status = cimage.status;
                    img.description = cimage.description;
                    img.nameEditing = false;
                    console.log(res, "镜像更新成功")
                } else {
                    this.layoutService.hide();
                    this.showMsg("镜像更新失败");
                    return;
                }
            })
            .catch((e) => this.onRejected(e))
    }

    onCancel(): void {
        let tmpimage = new VmwareImgModel();
        this.selectedimg.id = "";
        this.selectedimg.name = "";
        this.selectedimg.displayName = "";
        this.selectedimg.os = "";
        this.selectedimg.bitsType = "";
        this.selectedimg.capacity = "";
        this.selectedimg.type = "";
        this.selectedimg.tenants = [];
        this.selectedimg.status = "";
        this.selectedimg.description = "";
        this.selectedimg = tmpimage;
    }

}