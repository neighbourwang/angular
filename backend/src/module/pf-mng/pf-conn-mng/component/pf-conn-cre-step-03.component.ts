import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep03Service, StateService } from '../service';
import { Zone } from '../model';

@Component({
  selector: 'pf-conn-cre-step-03',
  templateUrl: '../template/pf-conn-cre-step-03.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep03Component implements OnInit {
    zones: Array<Zone> = new Array<Zone>();

  constructor(
      private service: PfConnCreStep03Service,
      private pfConnMngService: PfConnMngService,
    private layoutService: LayoutService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
      let platFormId: String = this.stateService.getPlatformId();

      this.pfConnMngService.zoneQuota(platFormId).then(
          response => {
              if (response && 100 == response.resultCode) {
                  let resultContent = response.resultContent;

                  for (let content of resultContent) {
                      let zone = new Zone();

                      zone.uuid = content.uuid;
                      zone.id = content.id;
                      zone.code = content.code;
                      zone.name = content.name;
                      zone.displayName = content.displayName;
                      zone.hostNum = content.hostNum;
                      zone.vcpunum = content.vcpunum;
                      zone.memSize = content.memSize;
                      zone.vmQuota = content.vmQuota;
                      zone.description = content.description;

                      this.zones.push(zone);
                  }
              } else {
                  this.showError("系统错误", "取得可用区资源错误");
              }
          }
      ).catch(reason => {
          this.showError("系统错误", reason.statusText);
      });
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02");
  }

  next() {
      let platFormId: String = this.stateService.getPlatformId();

      this.service.putZoneQuota(platFormId, this.zones).then(
          response => {
              if (response && 100 == response.resultCode) {
                  this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04");
              } else {
                  this.showError("系统错误", "更新可用区资源配置信息错误");
              }
          }
      ).catch(reason => {
          this.showError("系统错误", reason.statusText);
      });
  }
}
