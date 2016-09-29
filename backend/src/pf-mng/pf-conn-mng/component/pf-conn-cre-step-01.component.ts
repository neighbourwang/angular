import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../core/service/layout.service';

import { PfConnCreStep01Service } from '../service/pf-conn-cre-step-01.service';

import { Platform } from '../model/platform.model';

@Component({
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf-conn-cre-step-01.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep01Component implements OnInit {
  platFormId: String;

  platform = new Platform();

  constructor(
    private service: PfConnCreStep01Service,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  showError(title: string, msg: string) {
    alert(msg);
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

      /*this.service.postPlatform(this.platform).then(
          response => {
              if (response && 100 == response["resultCode"]) {
                  this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02");
              } else {
                  alert("Post Error!");
              }
          }
      ).catch(this.onRejected);*/

      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02/01");
  }

  // 画面输入值校验
  validate() {
      // 名称必须输入
      if (this.platform.name == "") {
          alert("名称必须输入");

          return false;
      }

      return true;
  }

  onRejected(reason: any) {
      alert(reason);
  }
}
