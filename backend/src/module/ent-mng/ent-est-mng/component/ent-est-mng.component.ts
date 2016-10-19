import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent, ConfirmComponent } from '../../../../architecture';
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

  @ViewChild("confirm")
  confirm: ConfirmComponent;

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
    if(entId)
      return [url, "?", "entId=", entId].join();
    else
    {
      console.log('composeUrlWithId:entId is empty');
      return url;
    }
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

  showMsg(msg: string)
  {
    this.notice.open("系统提示", msg);
  }

  //保存编辑
  acceptEntModify(){
    console.log('保存编辑');
    if(this.validateEntModify())
    {
      // todo: 保存编辑
      // todo: 刷新列表
    }
  }

  //验证编辑
  validateEntModify():boolean{
    let notValid = [
    {
      "name":"名称"
      ,'value':this.entEst.BasicInfo.name
      ,"op":"*"
    }].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

    if(notValid !== void 0)
    {
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      return false;
    }

    return true;
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


      this.setupCert.open();
    }
  }

  //设置产品
  setupProduct(){
    if(this.getSelected())
    {
      this.router.navigateByUrl(this.composeUrlWithId("ent-mng/ent-est-mng/ent-est-setProd", this.getSelected().id));
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
      this.confirm.open("启用企业", ["选择启用\"", this.getSelected().enterpriseName, "\"企业，请确认"].join());
    }
  }

  //禁用
  disable(){
    if(this.getSelected())
    {
      this.confirm.open("禁用企业", ["您选择禁用\"", this.getSelected().enterpriseName, "\"企业，请确认；如果确认，企业用户将不能进入云管理平台自助服务门户。"].join());
    }
  }

  //删除
  delete(){
    if(this.getSelected())
    {
      this.confirm.open("删除企业", ["您选择删除\"", this.getSelected().enterpriseName, "\"企业，请确认；如果确认，此企业数据将不能恢复。"].join());
    }
  }

  //修改配额
  acceptQuotaModify(){
    if(this.validateQuotaModify())
    {
      // todo: 修改配额api
      // todo: 刷新列表
    }
  }

  //验证修改配额
  validateQuotaModify():boolean{
    let notValid = [
    {
      "name":"可创建云主机数量"
      ,"value":this.entEst.ResourceQuota.platformVMQuota
      ,"op":"*"
    },
    {
      "name":"可创建物理机数量"
      ,"value":this.entEst.ResourceQuota.physicalMachineQuota
      ,"op":"*"
    },
    {
      "name":"可用存储额度"
      ,"value":this.entEst.ResourceQuota.storageQuota
      ,"op":"*"
    },
    {
      "name":"可创建快照数量"
      ,"value":this.entEst.ResourceQuota.snapQuota
      ,"op":"*"
    },
    {
      "name":"可创建镜像数量"
      ,"value":this.entEst.ResourceQuota.imageQuota
      ,"op":"*"
    }].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

    if(notValid !== void 0)
    {
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      return false;
    }

    return true;
  }

  //取消配额
  cancelQuotaModify(){
    this.entEst.ResourceQuota.reset();
  }

  //设置认证
  acceptCertModify(){
    if(this.validateCertModify())
    {
      // todo: 修改认证api
      // todo: 刷新列表
    }
  }

  //验证设置认证
  validateCertModify():boolean{
    let notValid = [
    {
      "name":"URL地址"
      ,'value':this.entEst.BasicInfo.certUrl
      ,"op":"*"
    },
    {
      "name":"用户名"
      ,'value':this.entEst.BasicInfo.contactorName
      ,"op":"*"
    },
    {
      "name":"密码"
      ,'value':this.entEst.BasicInfo.password
      ,"op":"*"
    }].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

    if(notValid !== void 0)
    {
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      return false;
    }
  }

  //取消认证
  cancelCertModify(){
    this.entEst.BasicInfo.reset();
  }

}