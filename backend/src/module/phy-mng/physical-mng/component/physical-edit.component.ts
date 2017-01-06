import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import { PhysicalModel } from "../model/physical.model";
import { ServerType } from "../model/serverType.model";
import { Brand } from "../model/brand.model";

@Component({
    selector: "physical-edit",
    templateUrl: "../template/physical-edit.html",
    styleUrls: [],
    providers: []
})
export class PhysicalEditComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: PhysicalEditService,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
   
    @ViewChild("notice")
    notice: NoticeComponent;

    physical: PhysicalModel;
    edit = false;
    check = false;
    create=false;
    read=false;
    type: string;
    pmId:string;
    title: string;
    serverTypes:ServerType;
    brands:Brand;
   
    ngOnInit() {
        
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.pmId=id;
            this.type = params["type"];
            console.log(this.type);
            switch (this.type) {
                case "edit":
                    this.title = "编辑物理机";
                    this.edit = true;
                    break;
                case "check":
                    this.title = "查看物理机";
                    this.check = true;
                    break;  
                case "create":
                    this.title = "添加物理机";
                    this.create = true;
                    break;             
            }
             if (id) {
             this.getPhysicalById(id);
             }
        });
        this.getServerInfo();
    }
    
    //获取物理机信息
   getPhysicalById(id:string):void{
       this.layoutService.show();
       this.service.getPhysical(id)
       .then(
           response=>{
               this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.physical = response["resultContent"];
                } else {
                    alert("Res sync error");
                }
       }
       )
   }

   //获取物理机服务器的品牌、型号、类型
   getServerInfo(){
        this.layoutService.show();
        this.service.getServer()
       .then(
           response=>{
               this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.serverTypes = response["resultContent"].serverTypeList;
                    this.brands =response["resultContent"].brandList;
                } else {
                    alert("Res sync error");
                }
       }
       )
   }

   //编辑物理机
    editPhysical() {       
        this.layoutService.show();
        this.service.editPhysical(this.physical,this.pmId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //添加物理机
    createPhysical(){
         if (!this.physical.pmName) {
            this.showAlert("请填写物理机名称！");
            return false;
        }

        if (!this.physical.ipAddr) {
            this.showAlert("请填写IP地址！");
            return false;
        }

        if (!this.physical.username) {
            this.showAlert("请填写用户名！");
            return false;
        }
        if (!this.physical.password) {
            this.showAlert("请填写密码！");
            return false;
        }
        if (!this.physical.serverType) {
            this.showAlert("请选择服务器类型！");
            return false;
        }
        if (!this.physical.brand) {
            this.showAlert("请选择服务器品牌！");
            return false;
        }
        if (!this.physical.model) {
            this.showAlert("请选择服务器型号！");
            return false;
        }
        this.layoutService.show();
        this.service.createPhysical(this.physical)
        .then(
        response => {
            this.layoutService.hide();
            if (response && 100 == response["resultCode"]) {
                this.layoutService.hide();
                this.showAlert("添加物理机成功");
                this.gotoList();
            } else {
                alert("Res sync error");
            }
        }
        )
        .catch((e) => this.onRejected(e));
    }

    //读取物理机信息
    readHardwareInfo(){
        this.read=true;
        this.layoutService.show();
        this.service.getPhysicalHardwareInfo(this.physical)
         .then(
             response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                this.layoutService.hide();
            } else {
                alert("Res sync error");
            }
             }
         )       
    }

    cancel() {
        this.gotoList();
    }

    gotoList(){       
        this.route.navigate(["physical-mng/physical-mng"]);

    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

    
}