import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep01Service } from '../service/pf-conn-cre-step-01.service';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf-conn-cre-step-01.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep01Component implements OnInit {
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

    /**
     * 取消按钮事件处理
     */
  cancel() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
  }

  previous() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02");
  }
}
