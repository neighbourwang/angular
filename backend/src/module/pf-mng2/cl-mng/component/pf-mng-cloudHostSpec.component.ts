import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent ,PopupComponent } from '../../../../architecture';

//service
import { FlavorService } from '../service/platform-mng-flavor.service';
//model
import { Flavor ,FlavorObj} from '../model/flavor.model'

@Component({
    templateUrl: '../template/pf-mng-cloudHostSpec.component.html',
    styles: [],
    providers: []
})
export class CloudHostSpecComponent implements OnInit {
    constructor(private layoutService:LayoutService,
                private route:Router,
                private router:ActivatedRoute,
                private location :Location,
                private service :FlavorService
                ) {
    }
    @ViewChild('enableConfirm')
    enableConfirm: ConfirmComponent;

    @ViewChild('deleteConfirm')
    deleteConfirm: ConfirmComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('createSepc')
    createSepc:PopupComponent;
    // 云平台类型
    platformType : string;
    // 云平台类型名
    platformTypeName :string;
    //云平台类型
    platformName:string;
    platformId:string;
    //规格列表
    flavorlist:Array<Flavor>;
    flavorObj:FlavorObj=new FlavorObj();
    //初始化
    ngOnInit() {
        this.router.params.forEach((params: Params)=>{
             this.platformId=params['id'];
             this.platformName=params['name'];
             this.platformType=params['type'];
             this.platformTypeName=
             this.platformType=='0'?'OpenStack':'Vmware';
        }) 
        // if(this.platformType=='0'){
            this.getFlavorList(this.platformId);            
        // }   
        
    }
    //获取规格列表
    getFlavorList(id:string){
        this.layoutService.show();
        this.service.getFlavorList(id).then(res=>{
            this.flavorlist=res.resultContent;
            console.log(res.resultContent);
            this.layoutService.hide();
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();
        }) 
    }
    
    //Opstack同步云主机规格
    updateFlavor(){       
        this.layoutService.show();
        this.service.updateFlavorList(this.platformId).then(res=>{
            console.log('update',res);
            if(res.resultContent.length==0){
                this.notice.open('COMMON.PROMPT','PF_MNG2.NO_SYNC_SPEC_INFO');
            }else{
                this.getFlavorList(this.platformId);                
            }
            this.layoutService.hide();                        
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();
        })
    }
    nof(){}
    //VMware新建云主机规格
    createFlavor(){
        this.flavorObj=new FlavorObj();
        this.createSepc.open();
    }
    //确认创建
    otcreate(){
        this.flavorObj.platformId=this.platformId;
        console.log(this.flavorObj);
        if(!this.flavorObj.name){
            this.flavorObj.nameValid=false;
            return;
        };
        if(!this.flavorObj.cpu){
            this.flavorObj.cpuValid=false;
            return;
        };
        if(!this.flavorObj.mem){
            this.flavorObj.memValid=false;
            return;
        };
        if(!this.flavorObj.disk){
            this.flavorObj.diskValid=false;
            return;
        };
        this.layoutService.show();
        this.service.vmFlavorNew(this.flavorObj).then(res=>{
            console.log(res);
            this.getFlavorList(this.platformId);
            this.createSepc.close()
            this.layoutService.hide();                        
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();
        })
         
    }
    //取消创建
    ccCreate(){
    }
    //启用云主机规格
    selectFlavor:FlavorObj;
    enableFlavor(flavor){
        console.log(flavor);
        this.selectFlavor=flavor;
        this.enableConfirm.open('启用启动盘',"你选择启用 '"+flavor.name+"' 云主机规格，请确认")
    }
    cofEnable(){
        this.layoutService.show();
        this.service.enableFlavor(this.selectFlavor.id).then(res=>{
            console.log(res);
            this.getFlavorList(this.platformId);
            this.layoutService.hide();                        
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();
        })
    }
    //删除云主机规格
    deleFlavor(flavor){
        console.log(flavor);        
        this.selectFlavor=flavor;
        this.deleteConfirm.open('启用启动盘',"你选择删除 '"+flavor.name+"' 云主机规格，请确认")        
    }
    cofDelete(){
        this.layoutService.show();
        this.service.deleteFlavor(this.selectFlavor.id).then(res=>{
            console.log(res);
            this.getFlavorList(this.platformId);
            this.layoutService.hide();                        
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();
        })
    }    
    ccf(){}
    
    back(){
        this.location.back();
    }
    goList(){
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
}
