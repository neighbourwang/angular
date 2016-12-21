import { Component,OnInit,ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../../architecture';

import { Image } from'../model/image.model';
import { OpenstackMngService} from '../service/openstack-mng.service';
import { SelectedTenantListService } from '../service/selected-tenant-list.service';
import { Tenant} from'../model/tenant.model';
@Component({
    selector:"img-openstack-image-sync-ent",
    templateUrl:"../template/image-ent-sync-openStack.html",
    styleUrls:[],
    providers:[]

})
export class OpenstackImageSyncEntComponent implements OnInit{
    constructor(
        private router: ActivatedRoute,
        private router2: Router,
        //private dicService: SystemDictionaryService,
        private service: OpenstackMngService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private tenantService: SelectedTenantListService

    ){}

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    platformId:string;
    platformName:string;
    images:Array<Image>;
    //syncImages:Array<SyncImage>;
    images_needsync:Array<Image>;
    
    postTenants:Array<Tenant>;//用于post的参数
    
    selectedTenantList:Array<Tenant>;//用户在上一个页面选择的企业列表
    
    defaultSelected:Tenant = new Tenant();//默认选择的企业
    selectedTenant:Tenant = this.defaultSelected;//当前选择的企业，初始为空
    


    // typeDic: Array<SystemDictionary>;//镜像类型
    // bits_typeDic: Array<SystemDictionary>;//系统位数
    // ownerDic: Array<SystemDictionary>;//归属
    // statusDic: Array<SystemDictionary>;//状态
    // syncDic: Array<SystemDictionary>;//同步结果
    // osDic: Array<SystemDictionary>;//操作系统

    ngOnInit(){
        this.selectedTenantList = this.tenantService.getList();
        this.postTenants = this.selectedTenantList;

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
        //         return this.dicService.getItems("IMAGES", "SYNC_RESULT");
        //     })
        //     .then((dic)=>{
        //         this.syncDic = dic;
        //         return this.dicService.getItems("IMAGES","OS");
        //     })
        //     .then((dic)=>{
        //         this.osDic = dic;
        //     });

        this.router.params.forEach((params: Params) => {
			this.platformId = params['platformId'];
            this.platformName = params['platformName'];
			console.log("platformId:" + this.platformId);
            console.log("接收的platformName:" + this.platformName);
			this.getSynImages();
		});
    }

    search(){
        if(this.selectedTenant == this.defaultSelected){
            //选择所有
            this.postTenants = this.selectedTenantList;
            this.getSynImages();
        }else{
            //选择了一个企业
            this.postTenants = new Array<Tenant>();
            this.postTenants.push(this.selectedTenant);
            this.getSynImages();
        }

    }

    getSynImages():void{
        this.layoutService.show();
        this.service.getSynImages_ent( this.platformId, this.postTenants)
            .then(
                response =>{
                    this.layoutService.hide();
                    if(response && 100 == response["resultCode"]){
                        this.layoutService.hide();
                        this.images = response.resultContent;
                    } else{
                        alert("Res.sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    //同步操作
    doSync(){
        //先清空

        //this.images_needsync.splice(0,this.images_needsync.length);
        this.images_needsync = new Array<Image>();

        if(this.images && this.images.length>0){
            this.images.forEach( (i)=>{
                if(i.selected){
                    if(!i.displayName || i.displayName == ""){
                        i.displayName = i.name;
                    }
                    if(!i.bitsType || i.bitsType==""){
                        i.bitsType=null;
                    }
                    if(!i.os || i.os==""){
                        i.os=null;
                    }
                    this.images_needsync.push(i);
                }
            });

            if(this.images_needsync.length == 0){
                this.showAlert("请勾选要同步的镜像");
            }else{
                this.layoutService.show();
                this.service.doSynImages_ent(this.platformId, this.images_needsync)
                .then(
                    response =>{
                        this.layoutService.hide();
                        if(response && 100 == response["resultCode"]){
                            this.layoutService.hide();
                            this.getSynImages();
                            this.showAlert("同步成功");
                        } else{
                            alert("Res.sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
            }
        }else{
            console.log("镜像列表为空");
        }
        
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
   
    back(){
        this.router2.navigate(['host-mng/img-mng/openstack-mng', {"platformId": this.platformId,"platformName":this.platformName}]);
    }
    // //编辑时 默认系统位数选项
    // setDefaultBits(type:SystemDictionary, value:string){
    //     if(value == type.value){
    //         let classes =  {
    //             selected:"selected"
    //         };
    //         return classes;
    //     }
    // }
    // //编辑时 默认操作系统选项
    // setDefaultOs(type:SystemDictionary, value:string){
    //     // if(value == type.value){
    //     //     let classes =  {
    //     //         selected:"selected"
    //     //     };
    //     //     return classes;
    //     // }
    //     let classes =  {
    //             disabled:"disabled"
    //         };
    //     return classes;
        
    // }
      

   
}