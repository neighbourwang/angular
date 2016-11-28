import { Component, ViewChild, OnInit } from '@angular/core';
import {  Router,ActivatedRoute,Params  } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent,PopupComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

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

    platformId:string = "cade848b-6f98-447e-87d7-eb59aa5859af";
    platformName:string = "武汉云平台";

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

    noticeTitle = "";
    noticeMsg = "";

    typeDic: Array<SystemDictionary>;//镜像类型
    bits_typeDic: Array<SystemDictionary>;//系统位数
    ownerDic: Array<SystemDictionary>;//归属
    statusDic: Array<SystemDictionary>;//状态

    selectedImage:Image = null;
    tempEditImage:Image = new Image();
    temp2:Image = new Image();

    ngOnInit(){
        this.router.params.forEach((params: Params) => {
			this.platformId = params['platformId'];
            this.platformName = params['platformName'];
			console.log("接收的platform_id:" + this.platformId);
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
        this.service.getImages(this.queryOpt, this.platformId, this.pageIndex, this.pageSize)
            .then(
                response =>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.layoutService.hide();
                        this.images = response.resultContent;
                        this.totalPage = response.pageInfo.totalPage;
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
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
    selectImage(image:Image){
        this.images.forEach((e)=>{e.selected = false});
        image.selected = true;
        this.selectedImage = image;
        
    }
    
    imageEnableOrDisable(status:string){

        if(!this.selectedImage || ''== this.selectedImage.id){
            this.showAlert("请先选中一个镜像");
        }else{
            if("0" == this.selectedImage.status){
                //选择的image当前是禁用状态
                if(status == "0"){
                    //选择禁用
                    this.showAlert("该镜像已是禁用状态");
                }else{
                    //选择启用
                     this.enableImage(this.selectedImage.id)
                }
            }
            else if ("1"== this.selectedImage.status){
                //选择的image当前是启用状态
                if(status == "1"){
                     //选择启用
                    this.showAlert("该镜像已是启用状态");
                }else{
                    //选择禁用
                     this.disableImage(this.selectedImage.id)
                }
            }
        }
    }
    //启用镜像
    enableImage(id:string){
        this.noticeTitle = "启用镜像";
        this.noticeMsg = `您选择启用 '${this.selectedImage.displayName}?' , 
                            请确认;如果确认,用户将能够在订购中选择此镜像.`
        
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.service.imageEnableOrDisable(this.selectedImage.id, '1')
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
        }
        this.confirm.open();
    }
        
    //禁用镜像
    disableImage(id:string){
        this.noticeTitle = "禁用镜像";
        this.noticeMsg = `您选择禁用 '${this.selectedImage.displayName}?' , 
                            请确认;如果确认,用户将不能够在订购中选择此镜像.`
        
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.service.imageEnableOrDisable(this.selectedImage.id, '0')
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
        temp.bitesType = image.bitesType;
        temp.type = image.type;
        temp.tenants = image.tenants;
        temp.status = image.status;
        temp.description = image.description;
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
            this.showAlert("镜像显示名称不能为空");
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
                    image.bitesType = c.bitesType;
                    image.type = c.type;
                    image.tenants = c.tenants;
                    image.status = c.status;
                    image.description = c.description;
                    image.selected =c.selected;

                    image.nameEditing = false;


                    this.editImage.close();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    ////弹出编辑框
    createEdit(){
        this.closeEditDisplayName();
        if(!this.selectedImage){
            this.showAlert("请先选择要编辑的镜像");
        }else{
            let temp:Image = new Image();
            temp.id = this.selectedImage.id;
            temp.name = this.selectedImage.name;
            temp.displayName = this.selectedImage.displayName;
            temp.os = this.selectedImage.os;
            temp.bitesType = this.selectedImage.bitesType;
            temp.type = this.selectedImage.type;
            temp.tenants = this.selectedImage.tenants;
            temp.status = this.selectedImage.status;
            temp.description = this.selectedImage.description;

            temp.nameEditing = this.selectedImage.nameEditing;
            temp.selected = this.selectedImage.selected;
            this.tempEditImage= temp;
            this.editImage.open('编辑镜像');
        }
    }
    saveEdit(){
        if (this.validationService.isBlank(this.selectedImage.displayName)) {
            this.showAlert("镜像显示名称不能为空");
            return;
        }
        this.layoutService.show();
        this.service.saveEditImage(this.tempEditImage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.getImages();
                    this.editImage.close();
                    this.showAlert("编辑成功");
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    cancelEdit(){

    }
    //同步企业选择弹出框
    createSynTeOption(){
        this.synTeImage.open("请选择企业");
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
        if(!tlist && tlist.length>0){
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
        this.showAlert("获取数据失败！");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    getImageTenant(ts:Array<Tenant>): String {
        let t: Tenant = ts[0];
        return t.name;
    }
    //同步公共镜像
    syncPublic(){
        this.router2.navigate(['host-mng/img-mng/openstack-mng/img-openstack-image-sync-public', {"platform_id": this.platformId,"platformName":this.platformName}]);
    }
}