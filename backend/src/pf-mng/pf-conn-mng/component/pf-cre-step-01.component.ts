import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfCreStep01Service } from '../service/pf-cre-step-01.service';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf_cre_step_01.component.html',
  styleUrls: [],
  providers: []
})

export class PfCreStep01Component implements OnInit {
  constructor(
      private service: PfCreStep01Service,
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng-cre");
  }

  previous() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng-cre");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-cre-step-02");
  }
}
