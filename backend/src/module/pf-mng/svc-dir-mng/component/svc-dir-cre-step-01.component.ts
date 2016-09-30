import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

import { DirectoryService, DirectoryCreateService } from '../service';
import { ServiceDetail, Template, Region } from '../model';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc-dir-mng-cre-st1',
  templateUrl: '../template/svc-dir-cre-step-01.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep1Component implements OnInit {

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  serviceDetail: ServiceDetail;
  templates: Template[];
  regions: Region[];

  modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

  constructor(
    private directoryService: DirectoryService,
    private directoryCreateService: DirectoryCreateService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {

    this.regions = [];
    this.templates = [];

    this.serviceDetail = this.directoryCreateService.getServiceDetail();

    if (this.directoryCreateService.cachedRegions && this.directoryCreateService.cachedRegions.length > 0) {
      this.regions = this.directoryCreateService.cachedRegions;
      if (this.serviceDetail.regionId == '') {
          this.serviceDetail.regionId = this.regions[0] ? this.regions[0].id : '';
      }
    } else {
      this.getRegions();
    }

    if (this.directoryCreateService.cachedTemplates && this.directoryCreateService.cachedTemplates.length > 0) {
      this.templates = this.directoryCreateService.cachedTemplates;
      if (this.serviceDetail.templateId == '') {
          this.serviceDetail.templateId = this.templates[0] ? this.templates[0].id : '';
      }
    } else {
      this.getTemplates();
    }
  }

  getRegions() {
    this.layoutService.setLoading(true);
  
    this.directoryService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  this.directoryCreateService.cachedRegions = ret.resultContent;
                  if (this.serviceDetail.regionId == '') {
                      this.serviceDetail.regionId = this.regions[0] ? this.regions[0].id : '';
                  }
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  getTemplates() {
    this.layoutService.setLoading(true);
  
    this.directoryService
        .getTemplates()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '服务模板数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.templates = ret.resultContent;
                  this.directoryCreateService.cachedTemplates = ret.resultContent;
                  if (this.serviceDetail.templateId == '') {
                      this.serviceDetail.templateId = this.templates[0] ? this.templates[0].id : '';
                  }
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '服务模板数据获取失败。');
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

  nextStep() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-cre-step-02'];
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
