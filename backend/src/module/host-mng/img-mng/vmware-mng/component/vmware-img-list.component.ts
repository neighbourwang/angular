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
    //启用，禁用，删除的处理
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
            //console.log("==========getSelected 1=============");
            return item;
        }
        else {
            //console.log("==========getSelected 2=============");
            this.showMsg("请选择相应的PortGroup");
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

    findTenant(tenant: TenantModel, id: string): boolean {
        return tenant.id === id;
    }

    filter(): void {
        /*
            this.ipmngs = this.rawipmngs.filter((item)=>{
                return ( this.selectedVDS == "" || item.clusterName == this.selectedVDS ) &&
                ( this.selectedDC.dcName == "" || item.dataCenter == this.selectedDC.dcName )
            })
            this.UnselectItem();
        */
        this.getVmwareImgList();
        this.vmwareimgs = this.vmwareimgs.filter((item) => {
            return (this.queryOpt.type == "" || item.type == this.queryOpt.type) &&
                (this.queryOpt.tenantId == "" || item.tenants.find( (item) => {
                    return item.id === this.queryOpt.tenantId;
                } ) != undefined 
                )
        })

    }

    //Menu: 启用镜像
    enableImage(): void {
        let image = this.getSelected();
        if(image){
            this.selectedimg = image;
            console.log(this.selectedimg.id);
            //console.log(this.pg_id);
            if(this.selectedimg.status == this.statusDict.find(n => n.code === "AVAILABLE").value){
                this.showMsg("镜像已被占用");
                return; 
            }
            this.service.enableImage(this.selectedimg.id, "enable")
            .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "镜像启用成功")
                    } else {
                        this.showMsg("镜像启用失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getVmwareImgList();
                })
                .catch((e) => this.onRejected(e))
        }
    }

    //Menu: 禁用镜像
    disableImage(): void {
        let image = this.getSelected();
        if(image){
            this.selectedimg = image;
            console.log(this.selectedimg.id);
            //console.log(this.pg_id);
            if(this.selectedimg.status == this.statusDict.find(n => n.code === "UNAVAILABLE").value){
                this.showMsg("镜像还未占用");
                return; 
            }
            this.service.enableImage(this.selectedimg.id, "disable")
            .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "镜像禁用成功")
                    } else {
                        this.showMsg("镜像禁用失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getVmwareImgList();
                })
                .catch((e) => this.onRejected(e))
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

    //验证设置镜像信息
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

    //Menu: 编辑镜像
    editImage(): void {
        console.log('conponent: editImage');
        let image = this.getSelected();
        if (image) {
            console.log(image, "========== editImage =============");
            // OR get subenet information from API
            //this.subn.portGroup = pg.id;
            this.selectedimg = image;
            this.editimagebox.open();
        } else {
                this.showMsg("请选择镜像");
                return; 
        }
    }

    //Menu: 同步镜像
    VmwareImgSyncPage() {
        this.router.navigate([`host-mng/img-mng/vmware-img-sync/${this.platformId}`]);
    }

    //Menu: 设置企业
    VmwareImgEntSetup(): void {
        
    }



    //Menu: 返回镜像管理界面
    ImgMngPage() {
        this.router.navigate([`host-mng/img-mng/img-index/img-index`]);
    }


/*

    onSelect(img: VmwareImgModel): void {
        let tmpimage = new VmwareImgModel();
        tmpimage.id = img.id;
        tmpimage.name = img.name;
        tmpimage.displayName = img.displayName;
        tmpimage.os = img.os;
        tmpimage.bitsType = img.bitsType;
        tmpimage.type = img.type;
        tmpimage.tenants = img.tenants;
        tmpimage.status = img.status;
        tmpimage.description = img.description;
        this.selectedimg = tmpimage;
        console.log(this.selectedimg);
    }

    onSave(img: VmwareImgModel): void {
        this.layoutService.show();
        //this.service.updateImage(image);   //selectedimage.id and selectedimage.name
        if(this.validationService.isBlank(this.selectedimg.name)){
            this.showAlert("镜像名称不能为空");
            return;
        }
    }
*/
}