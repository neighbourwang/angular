import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent} from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import { PhysicalModel,CPU,Memory,Disk } from "../model/physical.model";
import { ServerType } from "../model/serverType.model";
import { Brand, Model } from "../model/brand.model";
//import { IpmiInfo } from "../model/physical-ipmi.model";

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

    physical: PhysicalModel = new PhysicalModel(); //物理机实力
 
    eidtMode: string = "create"; //页面显示状态 create / eidt / view
    read = false;
    title: string; //编辑或添加的title
    serverTypes: ServerType[]; // 服务器类型列表
    brands: Brand[]; //品牌列表
    defaultBrand = new Brand(); //空品牌
    selectedBrand: Brand = this.defaultBrand;
    poolId:string;
    ngOnInit() {
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.physical.pmId = id;
            this.eidtMode = params["type"]||"create";
            this.poolId = params["poolId"];
            
            if (!this.poolId) {
                alert("缺少参数");
                return;
            }
            console.log(this.eidtMode);
            switch (this.eidtMode) {
                case "edit":
                    this.title = "PHYSICAL_MNG.EDIT_PHYSICAL";
                    break;
                case "view":
                    this.title = "PHYSICAL_MNG.VIEW_PHYSICAL";
                    break;
                case "create":
                    this.title = "PHYSICAL_MNG.CREATE_PHYSICAL";
                    break;
            }

        });
        this.getServerInfo()
            .then(() => {
                if (this.physical.pmId) {
                    this.getPhysicalById(this.physical.pmId);
                } else {
                    this.physical=new PhysicalModel();
                }
            });
    }

    //获取物理机信息
    getPhysicalById(id: string): void {
        this.layoutService.show();
        this.service.getPhysical(id)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        var physical: PhysicalModel = response["resultContent"];
                        this.selectedBrand = this.brands.find((brand) => { return brand.id == physical.brandId });
                        this.physical = physical;
                        console.log("编辑物理机", this.physical.pmHardwareCPU,this.physical.iloIPAddress);
                    } else {
                        alert("Res sync error");
                    }
                }
            );
    }

    //获取物理机服务器的品牌、型号、类型
    getServerInfo(): Promise<any> {
        this.layoutService.show();
        return this.service.getServer()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                   // this.serverTypes = response["resultContent"].serverTypeList;
                    this.brands = response["resultContent"];
                } else {
                    alert("Res sync error");
                }
            }
            );
    }

    //编辑物理机
    editPhysical() {
        this.layoutService.show();
        this.service.editPhysical(this.physical)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    //this.showAlert("保存成功！");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    isNumber(event:any){
         event.target.value= event.target.value.replace(/[^(\d|.)]/g,"");

    }

    //添加物理机
    createPhysical() {

        if (!this.physical.pmName) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_PHYSICAL_NAME");
            return false;
        }

        if (!this.physical.iloIPAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_IP");
            return false;
        }

        if (!this.physical.iloUserName) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_USERNAME");
            return false;
        }
        if (!this.physical.iloPwd) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_IPMI_PASSWORD");
            return false;
        }
        if (!this.physical.macAddress) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_MAC");
            return false;
        }
        if (!this.physical.sererTypeId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_TYPE");
            return false;
        }
        this.physical.brandId = this.selectedBrand.id;
        this.physical.pmPoolId=this.poolId;
        if (!this.physical.brandId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_BRAND");
            return false;
        }
        if (!this.physical.modleId) {
            this.showAlert("PHYSICAL_MNG.PLEASE_INPUT_SERVER_MODEL");
            return false;
        }
         

        this.layoutService.show();
        this.service.createPhysical(this.physical)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    console.log(this.physical);
                    //this.showAlert("添加物理机成功");
                    this.gotoList();
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //读取物理机信息
    readHardwareInfo() {
        this.layoutService.show();
        this.service.getPhysicalHardwareInfo(this.physical)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                   this.physical.model=response["resultContent"].model;
                   this.physical.sn=response["resultContent"].sn;
                   this.physical.pmHardwareCPU=response["resultContent"].pmHardwareCPU;
                    this.physical.pmHardwareMemory=response["resultContent"].pmHardwareMemory;
                     this.physical.pmHardwareDiskList=response["resultContent"].pmHardwareDiskList;
                     console.log( this.physical.model,this.physical.sn);
                      this.read = true;
                } else {
                     this.read = false;
                }
            }
            )
    }

    cancel() {
        this.gotoList();
    }

    gotoList() {
        this.route.navigate(["physical-mng/physical-mng/physical-list",{pmpoolId: this.poolId}]);

    }

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}