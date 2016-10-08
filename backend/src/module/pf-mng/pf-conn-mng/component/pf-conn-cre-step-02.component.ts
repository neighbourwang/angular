import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnCreStep02Service, StateService } from '../service';

import { ResSync } from '../model/res-sync.model';

@Component({
  selector: 'pf-conn-cre-step-02',
  templateUrl: '../template/pf-conn-cre-step-02.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep02Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    resSync: ResSync = new ResSync("可用区", 0);

    constructor(
        private service: PfConnCreStep02Service,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {}

    ngOnInit() {
        this.service.resSyncCount(this.stateService.getPlatformId()).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    this.resSync.zonesCount = resultContent["zonesCount"];
                    this.resSync.storagesCount = resultContent["storagesCount"];
                    this.resSync.flavorsCount = resultContent["flavorsCount"];
                    this.resSync.regionsCount = resultContent["regionsCount"];
                    this.resSync.imagesCount = resultContent["imagesCount"];
                } else {
                    this.showError("系统错误", "同步资源数据取得错误");
                }
            }
        ).catch(reason => {
            this.showError("系统错误", reason.statusText);
        });
    }

    showError(title: string, msg: string) {
        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

  /**
  * 取消按钮事件处理
  */
  cancel() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng");
  }

  previous() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01");
  }

  next() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03");
  }
}
