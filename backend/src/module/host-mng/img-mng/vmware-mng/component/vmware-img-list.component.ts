import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PopupComponent, 
    PaginationComponent, ConfirmComponent, SystemDictionary } from '../../../../../architecture';

import { TranslateService } from 'ng2-translate';

//model
import { VmwareImgModel, VmwareEntModel, CriteriaQuery, TenantModel } from '../model/vmware-img-list.model';

//service
import { VmwareImgListService } from '../service/vmware-img-list.service';
import { VmwareImgDictService } from '../service/vmware-img-dict.service';

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
        private dictService: VmwareImgDictService,
        private service: VmwareImgListService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private activatedRouter : ActivatedRoute,
        private translateService: TranslateService
    ) {

        if (activatedRouter.snapshot.params["platformId"]) {
            this.platformId = activatedRouter.snapshot.params["platformId"];
            console.log("接收的platformId:" + this.platformId);
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

    @ViewChild("editimagebox")
    editimagebox: PopupComponent;

    @ViewChild("enableimagebox")
    enableimagebox: PopupComponent;

    @ViewChild("disableimagebox")
    disableimagebox: PopupComponent;    

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    typeDictArray: Array<SystemDictionary> = [];    
    statusDictArray: Array<SystemDictionary> = [];
    bitDictArray: Array<SystemDictionary> = [];
    osDictArray: Array<SystemDictionary> = [];
    
    platformId: string = "";
    platformName: string = "";
    queryOpt: CriteriaQuery = new CriteriaQuery();
    realQueryOpt: CriteriaQuery = new CriteriaQuery();
    vmwareimgs: Array<VmwareImgModel>;
    selectedimg: VmwareImgModel = new VmwareImgModel();
    changedimg: VmwareImgModel = new VmwareImgModel();
    vmwareents: Array<VmwareEntModel>;

    capacity: string = '';

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
       this.activatedRouter.params.forEach((params: Params) => {
            this.platformName = params['platformName'] ? params['platformName']:'VMware';//'HOST_VMWARE_MNG.HPE_VMWARE_PLATFORM';
            console.log("接收的platformName:" + this.platformName);
		});

        this.dictService.typeDict
        .then((items) => {
            this.typeDictArray = items;
            console.log(this.typeDictArray, "this.typeDictArray");
        });        
        this.dictService.statusDict
        .then((items) => {
            this.statusDictArray = items;
            console.log(this.statusDictArray, "this.statusDictArray");
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

        this.getEntList();
        this.getVmwareImgList();

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
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return null;
        }
    }

    getEntList(): void {
        this.layoutService.show();
        this.service.getEntList(this.platformId)
            .then(
            response => {   
                this.layoutService.hide();             
                if (response && 100 == response["resultCode"]) {                    
                    this.vmwareents = response.resultContent;
                    console.log(this.vmwareents, "Ents!!!");
                } else {
                    this.showAlert("HOST_VMWARE_MNG.GETTING_DATA_FAILED");
                }
            })
            .catch((e) => this.onRejected(e));
    }


    getVmwareImgList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getVmwareImgList(this.platformId, this.realQueryOpt, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.vmwareimgs = response.resultContent;
                    console.log(this.vmwareimgs, "Imgs!!!");
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    this.showAlert("HOST_VMWARE_MNG.GETTING_DATA_FAILED");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.totalPage = 1;
        this.pager.render(1);
        this.getVmwareImgList(1);
    }

    //Menu: 启用镜像
    enableImage(): void {
        console.log('call enableImage');
        let image = this.getSelected();
        if (image) {
            this.selectedimg = image;
            if(this.selectedimg.status == this.statusDictArray.find(n => n.code === "ENABLE").value){
                this.showMsg("HOST_VMWARE_MNG.IMAGE_ENABLED");
                return;
            }
            this.enableimagebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return; 
        }
    }

    acceptVmwareImageEnableModify(): void {
        console.log('clicked acceptVmwareImageEnableModify');        
        if (this.selectedimg) {
            this.layoutService.show();
            this.service.enableImage(this.selectedimg.id, this.statusDictArray.find(n => n.code === "ENABLE").value)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.selectedimg.status = <string>this.statusDictArray.find(n => n.code === "ENABLE").value;
                        console.log(res, "镜像启用成功")
                    } else {
                        this.enableimagebox.close();
                        this.showMsg("HOST_VMWARE_MNG.IMAGE_ENABLE_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.enableimagebox.close();
                })
                .catch(err => {
                    console.log('镜像启用异常', err);
                    this.layoutService.hide();
                    this.enableimagebox.close();
                    this.showMsg("HOST_VMWARE_MNG.IMAGE_ENABLE_EXCEPTION");
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
            if(this.selectedimg.status == this.statusDictArray.find(n => n.code === "FORBIDDEN").value){
                this.showMsg("HOST_VMWARE_MNG.IMAGE_DISABLED");
                return; 
            }
            this.disableimagebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return; 
        }
    }

    acceptVmwareImageDisableModify(): void {
        console.log('clicked acceptVmwareImageDisableModify');        
        if (this.selectedimg) {
            this.layoutService.show();
            console.log(this.selectedimg.id);
            this.service.disableImage(this.selectedimg.id, this.statusDictArray.find(n => n.code === "FORBIDDEN").value)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.selectedimg.status = <string>this.statusDictArray.find(n => n.code === "FORBIDDEN").value;
                        console.log(res, "镜像禁用成功")
                    } else {
                        this.disableimagebox.close();
                        this.showMsg("HOST_VMWARE_MNG.IMAGE_DISABLE_FAILED");
                        return;
                    }
                })
                .then(() => {
                    this.disableimagebox.close();
                })
                .catch(err => {
                    console.log('镜像禁用异常', err);
                    this.layoutService.hide();
                    this.disableimagebox.close();
                    this.showMsg("HOST_VMWARE_MNG.IMAGE_DISABLE_EXCEPTION");
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
            this.changedimg.id = this.selectedimg.id;
            this.changedimg.name = this.selectedimg.name;
            this.changedimg.displayName = this.selectedimg.displayName;
            this.changedimg.os = this.selectedimg.os;
            this.changedimg.bitsType = this.selectedimg.bitsType;
            this.changedimg.capacity = this.selectedimg.capacity;
            this.capacity = (Number(this.selectedimg.capacity)/1024/1024/1024).toFixed(2).toString();
            this.changedimg.type = this.selectedimg.type;
            this.changedimg.description = this.selectedimg.description;
            this.editimagebox.open();
        } else {
            this.showMsg("HOST_VMWARE_MNG.PLEASE_CHOOSE_IMAGE");
            return;
        }
    }

    acceptVmwareImageModify(): void {
        console.log('clicked acceptVmwareImageModify');        
        if (this.selectedimg) {
            if (this.validateImgModify()) {
                this.layoutService.show();
                this.service.updateImage(this.changedimg)
                    .then(res => {
                        this.layoutService.hide();
                        if (res && res.resultCode == "100") {                            
                            console.log(res, "镜像更新成功")
                        } else {
                            this.editimagebox.close();
                            this.showMsg("HOST_VMWARE_MNG.IMAGE_UPDATE_FAILED");
                            return;
                        }
                    })
                    .then(() => {
                        this.selectedimg.name = this.changedimg.name;
                        this.selectedimg.displayName = this.changedimg.displayName;
                        this.selectedimg.os = this.changedimg.os;
                        this.selectedimg.bitsType = this.changedimg.bitsType;
                        this.changedimg.capacity = String(Number(this.capacity)*1024*1024*1024); 
                        this.selectedimg.capacity = this.changedimg.capacity;
                        this.selectedimg.type = this.changedimg.type;
                        this.selectedimg.description = this.changedimg.description;
                        this.editimagebox.close();
                    })
                    .catch(err => {
                        console.log('镜像更新异常', err);
                        this.layoutService.hide();
                        this.editimagebox.close();
                        this.showMsg("HOST_VMWARE_MNG.IMAGE_UPDATE_EXCEPTION");
                        this.okCallback = () => { this.editimagebox.open();};
                    });
            } else {
                console.log('镜像更新验证失败');
            }
        } else {
            console.log('this.selectedimg wrong!');
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
            }
        }

        if (map[op].func(val)) {
            return [name, map[op].msg];
        }
        else
            return undefined;
    }

    validateImgModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "HOST_VMWARE_MNG.IMAGE_NAME"  //镜像名称
                , 'value': this.changedimg.name
                , "op": "*"
            },
            {
                "name": "HOST_VMWARE_MNG.IMAGE_DISPLAY_NAME"  //镜像显示名称
                , 'value': this.changedimg.displayName
                , "op": "*"
            },
            {
                "name": "HOST_VMWARE_MNG.IMAGE_TYPE"  //镜像类型
                , 'value': this.changedimg.type
                , "op": "*"
            }
            ].find(n => this.validate(n.name, n.value, n.op) !== undefined);
        
        console.log(notValid, "notValid!!!");

        if (notValid !== void 0) {
            this.editimagebox.close();
            let name = this.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.editimagebox.open();
            };
            return false;
        } else {
            console.log("validateImgModify OK!!!");
            return true;
        }
    }

    cancelVmwareImageModify(): void {
        console.log('clicked cancelVmwareImageModify');
        this.changedimg.id = "";
        this.changedimg.name = "";
        this.changedimg.displayName = "";
        this.changedimg.os = "";
        this.changedimg.bitsType = "";
        this.changedimg.capacity = "";
        this.changedimg.type = "";
        this.changedimg.description = "";
    }

    //Menu: 同步镜像
    VmwareImgSyncPage() {
        this.router.navigate([`host-mng/img-mng/vmware-img-sync/${this.platformId}`, {"platformName": this.platformName}]);
    }

    //Menu: 设置企业
    VmwareImgEntSetup(): void {
        let image = this.getSelected();
        if (image) {
            if (image.type == this.typeDictArray.find(n => n.code === "ENT_IMAGE").value) {
                this.router.navigate([`host-mng/img-mng/vmware-img-ent-setup/${this.platformId}`,
                {
                    "imageId": image.id,
                    "imageName": image.name,
                    "imagedisplayName": image.displayName,
                    "imageOs": image.os,
                    "imagebitsType": image.bitsType,
                }
                ]);
            } else {
                this.showMsg("HOST_VMWARE_MNG.ONLY_ENT_IMAGE_CAN_SET_ENT")
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
        if (this.validationService.isBlank(this.selectedimg.displayName)) {
            this.showAlert("HOST_VMWARE_MNG.IMAGE_NAME_ENFORCED");
            return;
        }
        this.layoutService.show();
        this.service.updateImage(this.selectedimg)
            .then(res => {
                this.layoutService.hide();
                if (res && res.resultCode == "100") {
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
                    this.showMsg("HOST_VMWARE_MNG.IMAGE_UPDATE_FAILED");
                    return;
                }
            })
            //.catch((e) => this.onRejected(e))
            .catch(err => {
                console.log('镜像更新异常', err);
                this.layoutService.hide();
                this.showMsg("HOST_VMWARE_MNG.IMAGE_UPDATE_EXCEPTION");
            })
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