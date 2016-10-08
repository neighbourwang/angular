import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep06Service, StateService } from '../service';
import { Zone, Storage, Flavor } from '../model';

@Component({
  selector: 'pf-conn-cre-step-06',
  templateUrl: '../template/pf-conn-cre-step-06.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnCreStep06Component implements OnInit {
    expandZone: boolean = true;
    expandStorage: boolean = true;
    expandFlavor: boolean = true;

    zones: Array<Zone> = new Array<Zone>();
    storages: Array<Storage> = new Array<Storage>();
    flavors: Array<Flavor> = new Array<Flavor>();

  constructor(
      private service: PfConnCreStep06Service,
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

      this.pfConnMngService.storageQuota(platFormId).then(
          response => {
              if (response && 100 == response.resultCode) {
                  let resultContent = response.resultContent;

                  for (let content of resultContent) {

                      let storage = new Storage();

                      storage.uuid = content.uuid;
                      storage.id = content.id;
                      storage.code = content.code;
                      storage.name = content.name;
                      storage.displayName = content.displayName;
                      storage.quota = content.quota;
                      storage.maximum = content.maximum;
                      storage.description = content.description;

                      this.storages.push(storage);
                  }
              } else {
                  this.showError("系统错误", "取得存储资源配置信息错误");
              }
          }
      ).catch(reason => {
          this.showError("系统错误", reason.statusText);
          });

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

  // 可用区收起/展开切换
  switchExpandZone() {
      this.expandZone = !this.expandZone;
  }

  // 存储收起/展开切换
  switchExpandStorage() {
      this.expandStorage = !this.expandStorage;
  }

  // 云主机类型收起/展开切换
  switchExpandFlavor() {
      this.expandFlavor = !this.expandFlavor;
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
