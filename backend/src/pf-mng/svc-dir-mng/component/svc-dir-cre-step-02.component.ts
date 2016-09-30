import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { NoticeComponent } from '../../../common_components/dialog/component/notice.component';

import { LayoutService } from '../../../core/service/layout.service';

import { DirectoryCreateService } from '../service';
import { ServiceDetail, Flavor } from '../model';

const PlatformId: number = 6;

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st2',
  templateUrl: '../template/svc-dir-cre-step-02.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep2Component implements OnInit {

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  serviceDetail: ServiceDetail;
  flavors: Flavor[];
  currFlavor: Flavor;

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

    this.flavors = [];

    this.serviceDetail = this.directoryCreateService.getCachedServiceDetail();
    if (this.serviceDetail.imageType == -1) {
      this.serviceDetail.imageType = 0;
    }

    if (this.serviceDetail.networkType == -1) {
      this.serviceDetail.networkType = 0;
    }

    this.directoryCreateService
        .init()
        .then(res => 
        {
            if (this.directoryCreateService.cachedFlavors && this.directoryCreateService.cachedFlavors.length > 0) {
              this.flavors = this.directoryCreateService.cachedFlavors;
              if (this.serviceDetail.flavorId == -1) {
                  this.serviceDetail.flavorId= this.flavors[0] ? this.flavors[0].id : -1;
              }
              this.flavorChange();
            } else {
              this.getFlavors();
            }
        });
  }

  getFlavors() {
    this.layoutService.setLoading(true);
  
    this.directoryCreateService
        .getFlavors(PlatformId)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '主机配置数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                    ret.resultContent.forEach((element, index) => {
                      let gb = element.mem >= 1024 ? Math.floor((element.mem/1024)*100)/100 + 'G' : element.mem + 'M';
                      ret.resultContent[index].memDisplay = gb;
                    });
                    this.flavors = ret.resultContent;
                    this.directoryCreateService.cachedFlavors = ret.resultContent;
                  if (this.serviceDetail.flavorId == -1) {
                      this.serviceDetail.flavorId= this.flavors[0] ? this.flavors[0].id : -1;
                  }
                  this.flavorChange();
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '主机配置数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  flavorChange() {
    this.currFlavor = this.fetchFlavorById(this.serviceDetail.flavorId);
  }

  fetchFlavorById(id: number): Flavor {
    let flavor: Flavor;
    this.flavors.forEach(element => {
      if (element.id == id) {
        flavor = element;
      }
    });

    return flavor;
  }

  //
  // Page Navigation
  //
  goBack() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-mng'];
    this.router.navigate(link);
  }

  preStep() {
    this.directoryCreateService.useCached(true);
    this.location.back();
  }

  nextStep() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-cre-step-03'];
    this.router.navigate(link);
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
