import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import {  IpmiInfo} from "../model/physical-ipmi.model";
import { PhysicalModel } from "../model/physical.model";

@Component({
    selector: "physical-ipmi",
    templateUrl: "../template/physical-ipmi.html",
    styleUrls: [],
    providers: []
})
export class PhysicalIpmiComponent implements OnInit {
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

   ipmi: IpmiInfo;
   pmId:string;
   physical:PhysicalModel;

   testIlo:boolean;

    ngOnInit() {
        // console.log(this.router.params);
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.pmId=id;  
            this.getPhysicalById(id);       
        });       
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
                    this.ipmi.ILOIPAddr=this.physical.ipAddr;
                    this.ipmi.ILOUserName=this.physical.username;
                    this.ipmi.ILOPwd=this.physical.password;
                    console.log("ip",this.ipmi.ILOIPAddr,"username", this.ipmi.ILOUserName,"password",  this.ipmi.ILOPwd);
                } else {
                    alert("Res sync error");
                }
       })
   }

   //验证IP
    isIP(val: any): boolean {
        const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
        return reg.test(val);
    }

   //保存IPMI信息
   saveIpmi(){
       if (!this.ipmi.ILOIPAddr) {
            this.showAlert("请填写ILO IP地址！");
            return false;
        }
        if(!this.isIP(this.ipmi.ILOIPAddr)){
            this.showAlert("IP不合要求,请重新填写ILO IP地址！");
            return false;
        }
        if (!this.ipmi.ILOUserName) {
            this.showAlert("请填写ILO用户名！");
            return false;
        }
        if (!this.ipmi.ILOPwd) {
            this.showAlert("请填写ILO密码！");
            return false;
        }
        if (!this.ipmi.ILOConfirmPwd) {
            this.showAlert("请填写ILO确认密码！");
            return false;
        } 
        if(!(this.ipmi.ILOPwd === this.ipmi.ILOConfirmPwd)){
            this.showAlert("确认密码与密码不一致，请确认！");
            return false;
        }     
       this.layoutService.show();
       this.service.updateIpmiInfo(this.ipmi,this.pmId)
       .then(
           response=>{
               this.layoutService.hide();
               if(response && 100 == response["resultCode"]){
                    this.layoutService.hide();
                    this.showAlert("保存成功！");
                    this.gotoList();
               }
           }
       )
   }

   //测试
   testIpmi(){
        if (!this.ipmi.ILOIPAddr) {
            this.showAlert("请填写ILO IP地址！");
            return false;
        }
        if(!this.isIP(this.ipmi.ILOIPAddr)){
            this.showAlert("IP不合要求,请重新填写ILO IP地址！");
            return false;
        }
        if (!this.ipmi.ILOUserName) {
            this.showAlert("请填写ILO用户名！");
            return false;
        }
        if (!this.ipmi.ILOPwd) {
            this.showAlert("请填写ILO密码！");
            return false;
        }
        if (!this.ipmi.ILOConfirmPwd) {
            this.showAlert("请填写ILO确认密码！");
            return false;
        } 
        if(!(this.ipmi.ILOPwd === this.ipmi.ILOConfirmPwd)){
            this.showAlert("确认密码与密码不一致，请确认！");
            return false;
        }     
        this.layoutService.show();
        this.service.testIomiInfo(this.ipmi)
        .then(
            response=>{
                this.layoutService.hide();
               if(response && 100 == response["resultCode"]){
                    this.layoutService.hide();
                    this.showAlert("ILO信息测试成功！");
               }
            }
        )
   }

   //返回物理机列表
    gotoList() {
        this.route.navigate(["physical-mng/physical-mng/physical-list"]);
    }
    
    //取消
    cancel() {
        this.gotoList();
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