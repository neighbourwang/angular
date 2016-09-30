import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { ConfirmComponent } from '../../../common_components/dialog/component/confirm.component';
import { NoticeComponent } from '../../../common_components/dialog/component/notice.component';

import { Directory, Region, Template } from '../model';
import { DirectoryService } from '../service/svc-dir-mng.service';

import { LayoutService } from '../../../core/service/layout.service';

const PlatformId: string = '6';
const Status: string = '1';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng',
  templateUrl: '../template/svc-dir-mng.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class DirectoryComponent implements OnInit {
  
  @ViewChild('confirm')
  private confirmDialog: ConfirmComponent;

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  pageSize: number;
  totalPages: number;
  currPage: number;

  regions: Region[];
  templates: Template[];
  directories: Directory[];
  filterRegId: string = '';

  allChecked: boolean = false;

  currDirectory: Directory;

  modalCategory: string = '';
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';
  modalCancelTitle: string = '';

  constructor(
    private directoryService: DirectoryService,
    private layoutService: LayoutService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.totalPages = 0;
    this.currPage = 1;

    this.allChecked = false;

    this.regions = [];
    this.templates = [];
    this.filterRegId = '';

    this.currDirectory = undefined;

    this.layoutService.setLoading(false);

    this.directories = new Array<Directory>();

    this.getRegios();
    this.getTemplates();
  }

  getRegios() {
    this.layoutService.setLoading(true);
  
    this.directoryService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '地区数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.regions = ret.resultContent;
                  if (this.regions.length > 0) {
                      this.filterRegId = this.regions[0].id;
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

                  this.getDirectorys(this.currPage, this.pageSize);
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '服务模板数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  getDirectorys(page: number, size: number) {
    this.layoutService.setLoading(true);

    this.directoryService
        .getDirectories(PlatformId, Status, page-1, size)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '服务目录数据获取失败。');
            } else {
                this.fmtDirectorysData(ret);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '服务目录数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  fmtDirectorysData(ret: any) {
    if (ret && ret.resultContent) {
      this.totalPages = ret.resultContent.totalPages;
      this.directories = ret.resultContent.content;

      this.directories.forEach((element, index) => {
        this.directories[index].checked = false;
        this.directories[index].serviceTemplateName = this.getTemplateName(element.serviceTemplateId);
      });
      // this.resetPaging();
    }
  }
  getTemplateName(serviceTemplateId: string) {
    let templateName = '';
    
    this.templates.forEach(element => {
      if (element.id == serviceTemplateId) {
        templateName = element.name;
      }
    });

    return templateName;
  }

  confirmPublish(directory: Directory) {
    this.currDirectory = directory;

    this.modalCategory = 'publish';
    this.modalTitle = '发布';
    this.modalMessage = `您选择发布'${directory.name}'服务目录，请确认。`;
    this.modalOKTitle = '确认';
    this.modalCancelTitle = '取消';
    this.confirmDialog.open();
  }

  publish() {
    this.publishDirectory(this.currDirectory, '1');
  }

  confirmCancelPublish(directory: Directory) {
    this.currDirectory = directory;

    this.modalCategory = 'cancel_publish';
    this.modalTitle = '取消发布';
    this.modalMessage = `您选择取消发布'${directory.name}'服务目录，请确认；如果确认取消发布，此服务目录将下线。`;
    this.modalOKTitle = '确认';
    this.modalCancelTitle = '取消';
    this.confirmDialog.open();
  }
  cancelPublish() {
    this.publishDirectory(this.currDirectory, '0');
  }

  publishDirectory(directory: Directory, status: string) {

    this.layoutService.setLoading(true);

    this.directoryService
        .publish(PlatformId, directory.id, status)
        .then(ret => {
            if (!ret) {
                this.showNotice('操作失败', '服务目录操作失败。');
            } else {
                directory.status = parseInt(status);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('操作失败', '服务目录操作失败。');
            this.layoutService.setLoading(false);
        });
  }

  modify(directory: Directory) {
    let data = this.createUpdateData(directory);

    
    // this.layoutService.setLoading(true);

    // this.directoryService
    //     .modify(PlatformId, data)
    //     .then(ret => {
    //         if (!ret) {
    //             this.showNotice('更新失败', '服务目录更新失败。');
    //         } else {
    //             this.refreshData(ret);
    //         }
    //         this.layoutService.setLoading(false);
    //     })
    //     .catch(error => {
    //         this.showNotice('更新失败', '服务目录更新失败。');
    //         this.layoutService.setLoading(false);
    //     });
  }
  
  createUpdateData(directory: Directory): any {
    return  {
      "desc": directory.description,
      "flavorId": directory.flavorId,
      "id": directory.id,
      "name": directory.name,
      "options": [
        // {
        //   "code": '',
        //   "value": ''
        // }
      ],
      "regionId": directory.regionId,
      "templateId": directory.serviceTemplateId,
      "zones": [
        // {
        //   "serviceZoneId": 0,
        //   "size": 0,
        //   "storageId": 0,
        //   "zoneId": 0
        // }
      ]
    };
  }

  private refreshData(ret: any) {
    if (ret && ret.resultContent) {
      let newData = ret.resultContent.content;

      this.directories.forEach((element, index) => {
        if (element.id = newData.id) {
          this.directories[index] = newData;
        }
      });

    }
  }


  confirmRemove() {
    
    let ids = this.getAllSelectedData();

    if (ids.length == 0) {
      this.showNotice('警告', '请选择至少一个服务目录');
      return;
    }

    this.modalCategory = 'remove';
    this.modalTitle = '取消删除';
    this.modalMessage = `您选择删除选中的全部服务目录，请确认；如果确认删除，这些服务目录数据见更不能恢复。`;
    this.modalOKTitle = '删除';
    this.modalCancelTitle = '取消';
    this.confirmDialog.open();
  }

  remove() {
    let ids = this.getAllSelectedData();
    
    this.layoutService.setLoading(true);

    this.directoryService
        .removeAll(PlatformId, ids)
        .then(ret => {
            if (!ret) {
                this.showNotice('删除失败', '服务目录删除失败。');
            } else {
                this.allChecked = false;
                this.removeDirectoiesById(ids);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('删除失败', '服务目录删除失败。');
            this.layoutService.setLoading(false);
        });
  }

  removeDirectoiesById(ids: string[]) {
    let newDirectories: Directory[] = [];
    
    for (let directory of this.directories) {
      if (ids.indexOf(directory.id) < 0) {
        newDirectories.push(directory);
      }
    }

    this.directories = newDirectories;
  }

  getAllSelectedData(): string[] {
    let ids = [];

    this.directories.forEach((element, index) => {
      if (element.checked == true) {
        ids.push(element.id);
      }
    });

    return ids;
  }

  create() {
    let link = ['pf-mng/svc-dir-mng/svc-dir-cre-step-01'];

    let navigatiionExtras: NavigationExtras = {
      // queryParams: {
      //   'userCachedData': false
      // }
    };

    this.router.navigate(link, navigatiionExtras)
  }

  // resetPaging() {
    
  //   let dispCount = Math.min(this.dispPagingCount, this.totalPages);

  //   let start = this.currPage - Math.floor(dispCount/2);
  //   start = start <1 ? 1: start;
  //   start = (start + (dispCount-1)) > this.totalPages ? (this.totalPages-(dispCount-1)) : start;
  //   let end = start + (dispCount-1);
  //   end = end > this.totalPages ? this.totalPages : end;


  //   this.pages.length = 0;
  //   for (let i=start; i<=end; i++) {
  //     this.pages.push(i);
  //   }
  // }

  changePage(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.totalPages ? this.totalPages : page;

    if (this.currPage == page) {
      return;
    }

    this.currPage = page;
    this.getDirectorys(this.currPage, this.pageSize);
  }

  checkAll() {
    this.allChecked = !this.allChecked;
    this.directories.forEach((element, index) => {
      this.directories[index].checked = this.allChecked;
    });
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
      this.confirmDialog.close();
      return;
    }
    
    switch (this.modalCategory) {
      case 'publish':
        this.publish();
        break;

      case 'cancel_publish':
        this.cancelPublish();
        break;

      case 'remove':
        this.remove();
        break;
    
      default:
        break;
    }

    this.noticeDialog.close()
    this.confirmDialog.close();
  }
}
