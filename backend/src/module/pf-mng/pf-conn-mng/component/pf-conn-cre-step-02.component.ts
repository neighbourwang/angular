import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnCreStep02Service } from '../service/pf-conn-cre-step-02.service';

import { ResSync } from '../model/res-sync.model';

@Component({
  selector: 'pf-conn-cre-step-02',
  templateUrl: '../template/pf-conn-cre-step-02.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep02Component implements OnInit {
    platFormId: String = "";

    resSync: ResSync = new ResSync("可用区", 0);

    constructor(
        private service: PfConnCreStep02Service,
        private layoutService: LayoutService,
        private router: Router,
        private activatedRouter: ActivatedRoute
    ) {
        if (activatedRouter.snapshot.params["platform-id"]) {
            this.platFormId = activatedRouter.snapshot.params["platform-id"];
        }
    }

    ngOnInit() {
        this.service.resSyncCount(this.platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    this.resSync.zonesCount = resultContent["zonesCount"];
                    this.resSync.storagesCount = resultContent["storagesCount"];
                    this.resSync.flavorsCount = resultContent["flavorsCount"];
                    this.resSync.regionsCount = resultContent["regionsCount"];
                    this.resSync.imagesCount = resultContent["imagesCount"];
                } else {
                    alert("Res sync error");
                }
            }
        ).catch(this.onRejected);
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01/" + this.platFormId);
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03/" + this.platFormId);
  }

  onRejected(reason: any) {
      alert(reason);
  }
}
