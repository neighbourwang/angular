import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService } from '../../../core/service/layout.service';

import { DirectoryCreateService } from '../service';
import { ServiceDetail, Zone } from '../model';

const PlatformId: number = 6;

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st3',
  templateUrl: '../template/svc-dir-cre-step-03.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep3Component implements OnInit {

  serviceDetail: ServiceDetail;
  zones: Zone[];

  constructor(
    private directoryCreateService: DirectoryCreateService,
    private layoutService: LayoutService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {

    this.zones = [];

    this.serviceDetail = this.directoryCreateService.getCachedServiceDetail();

    this.directoryCreateService
        .init()
        .then(res => 
        {
            if (this.directoryCreateService.cachedZones && this.directoryCreateService.cachedZones.length > 0) {
              this.zones = this.directoryCreateService.cachedZones;
            } else {
              this.getZones();
            }
        });
  }

  getZones() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .getZones(PlatformId)
        .then(ret => {
            if (!ret) {
                this.showError('', '可用区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                    this.zones = ret.resultContent;
                    this.directoryCreateService.cachedZones = ret.resultContent;
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '可用区数据获取失败。');
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
  
  nextStep() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-cre-step-04'];
    this.router.navigate(link);
  }
  
  showError(title: string, msg: string) {
    alert(msg);
  }
  
}
