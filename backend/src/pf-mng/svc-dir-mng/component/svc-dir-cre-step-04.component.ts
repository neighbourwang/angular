import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService } from '../../../core/service/layout.service';

import { DirectoryCreateService } from '../service';
import { ServiceDetail, Storage, ZoneInfo } from '../model';

const PlatformId: number = 6;

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st4',
  templateUrl: '../template/svc-dir-cre-step-04.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep4Component implements OnInit {

  serviceDetail: ServiceDetail;
  storages: Storage[];

  constructor(
    private directoryCreateService: DirectoryCreateService,
    private layoutService: LayoutService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {

    this.storages = [];

    this.serviceDetail = this.directoryCreateService.getCachedServiceDetail();

    this.directoryCreateService
        .init()
        .then(res => 
        {
            if (this.directoryCreateService.cachedStorages && this.directoryCreateService.cachedStorages.length > 0) {
              this.storages = this.directoryCreateService.cachedStorages;
            } else {
              this.getStorages();
            }
        });
  }

  getStorages() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .getStorages(PlatformId)
        .then(ret => {
            if (!ret) {
                this.showError('', '启动盘数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                    this.storages = ret.resultContent;
                    this.directoryCreateService.cachedStorages = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '启动盘数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  createServiceDirectory() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .createServiceDirectory(PlatformId, this.serviceDetail)
        .then(ret => {
            if (!ret) {
                this.showError('', '服务目录创建失败。');
            } else {
                this.goBack();
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '服务目录创建失败。');
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
  
  showError(title: string, msg: string) {
    alert(msg);
  }
  
}
