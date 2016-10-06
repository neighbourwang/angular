import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

import { EntAdminCreService } from '../service/ent-admin-cre.service';

import { Enterprise } from '../model/enterprise.model';

import { Admin } from '../model/admin.model';


@Component({
    selector: 'ent-admin-cre',
    templateUrl: '../template/ent-admin-cre.html',
    styleUrls: [],
    providers: []
})

export class EntAdminCreComponent implements OnInit {

    mngId: string = "";
    isEdit:boolean = false;
    noticeTitle: string = "";
    noticeMsg:string="";

    @ViewChild('notice')
    notice: NoticeComponent;

    constructor(
        private service: EntAdminCreService,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["mng-id"]) {
            this.mngId = activatedRouter.snapshot.params["mng-id"] || "";
            this.isEdit = true;
        }  
    }

    enterprises: Enterprise[];
    admin: Admin = new Admin();

     

    ngOnInit() {
        this.layoutService.setLoading(true);
        this.service.getEnterprise().then(
            response => {
                this.layoutService.setLoading(false);
                if (response && 100 == response["resultCode"]) {

                    this.enterprises = response["resultContent"];

                } else {
                    this.showAlert("Res sync error");
                }
            }
        ).catch(this.onRejected);
    }

    showError(title: string, msg: string) {
        this.showAlert(msg);
    }


    createAndUpdate(): void {
        if (this.admin.contactorName === "") {
            this.showAlert("请输入管理员姓名");
            return;
        }

        if (this.admin.account === "") {
            this.showAlert("请输入管理员账户");
            return;
        }

        if (this.admin.password === "") {
            this.showAlert("请输入管理员密码");
            return;
        }

        if (this.admin.contactorPhone === "") {
            this.showAlert("请输入电话");
            return;
        }
        if (this.admin.email === "") {
            this.showAlert("请输入管理员邮箱");
            return;
        }

        const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const regMobilePhone = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        const regTelPhone = /^(\(\d{3,4}\)-)|(\d{3,4}-)?\d{7,8}$/;

        if (!regEmail.test(this.admin.email)) {
            this.showAlert("请输入合法的电子邮箱;");
            return;
        }

        if (!regMobilePhone.test(this.admin.contactorPhone) && !regTelPhone.test(this.admin.contactorPhone)) {
            this.showAlert("请输入合法的联系电话;");
            return;
        }
        this.layoutService.setLoading(true);

        if (this.mngId == "") {
            this.service.createAdmin(this.admin).then(
                response => {
                    this.layoutService.setLoading(false);
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("创建成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
                    } else {
                        this.showAlert("Res sync error");
                    }
                }
            ).catch(this.onRejected);
        } else {
            this.service.updateAdmin(this.admin).then(
                response => {
                    this.layoutService.setLoading(false);
                    if (response && 100 == response["resultCode"]) {
                        this.showAlert("更新成功");
                        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
                    } else {
                        this.showAlert("Res sync error");
                    }
                }
            ).catch(this.onRejected);
        }
    }

    cancel(): void {
        this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng");
    }

    onRejected(reason: any) {
        this.showAlert(reason);
    }

    showAlert(msg: string): void {
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }
}
