import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Directory } from '../model/directory';
import { Region } from '../model/region';
import { DirectoryService } from '../service/directory.service';

import { LayoutService } from '../../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng',
  templateUrl: '../template/directory.component.html',
  styleUrls: [
    '../style/directory.component.css'
  ],
  providers: []
})
export class DirectoryComponent implements OnInit {

  PLATFORM_ID: number = 6;
  STATUS: string = '1';
  
  pageSize: number;
  totalPages: number;
  currPage: number;
  pages: any[];
  dispPagingCount: number = 7;

  regions: Region[];
  directories: Directory[];
  filterRegId: string = '';

  allChecked: boolean = false;
  constructor(
    private directoryService: DirectoryService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.totalPages = 0;
    this.currPage = 1;
    this.filterRegId = "";
    this.pages = new Array<any>();

    this.allChecked = false;
    this.layoutService.setLoading(false);

    this.directories = new Array<Directory>();

    this.directoryService.init()
                      .then(res => 
                      {
                          this.getRegios();
                          this.getDirectorys(this.currPage, this.pageSize);
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

  getDirectorys(page: number, size: number) {
    this.layoutService.setLoading(true);

    this.directoryService
        .getDirectories(this.PLATFORM_ID, this.STATUS, page-1, size)
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
      });
      this.resetPaging();
    }
  }

  publis(directory: Directory) {
    this.publishDirectory(directory, '1');
  }

  cancelPublish(directory: Directory) {
    this.publishDirectory(directory, '0');
  }

  publishDirectory(directory: Directory, status: string) {

    this.layoutService.setLoading(true);

    this.directoryService
        .getPublish(this.PLATFORM_ID, directory.id, status)
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

  remove() {

  }

  resetPaging() {
    
    let start = this.currPage - Math.floor(this.dispPagingCount/2);
    start = start <1 ? 1: start;
    start = (start + (this.dispPagingCount-1)) > this.totalPages ? (this.totalPages-(this.dispPagingCount-1)) : start;
    let end = start + (this.dispPagingCount-1);
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
