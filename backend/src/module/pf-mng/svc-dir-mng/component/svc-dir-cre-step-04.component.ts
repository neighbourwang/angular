import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService, NoticeComponent } from '../../../../architecture';

import { DirectoryCreateService } from '../service';
import { ServiceDetail, Storage, ZoneInfo } from '../model';

const PlatformId: string = '6';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc-dir-mng-cre-st4',
  templateUrl: '../template/svc-dir-cre-step-04.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep4Component implements OnInit {

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  serviceDetail: ServiceDetail;
  storages: Storage[];

  modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

  constructor(
    private directoryCreateService: DirectoryCreateService,
    private layoutService: LayoutService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {

    this.storages = [];

    this.serviceDetail = this.directoryCreateService.getCachedServiceDetail();

    if (this.directoryCreateService.cachedStorages && this.directoryCreateService.cachedStorages.length > 0) {
        this.storages = this.directoryCreateService.cachedStorages;
        this.initStorageId();
    } else {
        this.getStorages();
    }
  }

  getStorages() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .getStorages(PlatformId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '启动盘数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                    this.storages = ret.resultContent;
                    this.directoryCreateService.cachedStorages = ret.resultContent;
                    this.initStorageId();
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '启动盘数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  initStorageId() {
      if (this.storages && this.storages.length > 0) {
          for (let zone of this.serviceDetail.zones) {
              if (zone.storageId == '') {
                  zone.storageId = this.storages[0] ? this.storages[0].id : '';
              }
              if (zone.size == -1) {
                  zone.size = 0;
              }
          }
      }
  }

  createServiceDirectory() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .createServiceDirectory(PlatformId, this.serviceDetail)
        .then(ret => {
            if (!ret) {
                this.showNotice('创建失败', '服务目录创建失败。');
            } else {
                this.goBack();
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('创建失败', '服务目录创建失败。');
            this.layoutService.setLoading(false);
        });
  }

  //
  // Page Navigation
  //
  goBack() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-mng'];
    this.router.navigate(link);
  }

  preStep() {
    this.location.back();
  }
  

  showNotice(title: string, msg: string) {
    this.modalTitle = title;
    this.modalMessage = msg;
    this.modalOKTitle = 'OK';

    this.noticeDialog.open();
  }

  modalAction(btnType: number) {
    if (btnType == 0) {
      this.noticeDialog.close();
      return;
    }

    this.noticeDialog.close();
  }
}
