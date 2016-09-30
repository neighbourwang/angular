import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep05Service } from '../service/pf-conn-cre-step-05.service';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  selector: 'pf-conn-cre-step-05',
  templateUrl: '../template/pf-conn-cre-step-05.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep05Component implements OnInit {
  constructor(
      private service: PfConnCreStep05Service,
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04/");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-06/");
  }
}
