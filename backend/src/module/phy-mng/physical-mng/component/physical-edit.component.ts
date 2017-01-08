import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent } from "../../../../architecture";

import { PhysicalEditService } from "../service/physical-edit.service";

import { PhysicalModel } from "../model/physical.model";
import { ServerType } from "../model/serverType.model";
import { Brand, Model } from "../model/brand.model";

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
            this.physical.id = id;
            this.eidtMode = params["type"]||"create";
            this.poolId = params["poolId"];
            if (!this.poolId) {
                alert("缺少参数");
                return;
            }
            console.log(this.eidtMode);
            switch (this.eidtMode) {
                case "edit":
                    this.title = "编辑物理机";
                    break;
                case "view":
                    this.title = "查看物理机";
                    break;
                case "create":
                    this.title = "添加物理机";
                    break;
            }

        });
        this.getServerInfo()
            .then(() => {
                if (this.physical.id) {
                    this.getPhysicalById(this.physical.id);
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
                    this.serverTypes = response["resultContent"].serverTypeList;
                    this.brands = response["resultContent"].brandList;
                } else {
                    alert("Res sync error");
                }
            }
            );
    }

    //编辑物理机
    editPhysical() {
        this.layoutService.show();
        this.service.editPhysical(this.physical, this.physical.id)
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
    createPhysical() {

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
        if (!this.physical.serverTypeId) {
            this.showAlert("请选择服务器类型！");
            return false;
        }
        this.physical.brandId = this.selectedBrand.id;

        if (!this.physical.brandId) {
            this.showAlert("请选择服务器品牌！");
            return false;
        }
        if (!this.physical.modelId) {
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
    readHardwareInfo() {
        this.read = true;
        this.layoutService.show();
        this.service.getPhysicalHardwareInfo(this.physical)
            .then(
            response => {
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

    gotoList() {
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