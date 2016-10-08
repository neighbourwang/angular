import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, ValidationService } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep01Service, StateService } from '../service';

import { Platform } from '../model/platform.model';

@Component({
  selector: 'pf-conn-cre-step-01',
  templateUrl: '../template/pf-conn-cre-step-01.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep01Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

  platform = new Platform();

  constructor(
      private service: PfConnCreStep01Service,
      private pfConnMngService: PfConnMngService,
    private layoutService: LayoutService,
    private router: Router,
    private stateService: StateService,
    private validationService: ValidationService
  ) {}

  ngOnInit() {
      let contains = this.stateService.contains();

      if (contains) {
          let platformId = this.stateService.getPlatformId();

          this.pfConnMngService.getPlatform(platformId).then(
              response => {
                  this.platform.name = response["name"];
                  this.platform.platformTypeName = response["platformTypeName"];
                  this.platform.uri = response["uri"];
                  this.platform.userName = response["userName"];
                  this.platform.passwd = response["passwd"];
                  this.platform.version = response["version"];
                  this.platform.description = response["description"];
                  this.platform.status = response["status"];
              }
          ).catch(
              reason => {
                  this.showError("系统错误", reason.statusText)
              });
      }
  }

  showError(title: string, msg: string) {
      this.title = title;
      this.msg = msg;

      this.notice.open();
  }

  // 取消按钮事件处理
  cancel() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
  }
  // 上一步按钮事件处理
  previous() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
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
      // 平台名称必须输入
      if (this.validationService.isBlank(this.platform.name)) {
          this.notice.open("系统提示", "平台名称必须输入");

          return false;
      }

      return true;
  }

  cof() {
      this.service.postPlatform(this.platform).then(
          response => {
              if (response && 100 == response.resultCode) {
                  this.stateService.setPlatformId(response.resultContent.platformId);
                  this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02");
              } else {
                  this.showError("系统错误", "平台创建错误");
              }
          }
      ).catch(
          reason => {
              this.showError("系统错误", reason.statusText)
          });
  }

  ccf() { }
}
