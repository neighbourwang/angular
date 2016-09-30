import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../core/service/layout.service';

import { EntResQuotaMngService } from '../service/ent-res-quota-mng.service';

import { EntResQuota } from '../model/ent-res-quota.model';

@Component({
  selector: 'fc-ent-res-quota-mng',
  templateUrl: '../template/ent-res-quota-mng.component.html',
  styleUrls: [],
  providers: []
})

export class EntResQuotaMngComponent implements OnInit {
    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 5;

  constructor(
      private service: EntResQuotaMngService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  /*
    创建配额按钮事件处理
    创建资源配额页面迁移
  */
  creation() {
      this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-cre", { skipLocationChange: true });
  }

  // 画面输入值校验
  validate() {
      return true;
  }

  backend(page: number, size: number) {
      this.tp = 0;

      this.service.init().then(
          promise => this.service.getEntResQuota(page, this.pp).then(
              response => {
                  if (!response) {
                      this.showError("数据取得错误", "异常响应");
                      return;
                  }

                  let resultCode = response.resultCode;

                  if (100 == resultCode) {
                      let resultContent = response.resultContent;

                      if (!resultContent) {
                          this.showError("数据取得错误", "没有取得平台数据");

                          return;
                      }

                      let backend = new Array<EntResQuota>();

                      for (let content of resultContent) {

                         // backend.push(platform);
                      }
                  }
              }
          ).catch(
              reason => this.showError("数据取得错误", reason.statusText)
              ));
  }

  paging(page) {
      this.backend(page, 10);
  }

  nof() {
      ("nof");
  }

  cof() {
      alert("cof");
  }

  ccf() {
      alert("ccf");
  }
}
