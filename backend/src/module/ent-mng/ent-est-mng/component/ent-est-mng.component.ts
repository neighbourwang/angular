import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { EntEstItem, EntEst} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: ['../style/ent-est-mng.component.css'],
  providers: [EntEstCreService, SystemDictionaryService]
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
  private dic:SystemDictionary[];

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService
  ) {}

  ngOnInit() {
    this.search();
    this.sysDicService.sysDicOF(this, this.sysDicCallback, "GLOBAL", "STATUS")
  }

  sysDicCallback(sf: boolean, systemDictionarys: Array<SystemDictionary>) { 
    if (sf) {                                                                 
      this.dic = systemDictionarys;
      console.log('dic', this.dic);
      this.updateWithDic();   
    }                                                                         
  }

  updateWithDic(){
    let getName =(id:string):string=>{
      let obj = this.dic.find(n=>n.value ==id) as SystemDictionary;
      if(obj)
        return obj.displayValue as string;
      else
        return id;
    };
    this.entEstMng.items.map(n=>{n.statusName = getName(n.status);});
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
    this.search();
  }

  selectAll(selectAllField:boolean){
    this.entEstMng.items.map(n=>{n.checked = selectAllField;});
  }

  search(){
    this.service.loadEntEstItems(this.entEstMng, this.showError, this, this.criteria, ()=>{
      this.updateWithDic();
    });      
  }

  getSelected(){
    let item = this.entEstMng.items.find(n=>n.checked) as EntEstItem;
    if(item)
      return item;
    else
    {
      this.showMsg("请选择企业");
      return null;
    }
  }

  composeUrlWithId(url:string, entId:string)
  {
    if(entId)
      return [url, '?', 'entId=', entId].join('');
    else
    {
      console.log('composeUrlWithId:entId is empty');
      return url;
    }
  }

  appendUrlWithEntName(url:string, entName:string):string{
    if(entName && entName.length >0)
    {
      if(url.indexOf("?") > 0)
        return [url, '&entName=', entName].join('');
      else
        return [url, '?entName=', entName].join('');
    }
    else
      return url;
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

      this.service.loadEntInfo(this.entEst.BasicInfo
        , this.showError
        , ()=>{this.editEnt.open()}
        , this
        , this.getSelected().id);
    }

  }

  showMsg(msg: string)
  {
    this.notice.open("系统提示", msg);
  }

  private okCallback:Function = null;

  okClicked(){
    console.log('okClicked');
    if(this.okCallback)
    {
      console.log('okCallback()');
      this.okCallback();
      this.okCallback = null;
    }
  }

  //保存编辑
  acceptEntModify(){
    console.log('保存编辑');
    if(this.validateEntModify())
    {
      this.service.updateEntInfo(this.entEst.BasicInfo)
      .then(ret=>{
        this.search();
      })
      .catch(err=>{
        console.log('保存企业基本信息出错', err);
        this.showMsg("保存企业基本信息出错");
        this.okCallback = ()=>{this.editEnt.open();};
      })
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
      this.okCallback = ()=>{
        this.editEnt.open();
      };
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

      this.editQuota.open();
      this.service.loadEntResourceQuota(this.entEst.ResourceQuota
        , this.showError
        , ()=>{
          this.editQuota.open();
        }
        , this
        , this.getSelected().id
        );
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
      this.router.navigateByUrl(this.appendUrlWithEntName(this.composeUrlWithId("ent-mng/ent-est-mng/ent-est-setProd", this.getSelected().id), this.getSelected().enterpriseName));
    }
  }


  //设置管理员
  setupAdmin(){
    if(this.getSelected())
    {
      this.router.navigateByUrl("ent-mng/ent-admin-mng/ent-admin-mng/" + this.getSelected().id);
    }
  }

  //启用
  enable(){
    if(this.getSelected())
    {
      this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().id, 1)
        .then(ret=>{
          this.search();
        })
        .catch(err=>{
          console.log("企业启用失败", err);
          this.showMsg("企业启用失败");
        })
      };
      this.confirm.open("启用企业", ['选择启用"', this.getSelected().enterpriseName, '企业，请确认'].join());
    }
  }

  //禁用
  disable(){
    if(this.getSelected())
    {
      this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().id, 2)
        .then(ret=>{
          this.search();
        })
        .catch(err=>{
          console.log("企业禁用失败", err);
          this.showMsg("企业禁用失败");
        })
      };
      this.confirm.open("禁用企业", ['您选择禁用"', this.getSelected().enterpriseName, '"企业，请确认；如果确认，企业用户将不能进入云管理平台自助服务门户。'].join());
    }
  }

  //删除
  delete(){
    if(this.getSelected())
    {
      this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().id, 4)
        .then(ret=>{
          this.search();
        })
        .catch(err=>{
          console.log("企业删除失败", err);
          this.showMsg("企业删除失败");
        })
      };
      this.confirm.open("删除企业", ['您选择删除"', this.getSelected().enterpriseName, '"企业，请确认；如果确认，此企业数据将不能恢复。'].join());
    }
  }

  checkEnterpriseInfo(){
    this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-check");
  }
  //修改配额
  acceptQuotaModify(){
    if(this.validateQuotaModify())
    {
      this.service.updateEntQuota(this.entEst.ResourceQuota)
      .then(ret=>{
        this.search();//刷新
      })
      .catch(err=>{
        console.log("修改配额失败", err);
        this.showMsg("修改配额失败");
        this.okCallback = ()=>{this.editQuota.open();};
      });
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
      this.okCallback = ()=>{
        this.editQuota.open();
      }
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
      this.service.updateEntCert(this.entEst.BasicInfo)
      .then(ret=>{
        this.search();
      })
      .catch(err=>{
        console.log('认证信息更新失败', err);
        this.showMsg("认证信息更新失败");
        this.okCallback = ()=>{this.setupCert.open();};
      })
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
      this.okCallback = ()=>{
        this.setupCert.open();
      };
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      return false;
    }
  }

  //取消认证
  cancelCertModify(){
    this.entEst.BasicInfo.reset();
  }

  //选择行
  selectItem(index:number):void
  {
    this.entEstMng.items.map(n=>{n.checked = false;});
    this.entEstMng.items[index].checked = true;
  }

  private confirmedHandler:Function = null;
  //启用，禁用，删除的处理
  onConfirmed(){
    if(this.confirmedHandler)
    {
      this.confirmedHandler();
      this.confirmedHandler = null;
    }
  }
}