/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, SystemDictionaryService, SystemDictionary, ValidationService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

// import {  ProdDirCreService, StateService } from '../service';

// import { Platform } from '../model';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: [],
    providers: []
})

export class ProdDirCreComponent implements OnInit {

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    vmPlatforms: Array<SystemDictionary> = new Array<SystemDictionary>();


    constructor(
        validationService: ValidationService
    ) {}

    ngOnInit() {
    }

    // 类型数据取得
    sysDicCallback(sf: boolean, systemDictionarys: Array<SystemDictionary>) {
        if (sf) {
            this.vmPlatforms = systemDictionarys;
        }
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        // this.layoutService.hide();
        // this.title = title;
        // this.msg = msg;
        //
        // this.notice.open();
    }

    // 取消按钮事件处理
    cancel() {
        // this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
    }

    // 上一步按钮事件处理
    previous() {
        // this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
    }

    // 下一步按钮事件处理
    next() {
        if (!this.validate()) {
            return;
        }

        this.confirm.open("系统提示", "创建平台？");
    }

    // 画面输入值校验
    validate() {

    }

    // 平台创建
    cof() {
       
    }

    ccf() { }

}
