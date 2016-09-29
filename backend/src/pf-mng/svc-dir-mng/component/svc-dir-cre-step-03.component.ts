import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService } from '../../../core/service/layout.service';

import { DirectoryCreateService } from '../service';
import { ServiceDetail, Zone, ZoneInfo } from '../model';

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
              this.resetSelectStatus();
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
                    this.resetSelectStatus();
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '可用区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  resetSelectStatus() {
    this.zones.forEach((orgZone, index) => {
      this.zones[index].added = false;

      for (let zoneInfo of this.serviceDetail.zones) {
        if (orgZone.id == zoneInfo.zoneId) {
          this.zones[index].added = true;
          break;
        }
      }
    });
  }

  getOrgZones(): Zone[] {
    return this.getZonesByType(false);
  }

  getAddedZones(): Zone[] {
    return this.getZonesByType(true);
  }

  getZonesByType(addFlg: boolean): Zone[] {
    let list = [];

    for (let zone of this.zones) {
      if (zone.added == addFlg) {
        list.push(zone);
      }
    }

    return list;
  }

  selectZone(zone: Zone, index: number) {
    for (let item of this.zones) {
      if (zone.id == item.id) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    }
  }

  getSelectedZone(): Zone {
    for (let zone of this.zones) {
      if (zone.selected == true) {
        return zone;
      }
    }
  }

  addZone() {
    let zone = this.getSelectedZone();
    if (!zone) {
      return;
    }
    zone.added = true;
    zone.selected = false;

    let zoneInfo = new ZoneInfo();
    zoneInfo.zoneId = zone.id;
    zoneInfo.displayName = zone.displayName;
    zoneInfo.description = zone.description;
    zoneInfo.serviceZoneId = zone.id;

    this.serviceDetail.zones.push(zoneInfo);
  }

  removeZone() {
    let zone = this.getSelectedZone();
    if (!zone) {
      return;
    }
    zone.added = false;
    zone.selected = false;

    for (let j=0; j<this.serviceDetail.zones.length; j++){
      let zoneInfo = this.serviceDetail.zones[j];

      if (zoneInfo.zoneId == zone.id) {
        this.serviceDetail.zones.splice(j);
        break;
      }
    }
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
