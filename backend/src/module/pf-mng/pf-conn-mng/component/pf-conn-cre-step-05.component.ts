import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep05Service, StateService } from '../service';
import { Flavor } from '../model';

@Component({
  selector: 'pf-conn-cre-step-05',
  templateUrl: '../template/pf-conn-cre-step-05.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep05Component implements OnInit {
    flavors: Array<Flavor> = new Array<Flavor>();

  constructor(
      private service: PfConnCreStep05Service,
      private pfConnMngService: PfConnMngService,
    private layoutService: LayoutService,
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
      let platFormId: String = this.stateService.getPlatformId();

      this.pfConnMngService.flavorQuota(platFormId).then(
          response => {
              if (response && 100 == response.resultCode) {
                  let resultContent = response.resultContent;

                  for (let content of resultContent) {
                      let flavor = new Flavor();

                      flavor.uuid = content.uuid;
                      flavor.id = content.id;
                      flavor.name = content.name;
                      flavor.displayName = content.displayName;
                      flavor.vcpu = content.vcpu;
                      flavor.memSize = content.memSize;
                      flavor.diskSize = content.diskSize;
                      flavor.publicFlag = content.publicFlag;
                      flavor.description = content.description;

                      this.flavors.push(flavor);
                  }
              } else {
                  this.showError("系统错误", "取得云主机类型配置信息错误");
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
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04");
  }

  next() {
      let platFormId: String = this.stateService.getPlatformId();

      this.service.putFlavorQuota(platFormId, this.flavors).then(
          response => {
              if (response && 100 == response.resultCode) {
                  this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-06");
              } else {
                  this.showError("系统错误", "更新云主机类型配置信息错误");
              }
          }
      ).catch(reason => {
          this.showError("系统错误", reason.statusText);
      });
  }
}
