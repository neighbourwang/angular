import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep06Service } from '../service/pf-conn-cre-step-06.service';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  selector: 'pf-conn-cre-step-06',
  templateUrl: '../template/pf-conn-cre-step-06.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep06Component implements OnInit {
  constructor(
      private service: PfConnCreStep06Service,
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-05");
  }

  next() {
      alert("启用");
  }
}
