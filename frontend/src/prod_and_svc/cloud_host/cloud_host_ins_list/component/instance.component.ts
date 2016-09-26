import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Instance } from '../model/instance';
import { InstanceListService } from '../service/instance.service';

import { LayoutService } from '../../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-cloud_host_ins_list',
  templateUrl: '../template/instance.component.html',
  styleUrls: [
    '../style/instance.component.css'
  ],
  providers: []
})
export class InstanceListComponent implements OnInit {

  pageSize: number;
  totalPages: number;
  currPage: number;
  pages: any[];
  dispPagingCount: number = 7;

  instances: Instance[];
  allChecked: boolean = false;
  filterText: string = '';
  constructor(
    private instanceService: InstanceListService,
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

    this.instances = new Array<Instance>();

    this.instanceService.init()
                      .then(res => 
                      {
                          this.getInstances(this.currPage, this.pageSize);
                      });
  }
  getInstances(page: number, size: number) {
      this.layoutService.setLoading(true);

      this.instanceService
          .getInstances(page-1, size)
          .then(ret => {
              if (!ret) {
                  this.showError('', '实例数据获取失败。');
              } else {
                  this.fmtInstancesData(ret);
              }
              this.layoutService.setLoading(false);
          })
          .catch(error => {
              this.showError('', '实例数据获取失败。');
              this.layoutService.setLoading(false);
          });
  }

  fmtInstancesData(ret: any) {
    if (ret && ret.resultContent) {
      this.totalPages = ret.resultContent.totalPages;
      this.instances = ret.resultContent.content;

      this.instances.forEach((element, index) => {
        this.instances[index].checked = false;
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
    this.getInstances(this.currPage, this.pageSize);
  }

  showError(title: string, msg: string) {
    alert(msg);
  }

  checkAll() {
    this.allChecked = !this.allChecked;
    this.instances.forEach((element, index) => {
      this.instances[index].checked = this.allChecked;
    });
  }
}
