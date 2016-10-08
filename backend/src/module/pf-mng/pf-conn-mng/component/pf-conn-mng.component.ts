import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, StateService } from '../service';
import { PfConnMngPlatform } from '../model/pf-conn-mng-platform.model';

@Component({
  selector: 'fc-pf-conn-mng',
  templateUrl: '../template/pf-conn-mng.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnMngComponent implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    // 选择全部平台标识
    isSelectedAll: boolean = false;
    platforms: Array<PfConnMngPlatform> = new Array<PfConnMngPlatform>();

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    constructor(
        private service: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {
        stateService.clear();
    }

  ngOnInit() {
      this.backend(1, this.pp);
    }

  backend(page: number, size: number) {
      this.tp = 0;

      this.service.getPlatforms(page, size).then(
              response => {
                  if (!response) {
                      this.showError("数据取得错误", "异常响应");
                      return;
                  }

                  let resultCode = response.resultCode;

                  if (100 == resultCode) {
                      let resultContent = response.resultContent;

                      if (!resultContent) {
                          this.showError("数据取得错误", "没有取得平台数据");

                          return;
                      }

                      let backend = new Array<PfConnMngPlatform>();

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
                          platform.status = content.status;

                          backend.push(platform);
                      }

                      let pageInfo = response.pageInfo;

                      this.tp = pageInfo.totalPage;

                      this.platforms = backend;
                  }
              }
          ).catch( reason => this.showError("数据取得错误", reason.statusText) );
  }

  showError(title: string, msg: string) {
      this.title = title;
      this.msg = msg;

      this.notice.open();
  }

  /*
    创建平台按钮事件处理
    创建平台 - 填写基本信息页面迁移
  */
  creation() {
      this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01");
  }

  /*
    选择全部平台checkbox事件处理
    全选/全选取消切换
  */
  switchSelectAll() {
      this.isSelectedAll = !this.isSelectedAll;

      this.switchSelect(this.isSelectedAll);
  }

  /*
    选择平台checkbox事件处理
    选择/选择取消切换
  */
  switchSelectIndividual(idx: number) {
      let isAllSelected: boolean = this.isAllSelected();

      if (isAllSelected) {
          this.isSelectedAll = isAllSelected;

          this.switchSelect(isAllSelected);
      } else {
          this.isSelectedAll = false;
      }
  }

  private switchSelect(selected: boolean) {
      this.platforms.forEach(item => item.isSelected = selected);
  }

  /*
    全部Checkbox处于选择状态判断
  */
  private isAllSelected() {
      let isAllSelected: boolean = true;

      this.platforms.forEach(
          item => {
              if (!item.isSelected) {
                  isAllSelected = false;
              }
          });

      return isAllSelected;
  }


  paging(page) {
      this.backend(page, 10);
  }

  nof() {
      ("nof");
  }

  cof() {
      alert("cof");
  }

  ccf() {
      alert("ccf");
  }
}