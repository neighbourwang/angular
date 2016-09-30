import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep03Service } from '../service/pf-conn-cre-step-03.service';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

@Component({
  selector: 'pf-conn-cre-step-03',
  templateUrl: '../template/pf-conn-cre-step-03.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep03Component implements OnInit {
  constructor(
      private service: PfConnCreStep03Service,
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02/");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04/");
  }
}
