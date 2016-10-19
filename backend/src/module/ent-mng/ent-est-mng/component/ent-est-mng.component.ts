import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { EntEstItem, EntEst} from '../model';

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

  @ViewChild("editEnt")
  editEnt: PopupComponent;

  @ViewChild("editQuota")
  editQuota: PopupComponent;

  @ViewChild("setupCert")
  setupCert: PopupComponent;

  private totalPages: number = 0;
  private currentPage: number = 0;
  private entEstMng: Paging<EntEstItem> = new Paging<EntEstItem>();
  private selectAllField: boolean = false;
  private criteria: string = "";
  private entEst: EntEst = new EntEst();

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

  getSelected(){
    let item = this.entEstMng.items.find(n=>n.checked) as EntEstItem;
    if(item)
      return item;
    else
    {
      this.notice.open("企业列表", "请选择企业");
      return null;
    }
  }

  composeUrlWithId(url:string, entId:string)
  {
    return [url, "?", "entId=", entId].join();
  }

  //创建企业
  create() {
    this.service.initCache();
    this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre");
  }

  //编辑
  edit(){
    if(this.getSelected())
    {
      let item = this.getSelected();

      this.entEst.BasicInfo.reset();
      this.entEst.BasicInfo.name = item.enterpriseName;
      this.entEst.BasicInfo.description = item.description;

      this.editEnt.open();
    }

  }

  //保存编辑
  acceptEntModify(){
    console.log('保存编辑');

    // todo: 保存编辑
    // todo: 刷新列表
  }

  //取消编辑
  cancelEntModify(){
    console.log('取消编辑');
    this.entEst.BasicInfo.reset();
  }

  //修改配额
  modifyQuota(){
    if(this.getSelected())
    {
      let item = this.getSelected();
      this.entEst.ResourceQuota.reset();

      // todo: 需要加载配额数据
      // todo: 需要保存配额数据
      // todo: 刷新列表
      this.entEst.ResourceQuota.physicalMachineQuota = 30;//加载数据
      this.editQuota.open();
    }
  }

  //设置认证
  setupCertInfo(){
    if(this.getSelected())
    {
      let item = this.getSelected();
      this.entEst.BasicInfo.reset();

      // todo: 加载认证数据
      // todo: 保存认证数据
      // todo: 刷新列表


      this.entEst.BasicInfo.certUrl = "ldap:xxxx1234";
      this.setupCert.open();
    }
  }

  //设置产品
  setupProduct(){
    if(this.getSelected())
    {
      
    }
  }

  //设置管理员
  setupAdmin(){
    if(this.getSelected())
    {
      this.router.navigateByUrl(this.composeUrlWithId("ent-mng/ent-admin-mng/ent-admin-mng", this.getSelected().id));
    }
  }

  //启用
  enable(){
    if(this.getSelected())
    {
      
    }
  }

  //禁用
  disable(){
    if(this.getSelected())
    {
      
    }
  }

  //删除
  delete(){
    if(this.getSelected())
    {
      
    }
  }

  //修改配额
  acceptQuotaModify(){

  }

  //取消配额
  cancelQuotaModify(){

  }

  //设置认证
  acceptCertModify(){

  }

  //取消认证
  cancelCertModify(){
    
  }

}