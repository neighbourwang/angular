import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnMngService } from '../service/pf-conn-mng.service';

import { LayoutService } from '../../../core/service/layout.service';

import { PfConnMngPlatform } from '../model/pf-conn-mng-platform.model';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf-conn-mng.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnMngComponent implements OnInit {
    // 选择全部平台标识
    isSelectedAll: boolean = false
    platforms: Array<PfConnMngPlatform> = new Array<PfConnMngPlatform>();
    tp: number = 20;
    pp: number = 11;
  constructor(
      private service: PfConnMngService,
    private layoutService: LayoutService,
    private router: Router
  ) {
  }

  ngOnInit() {
      this.service.init().then(promise => {
          this.service.getPlatforms().then(
              response => {
                  if (!response) {
                      //this.showError("Error", "API call failed");
                      return;
                  }

                  let resultCode = response["resultCode"];

                  if (100 == resultCode) {
                      let resultContent = response.resultContent;

                      if (!resultContent) {
                          this.showError("Error", "API call failed()");

                          return;
                      }

                      for (let content of resultContent) {
                          let platform = new PfConnMngPlatform();

                          platform.id = content.id;
                          platform.name = content.name;
                          platform.platformType = content.platformType;
                          platform.platformTypeName = content.platformTypeName;
                          platform.uri = content.uri;
                          platform.userName = content.userName;
                          platform.passwd = content.passwd;
                          platform.description = content.description;
                          platform.version = content.version;

                          this.platforms.push(platform);
                      }
                  }
              }
          ).catch(this.onRejected);
      });
  }
    
  showError(title: string, msg: string) {
    alert(msg);
  }

  onRejected(reason: any) {
      alert(reason);
  }

  /*
    创建平台按钮事件处理
    创建平台 - 填写基本信息页面迁移
  */
  creation() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01/", { skipLocationChange: true });
  }

  /*
    选择全部平台checkbox事件处理
    全选/全选取消切换
  */
  switchSelectAll() {
      this.isSelectedAll = !this.isSelectedAll;

      this.platforms.forEach(item => item.isSelected = this.isSelectedAll);
  }

  paging(page) {
  }
  
}