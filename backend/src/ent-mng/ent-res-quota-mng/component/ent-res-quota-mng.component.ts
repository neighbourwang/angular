import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../core/service/layout.service';

import { EntResQuotaMngService } from '../service/ent-res-quota-mng.service';

@Component({
  selector: 'fc-ent-res-quota-mng',
  templateUrl: '../template/ent-res-quota-mng.component.html',
  styleUrls: [],
  providers: []
})

export class EntResQuotaMngComponent implements OnInit {
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

  onRejected(reason: any) {
      alert(reason);
  }
}
