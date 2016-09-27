import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Directory } from '../model/directory';
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

  pageSize: number;
  totalPages: number;
  currPage: number;
  pages: any[];
  dispPagingCount: number = 7;

  directorys: Directory[];
  allChecked: boolean = false;
  filterText: string = '';
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
    this.layoutService.setLoading(false);

    this.directorys = new Array<Directory>();

    this.directoryService.init()
                      .then(res => 
                      {
                          this.getDirectorys(this.currPage, this.pageSize);
                      });
  }
  getDirectorys(page: number, size: number) {
      this.layoutService.setLoading(true);

      this.directoryService
          .getDirectories(page-1, size)
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
      this.directorys = ret.resultContent.content;

      this.directorys.forEach((element, index) => {
        this.directorys[index].checked = false;
      });
      this.resetPaging();
    }
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
    this.directorys.forEach((element, index) => {
      this.directorys[index].checked = this.allChecked;
    });
  }
}
