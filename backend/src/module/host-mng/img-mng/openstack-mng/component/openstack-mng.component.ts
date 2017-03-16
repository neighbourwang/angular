import { Component, ViewChild, OnInit } from '@angular/core';
import {  Router,ActivatedRoute,Params  } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent,PopupComponent,
     ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary, SelectboxComponent } from '../../../../../architecture';

import { Image } from '../model/image.model';
import { CriteriaQuery} from '../model/criteria-query.model';
import { OpenstackMngService} from '../service/openstack-mng.service';
import { Tenant } from'../model/tenant.model';
import { SelectedTenantListService } from '../service/selected-tenant-list.service';
@Component({
    selector:"img-openstack-mng",
    templateUrl:"../template/image-mng-openStack-list.html",
    styleUrls:[],
    providers:[]

})
export class OpenstackMngComponent implements OnInit{

    constructor(
        private router: ActivatedRoute,
        private router2: Router,
        //private dicService: SystemDictionaryService,
        private service: OpenstackMngService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private tenantService: SelectedTenantListService
        ){
    }
    images:Array<Image>;
    tenants:Array<Tenant>;
    
    

    queryOpt: CriteriaQuery = new CriteriaQuery();
    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    platformId:string;
    platformName:string;

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("editImage")
    editImage: PopupComponent;

    @ViewChild("synTeImage")
    synTeImage: PopupComponent;

    // allList:Array<Tenant>;
    // selectedList:Array<Tenant> = new Array<Tenant>();
    // @ViewChild("testbox")
    // testbox: SelectboxComponent;

    noticeTitle = "";
    noticeMsg = "";

    // typeDic: Array<SystemDictionary>;//镜像类型
    // bits_typeDic: Array<SystemDictionary>;//系统位数
    // ownerDic: Array<SystemDictionary>;//归属
    // statusDic: Array<SystemDictionary>;//状态
    // osDic:Array<SystemDictionary>;//os

    selectedImage:Image = null;
    tempEditImage:Image = new Image();
    temp2:Image = new Image();

    capacity_GB:number;

    ngOnInit(){
        this.router.params.forEach((params: Params) => {
			this.platformId = params['platformId']? params['platformId']:"00721c45-17c9-4b68-b941-090ddd5db4b7";
            this.platformName = params['platformName'] ? params['platformName']:"上海HPE云平台服务F区";
			console.log("接收的platformId:" + this.platformId);
            console.log("接收的platformName:" + this.platformName);
		});
        // this.dicService.getItems("IMAGES", "TYPE")
        //     .then(
        //     (dic) => {
        //         this.typeDic = dic;
        //         return this.dicService.getItems("IMAGES", "BITS_TYPE");
        //     })
        //     .then((dic) => {
        //         this.bits_typeDic = dic;
        //         return this.dicService.getItems("IMAGES", "OWNER");
        //     })
        //     .then((dic) => {
        //         this.ownerDic = dic;
        //         return this.dicService.getItems("IMAGES", "ADM_STATUS");
        //     })
        //     .then((dic) => {
        //         this.statusDic = dic;
        //         return this.dicService.getItems("IMAGES","OS");
        //     })
        //     .then((dic)=>{
        //         this.osDic = dic;
        //         this.getTenants();
        //         this.getImages();
        //     });
            this.getTenants();
                this.getImages();
    }

    getTenants(){
        this.service.getTenants( this.platformId)
            .then(
                response =>{
                    if(response && 100 == response["resultCode"]){
                        this.tenants = response.resultContent;
                        //this.allList = this.tenants.slice(0);
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getImages(pageIndex?):void{
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.selectedImage = null;
        this.service.getImages(this.queryOpt, this.platformId, this.pageIndex, this.pageSize)
            .then(
                response =>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.layoutService.hide();
                        this.images = response.resultContent;
                        this.totalPage = response.pageInfo.totalPage;
                        this.selectedImage = null;
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }
    
    // //根据value获取字典的txt
    // getDicText(value: string, dic: Array<SystemDictionary>): String {
    //     if (!$.isArray(dic)) {
    //         return value;
    //     }
    //     const d = dic.find((e) => {
    //         return e.value == value;
    //     });
    //     if (d) {
    //         return d.displayValue;
    //     } else {
    //         return value;
    //     }

    // }
    // //根据value获取字典的txt
    // getDicTextforBit(value: string): String {
    //     let dic = this.bits_typeDic;
    //     if (!$.isArray(dic)) {
    //         return value;
    //     }
    //     const d = dic.find((e) => {
    //         return e.value == value;
    //     });
    //     if (d) {
    //         return d.displayValue;
    //     } else {
    //         return value;
    //     }

    // }
    selectImage(image:Image){
        this.images.forEach((e)=>{e.selected = false});
        image.selected = true;
        this.selectedImage = image;
        
    }
    imageEnableOrDisable(status:string){

        if(!this.selectedImage || ''== this.selectedImage.id){
            this.showAlert("HOST_OPENSTACK_MNG.PLEASE_CHOOSE_IMAGE");
        }else{
            if("0" == this.selectedImage.status){
                //选择的image当前是禁用状态
                if(status == "0"){
                    //选择禁用
                    this.showAlert("HOST_OPENSTACK_MNG.IMAGE_DISABLED");
                }else{
                    //选择启用
                     this.enableImage(this.selectedImage.id);
                }
            }
            else if ("1"== this.selectedImage.status){
                //选择的image当前是启用状态
                if(status == "1"){
                     //选择启用
                    this.showAlert("HOST_OPENSTACK_MNG.IMAGE_ENABLED");
                }else{
                    //选择禁用
                     this.disableImage(this.selectedImage.id);
                }
            }else if("2" == this.selectedImage.status){
                //选择的image当前是未启用状态
                if(status == "1"){
                     //选择启用
                     this.enableImage(this.selectedImage.id);
                }else{
                    //选择禁用
                     this.disableImage(this.selectedImage.id);
                }
            }
        }
    }
    //启用镜像
    enableImage(id:string){
        this.noticeTitle = "HOST_OPENSTACK_MNG.ENABLE_IMAGE";
        this.noticeMsg = 'HOST_OPENSTACK_MNG.ENABLE_IMAGE_MSG^^^'+this.selectedImage.displayName;
        
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
             this.layoutService.show();
            this.service.imageEnableOrDisable(this.selectedImage.id, '1')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getImages();
                            this.showAlert("HOST_OPENSTACK_MNG.IMAGE_ENABLE_SUCCESS");
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
            .catch((e) => this.onRejected(e));
        }
        this.confirm.open();
    }
        
    //禁用镜像
    disableImage(id:string){
        this.noticeTitle = "HOST_OPENSTACK_MNG.DISABLE_IMAGE";
        this.noticeMsg = 'HOST_OPENSTACK_MNG.DISABLE_IMAGE_MSG^^^'+this.selectedImage.displayName;
        
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.imageEnableOrDisable(this.selectedImage.id, '0')
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getImages();
                            this.showAlert("HOST_OPENSTACK_MNG.IMAGE_DISABLE_SUCCESS");
                        } else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
            .catch((e) => this.onRejected(e));
        }
        this.confirm.open();
    }

    //修改显示名称的弹出框
    openEidtDisplayName(image:Image){
        this.closeEditDisplayName();
        let temp:Image = new Image();
        temp.id = image.id;
        temp.name = image.name;
        temp.displayName = image.displayName;
        temp.os = image.os;
        temp.bitsType = image.bitsType;
        temp.type = image.type;
        temp.tenants = image.tenants;
        temp.status = image.status;
        temp.description = image.description;
        temp.capacity = image.capacity;
        temp.nameEditing = image.nameEditing;
        temp.selected = image.selected;
        this.temp2 = temp;
        
    }
    //关闭所有修改显示名称的弹出窗口
    closeEditDisplayName() {
        this.images.map((image) => {
            image.nameEditing = false;
        });
    }
    //更新显示名称
    updateEditDisplayName(image:Image){
        if (this.validationService.isBlank(this.temp2.displayName)) {
            this.showAlert("HOST_OPENSTACK_MNG.IMAGE_NAME_ENFORCED");
            return;
        }
        this.layoutService.show();
        this.service.saveEditImage(this.temp2)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let c = this.temp2;
                    image.id = c.id;
                    image.name = c.name;
                    image.displayName = c.displayName;
                    image.os = c.os;
                    image.bitsType = c.bitsType;
                    image.type = c.type;
                    image.tenants = c.tenants;
                    image.status = c.status;
                    image.description = c.description;
                    image.capacity = c.capacity;
                    image.selected = false;

                    image.nameEditing = false;

                    this.selectedImage = null;
                    this.editImage.close();
                } else {
                    this.selectedImage = null;
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    ////弹出编辑框
    createEdit(){
        this.closeEditDisplayName();
        if(!this.selectedImage){
            this.showAlert("HOST_OPENSTACK_MNG.PLEASE_CHOOSE_IMAGE");
        }else{
            let temp:Image = new Image();
            temp.id = this.selectedImage.id;
            temp.name = this.selectedImage.name;
            temp.displayName = this.selectedImage.displayName;
            temp.os = this.selectedImage.os;
            temp.bitsType = this.selectedImage.bitsType;
            temp.type = this.selectedImage.type;
            temp.tenants = this.selectedImage.tenants;
            temp.status = this.selectedImage.status;
            temp.description = this.selectedImage.description;
            temp.capacity = this.selectedImage.capacity;
            this.capacity_GB = Number((this.selectedImage.capacity/1024/1024/1024).toFixed(2));
            console.log("capacity:"+temp.capacity);
            temp.nameEditing = this.selectedImage.nameEditing;
            temp.selected = this.selectedImage.selected;
            this.tempEditImage= temp;
            this.editImage.open('HOST_OPENSTACK_MNG.EDIT_IMAGE');
        }
    }
    saveEdit(){
        if (this.validationService.isBlank(this.tempEditImage.displayName)) {
            this.showAlert("HOST_OPENSTACK_MNG.IMAGE_NAME_ENFORCED");
            return;
        }
        this.layoutService.show();
        this.tempEditImage.capacity = this.capacity_GB!=null?this.capacity_GB*1024*1024*1024 : this.tempEditImage.capacity;
        this.service.saveEditImage(this.tempEditImage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.getImages();
                    this.editImage.close();
                    this.showAlert("HOST_OPENSTACK_MNG.SAVE_SUCCESS");
                } else {
                    this.selectedImage = null;
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    cancelEdit(){

    }
    //同步企业选择弹出框
    createSynTeOption(){
        this.synTeImage.open("HOST_OPENSTACK_MNG.PLEASE_CHOOSE_ENTERPRISE");
    }
    //进入同步企业页面
    commitSynTe(){
        let tlist:Array<Tenant> = new Array<Tenant>();
        this.tenants.forEach((t)=>
            {
                if(t.selected){
                    tlist.push(t);
                }
            });
        if(tlist && tlist.length>0){
            this.tenantService.setList(tlist);
            this.router2.navigate(['host-mng/img-mng/openstack-mng/img-openstack-image-sync-ent', {"platformId": this.platformId,"platformName":this.platformName}]);
        }else{

        }
    }
    cancelCommitSynTe(){
        
    }


    search() {
        
        this.getImages();
        this.pager.render(1);
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("HOST_OPENSTACK_MNG.GETTING_DATA_FAILED");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "HOST_OPENSTACK_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    getImageTenant(ts:Array<Tenant>,type:string): String {
        if(type=="0"){
            return "HOST_OPENSTACK_MNG.ALL";
        }else {
            let t: Tenant = ts[0];
            if(t){
                return t.name?t.name:"无";
            }else{
                return "无";
            }
        }
    }
    //同步公共镜像
    syncPublic(){
        this.router2.navigate(['host-mng/img-mng/openstack-mng/img-openstack-image-sync-public', {"platformId": this.platformId,"platformName":this.platformName}]);
    }
    back(){
        this.router2.navigateByUrl('host-mng/img-mng/img-index');        
    }

    //显示镜像容量
    showCapacity(capacity:number){
        const Tn = 1099511627776.0;
        const Gn = 1073741824.0;
        const Mn = 1048576.0;
        const Kn = 1024.0;
        if(capacity==undefined){
            return "HOST_OPENSTACK_MNG.UNKNOWN"
        }else{
            let c = capacity;
            if(c==0){
                return "0";
            }
            if( c >= Tn){
                return (c/Tn).toFixed(2) + "T";
            }else if (c >= Gn){
                return (c/Gn).toFixed(2) + "G";
            }else if (c>=Mn){
                return (c/Mn).toFixed(2) + "M";
            }else{
                return (c/Kn).toFixed(2) + "K";
            }
        }
    }

    changeToGB(capacity:number):number{
        return 
    }
}