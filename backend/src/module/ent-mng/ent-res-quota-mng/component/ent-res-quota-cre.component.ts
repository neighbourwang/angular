import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';

import { EntResQuotaCreService } from '../service/ent-res-quota-cre.service';

@Component({
  selector: 'fc-ent-res-quota-cre',
  templateUrl: '../template/ent-res-quota-cre.component.html',
  styleUrls: [],
  providers: []
})

export class EntResQuotaCreComponent implements OnInit {
    constructor(
        private service: EntResQuotaCreService,
        private layoutService: LayoutService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    showError(title: string, msg: string) {
        alert(msg);
    }

  /**
  * 取消按钮事件处理
  */
  cancel() {
      this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-mng");
  }

  /*
  * 创建资源配额
  */
  next() {
      this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-mng");
  }
}
