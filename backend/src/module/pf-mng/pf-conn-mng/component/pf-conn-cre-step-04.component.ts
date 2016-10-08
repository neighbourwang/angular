import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnCreStep04Service, StateService } from '../service';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

@Component({
  selector: 'pf-conn-cre-step-04',
  templateUrl: '../template/pf-conn-cre-step-04.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep04Component implements OnInit {
  constructor(
      private service: PfConnCreStep04Service,
    private layoutService: LayoutService,
    private router: Router,
    private stateService: StateService
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-05");
  }
}
