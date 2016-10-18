import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntEstItem } from '../model/ent-est-item';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: ['../style/ent-est-mng.component.css'],
  providers: [EntEstCreService]
}) 
export class EntEstMngComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;
  private totalPages: number = 0;
  private currentPage: number = 0;
  private entEstMng: Paging<EntEstItem> = new Paging<EntEstItem>();
  private selectAllField: boolean = false;
  private criteria: string = "";

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
    this.search();
  }

  showError(msg:any) {
    this.notice.open(msg.title, msg.desc);
  }

  onRejected(reason: any) {
      alert(reason);
  }


  changePage(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.entEstMng.totalPages ? this.entEstMng.totalPages : page;

    if (this.entEstMng.currentPage == page) {
      return;
    }

    this.entEstMng.currentPage = page;
    this.service.loadEntEstItems(this.entEstMng, this.showError, this); 
  }

  selectAll(selectAllField:boolean){
    this.entEstMng.items.map(n=>{n.checked = selectAllField;});
  }

  search(){
    this.service.loadEntEstItems(this.entEstMng, this.showError, this, this.criteria);      
  }

  //创建企业
  create() {
    this.service.initCache();
    this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre");
  }

  //编辑
  edit(){

  }

  //修改配额
  modifyQuota(){

  }

  //设置认证
  setupCertInfo(){

  }

  //设置产品
  setupProduct(){

  }

  //设置管理员
  setupAdmin(){

  }

  //启用
  enable(){

  }

  //禁用
  disable(){

  }

  //删除
  delete(){

  }
}