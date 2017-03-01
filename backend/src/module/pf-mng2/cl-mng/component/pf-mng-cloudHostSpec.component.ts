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
    @ViewChild('confirm')
    confirm: ConfirmComponent;

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
        if(this.platformType=='0'){
            this.getFlavorList(this.platformId);            
        }   
        
    }
    //获取规格列表
    getFlavorList(id:string){
        this.service.getFlavorList(id).then(res=>{
            this.flavorlist=res.resultContent;
            console.log(res.resultContent);
        }).catch(err=>{
            console.log(err);
        }) 
    }
    //启用云主机规格
    enableSpec(){}
    //删除云主机规格
    deleSpec(){

    }
    //Opstack更新云主机规格
    updateSpec(){

    }
    //VMware新建云主机规格
    createSpec(){
        this.createSepc.open();
    }
    //确认创建
    otcreate(){
        this.flavorObj.platformId=this.platformId;
        console.log(this.flavorObj);
        this.service.vmFlavorNew(this.flavorObj).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
    //启用云主机规格
    enableFlavor(id:string){
        console.log(id)
    }
    deleFlavor(id:string){
        console.log(id)
    }
    //删除云主机规格
    ccf(){}
    back(){
        this.location.back();
    }
    goList(){
        this.route.navigate(['pf-mng2/cl-mng/cl-mng'])
    }
}
