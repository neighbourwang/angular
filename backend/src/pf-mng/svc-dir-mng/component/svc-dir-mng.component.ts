import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { Directory, Region, Template } from '../model';
import { DirectoryService } from '../service/svc-dir-mng.service';

import { LayoutService } from '../../../core/service/layout.service';

const PlatformId: number = 6;
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
  
  pageSize: number;
  totalPages: number;
  currPage: number;
  pages: any[];
  dispPagingCount: number = 7;

  regions: Region[];
  templates: Template[];
  directories: Directory[];
  filterRegId: number = -1;

  allChecked: boolean = false;

  currDirectory: Directory;

  constructor(
    private directoryService: DirectoryService,
    private layoutService: LayoutService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.totalPages = 0;
    this.currPage = 1;
    this.pages = new Array<any>();

    this.allChecked = false;

    this.regions = [];
    this.templates = [];
    this.filterRegId = -1;

    this.currDirectory = undefined;

    this.layoutService.setLoading(false);

    this.directories = new Array<Directory>();

    this.directoryService.init()
                      .then(res => 
                      {
                          this.getRegios();
                          this.getTemplates();
                      });
  }

  getRegios() {
    this.layoutService.setLoading(true);
  
    this.directoryService
        .getRegions()
        .then(ret => {
            if (!ret) {
                this.showError('', '地区数据获取失败。');
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
            this.showError('', '地区数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  getTemplates() {
    this.layoutService.setLoading(true);
  
    this.directoryService
        .getTemplates()
        .then(ret => {
            if (!ret) {
                this.showError('', '服务模板数据获取失败。');
            } else {
                if (ret && ret.resultContent) {
                  this.templates = ret.resultContent;

                  this.getDirectorys(this.currPage, this.pageSize);
                }
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '服务模板数据获取失败。');
            this.layoutService.setLoading(false);
        });
  }

  getDirectorys(page: number, size: number) {
    this.layoutService.setLoading(true);

    this.directoryService
        .getDirectories(PlatformId, Status, page-1, size)
        .then(ret => {
            if (!ret) {
                this.showError('', '服务目录数据获取失败。');
            } else {
                this.fmtDirectorysData(ret);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '服务目录数据获取失败。');
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
      this.resetPaging();
    }
  }
  getTemplateName(serviceTemplateId: number) {
    let templateName = '';
    
    this.templates.forEach(element => {
      if (element.id == serviceTemplateId) {
        templateName = element.name;
      }
    });

    return templateName;
  }

  publish(directory: Directory) {
    this.publishDirectory(directory, '1');
  }

  cancelPublish(directory: Directory) {
    this.publishDirectory(directory, '0');
  }

  publishDirectory(directory: Directory, status: string) {

    this.layoutService.setLoading(true);

    this.directoryService
        .publish(PlatformId, directory.id, status)
        .then(ret => {
            if (!ret) {
                this.showError('', '服务目录操作失败。');
            } else {
                directory.status = parseInt(status);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showError('', '服务目录操作失败。');
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
    //             this.showError('', '服务目录更新失败。');
    //         } else {
    //             this.refreshData(ret);
    //         }
    //         this.layoutService.setLoading(false);
    //     })
    //     .catch(error => {
    //         this.showError('', '服务目录更新失败。');
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

  remove() {
    let ids = this.getAllSelectedData();

    if (ids.length == 0) {
      this.showError('', '请选择至少一个服务目录');
      return;
    }
    
    // this.layoutService.setLoading(true);

    // this.directoryService
    //     .removeAll(PlatformId, ids)
    //     .then(ret => {
    //         if (!ret) {
    //             this.showError('', '服务目录删除失败。');
    //         } else {
    //             this.allChecked = false;
    //         }
    //         this.layoutService.setLoading(false);
    //     })
    //     .catch(error => {
    //         this.showError('', '服务目录删除失败。');
    //         this.layoutService.setLoading(false);
    //     });
  }

  getAllSelectedData(): number[] {
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

  resetPaging() {
    
    let dispCount = Math.min(this.dispPagingCount, this.totalPages);

    let start = this.currPage - Math.floor(dispCount/2);
    start = start <1 ? 1: start;
    start = (start + (dispCount-1)) > this.totalPages ? (this.totalPages-(dispCount-1)) : start;
    let end = start + (dispCount-1);
    end = end > this.totalPages ? this.totalPages : end;


    this.pages.length = 0;
    for (let i=start; i<=end; i++) {
      this.pages.push(i);
    }
  }

  changePage(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.totalPages ? this.totalPages : page;

    if (this.currPage == page) {
      return;
    }

    this.currPage = page;
    this.getDirectorys(this.currPage, this.pageSize);
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  checkAll() {
    this.allChecked = !this.allChecked;
    this.directories.forEach((element, index) => {
      this.directories[index].checked = this.allChecked;
    });
  }
}
