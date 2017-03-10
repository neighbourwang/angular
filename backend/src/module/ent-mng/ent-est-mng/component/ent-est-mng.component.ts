import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { DicLoader, ItemLoader, RestApi, RestApiCfg, LayoutService, NoticeComponent, PopupComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { CertMethod, Status, EntEstItem, EntEst
  , EntEstCreResourceQuota} from '../model';

import { EntEstCreService, Paging } from './../service/ent-est-cre.service';
import * as _ from 'underscore';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-mng.component.html',
  styleUrls: ['../style/ent-est-mng.component.less'],
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
  private selectAllField: boolean = false;
  private criteria: string = "";
  private entEst: EntEst = new EntEst();
  private dic:SystemDictionary[];
  private entEstMng:ItemLoader<EntEstItem> = null;
  private entEstResource:ItemLoader<EntEstCreResourceQuota> = null;
  private statusDic:DicLoader = null;
  private _certUpdateHandler:ItemLoader<any> = null;

  private ADflag: string = "";

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) {

    //认证数据更新
    this._certUpdateHandler = new ItemLoader<any>(false, "ENT_MNG.ENT_CERT_UPDATE_FAILED", "ent-mng.ent-est-mng.enterprise.updateauth", restApiCfg, restApi);

    this.entEstMng = new ItemLoader<EntEstItem>(true, "ENT_MNG.ENT_MNG_LIST_DATA_ERROR", "ent-mng.ent-est-mng.enterprise.get", restApiCfg, restApi);
    
    //配置企业配额加载
    this.entEstResource = new ItemLoader<EntEstCreResourceQuota>(true, "ENT_MNG.ENT_QUOTA_DATA_ERROR", "ent-mng.ent-est-mng.enterprise.resourcequota.get", restApiCfg, restApi);
    this.entEstResource.MapFunc = (source:Array<any>, target:Array<EntEstCreResourceQuota>)=>{
      for(let item of source)
      {
        let obj = new EntEstCreResourceQuota();
        target.push(obj);

        _.extendOwn(obj, item);
        obj.memroyQuota = item.memQuota/1024;// : number = null;//": 0,//可用内存数量
        obj.physicalQuota = item.physicalMachineQuota;// : number = null;//": 0,//可创建物理机数量
        obj.snapShotQuota = item.snapshotQuota;// : number = null;//": 0,//可创建快照数量
        obj.enterpriseId = obj.enterpriseId || this.getSelected().enterpriseId;
      }
    };

    this.entEstResource.FirstItem = new EntEstCreResourceQuota();


      //字典配置
      this.statusDic = new DicLoader(restApiCfg, restApi, "TENANT", "STATUS");
      this.statusDic.SourceName = "status";
      this.statusDic.TargetName = "statusName";
  }

  ngOnInit() {
    this.layoutService.show();
    this.statusDic.Go()
    .then(success=>{
      this.layoutService.hide();
      this.search(1);
    },err=>{
      this.layoutService.hide();
      this.showMsg(err);
    })
  }

  showError(msg:any) {
    this.notice.open(msg.title, msg.desc);
  }

  onRejected(reason: any) {
      alert(reason);
  }


  changePage(page: number) {
    this.search(page);
  }

  selectAll(selectAllField:boolean){
    this.entEstMng.Items.map(n=>{n.checked = selectAllField;});
  }

  search(page:number){
    this.layoutService.show();
    this.entEstMng.Go(page)
    .then(success=>{
      this.statusDic.UpdateWithDic(success);
      this.layoutService.hide();
    }, err=>{
      this.showMsg(err);
      this.layoutService.hide();
    })
  }

  getSelected(){
    let item = this.entEstMng.Items.find(n=>n.checked) as EntEstItem;
    if(item)
      return item;
    else
    {
      this.showMsg("ENT_MNG.PLEASE_CHOOSE_ENTERPRISE");
      return null;
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
    console.log('ent-est-mng/edit');
    if(this.getSelected())
    {
      let item = this.getSelected();

      this.entEst.BasicInfo.reset();

      this.service.loadEntInfo(this.entEst.BasicInfo
        , this.showError
        , ()=>{this.editEnt.open()}
        , this
        , this.getSelected().enterpriseId);
    }

  }

  showMsg(msg: string)
  {
    this.notice.open("COMMON.SYSTEM_PROMPT", msg);
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
        this.editEnt.close();
        this.search(null);
      })
      .catch(err=>{
        console.log('保存企业基本信息出错', err);
        this.showMsg("ENT_MNG.FAIL_TO_SAVE_ENTERPRISE_INFO");
        this.okCallback = ()=>{this.editEnt.open();};
      })
    }
    else
    {
      this.editEnt.close();
    }
  }

  //验证编辑
  validateEntModify():boolean{
    let notValid = [
    {
      "name":""
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
      let self = this;

      this.layoutService.show();
      this.entEstResource.Go(1, [
      {
        key:"_enterpriseId"
        ,value:self.getSelected().enterpriseId
      }])
      .then(success=>{
        this.layoutService.hide();
        this.editQuota.open();
      },err=>{
        this.layoutService.hide();
        this.showMsg(err);
      });
      
    }
  }

  //设置认证
  setupCertInfo(){
    if(this.getSelected())
    {
      let item = this.getSelected();
      console.log('setupCertInfo:', item);
      if(item.authMode == CertMethod.Local)
      {
        this.showMsg("ENT_MNG.LOCAL_ENTERPRISE_CANNOT_SET_AUTHENTICATION");
        return;
      }

      this.entEst.BasicInfo.reset();
      // todo: 加载认证数据
      // todo: 保存认证数据
      // todo: 刷新列表

      // this.loadEntCertInfo(item.id);
      this.setupCert.open();
    }
  }
  //加载认证数据
 loadEntCertInfo(id){
          this.service.loadEntCertInfo(this.entEst.BasicInfo
          ,this.showError
          ,()=>{
            this.setupCert.open();
          }
          ,this
          ,id);
 }

 
  //设置产品
  setupProduct(){
    if(this.getSelected())
    {
      this.router.navigateByUrl(`ent-mng/ent-est-mng/ent-est-setProd/${this.getSelected().enterpriseId}/${this.getSelected().enterpriseName}`);
    }
  }

//管理可用平台
manageAviPlatform(){
  this.router.navigateByUrl(`ent-mng/ent-est-mng/ent-est-managePlatform/${this.getSelected().enterpriseId}`);
}
  //设置管理员
  setupAdmin(){
    if(this.getSelected())
    {
      if(this.getSelected().status=="1"){
         this.router.navigateByUrl(`ent-mng/ent-admin-mng/ent-admin-mng/${this.getSelected().enterpriseId}`);
      }
      else{
        this.showMsg("ENT_MNG.ONLY_ENABLED_ENTERPRISE_CAN_SET_ADMIN");
      }

    }
  }

  //启用
  enable(){
    if(this.getSelected())
    {
      if(this.getSelected().status=="1"){
        this.showMsg("ENT_MNG.CANNOT_ENABLE_ENABLED_ENTERPRISE");
      }
      else {
        this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().enterpriseId, Status.Active)
        .then(ret=>{
          this.search(null);
        })
        .catch(err=>{
          console.log("企业启用失败", err);
          this.showMsg("ENT_MNG.FAIL_TO_ENABLE_ENTERPRISE");
        })
      };
      this.confirm.open("ENT_MNG.ENABLE_ENTERPRISE", `ENT_MNG.CONFIRM_ENABLE_ENTERPRISE^^^${this.getSelected().enterpriseName}`);
      }
      
    }
  }

  //禁用
  disable(){
    if(this.getSelected())
    {
       if(this.getSelected().status=="2") {
        this.showMsg("ENT_MNG.CANNOT_DISENABLE_DISENABLED_ENTERPRISE");
      }
       else if(this.getSelected().status=="0"){
        this.showMsg("ENT_MNG.CANNOT_DISENABLE_UNENABLED_ENTERPRISE");
       }
      else{
        this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().enterpriseId, Status.Suspend)
        .then(ret=>{
          this.search(null);
        })
        .catch(err=>{
          console.log("企业禁用失败", err);
          this.showMsg("ENT_MNG.FAIL_TO_DISENABLE_ENTERPRISE");
        })
      };
      this.confirm.open("ENT_MNG.DISENABLE_ENTERPRISE", `您选择禁用"${this.getSelected().enterpriseName}"企业，请确认；如果确认，企业用户将不能进入云管理平台自助服务门户。`);
      }
    }
  }

  //删除
  delete(){
    if(this.getSelected())
    {
      if(this.getSelected().status=="4"){
        this.showMsg("ENT_MNG.CANNOT_DELETE_DELETED_ENTERPRISE");
      }
      else if(this.getSelected().status=="1"){
        this.showMsg("ENT_MNG.CANNOT_DELETE_ENABLE_ENTERPRISE");
      }
      else{
        this.confirmedHandler = ()=>{
        this.service.updateEntStatus(this.getSelected().enterpriseId, Status.Deleted)
        .then(ret=>{
            if(ret.resultCode==10001003){
              this.showMsg("该企业下存在用户，不能删除！");
            }
            this.search(null);
        })
        .catch(err=>{
        
          console.log("企业删除失败", err);
          this.showMsg("ENT_MNG.FAIL_TO_DELETE_ENTERPRISE");
        })
      };
      this.confirm.open("ENT_MNG.DELETE_ENTERPRISE", `ENT_MNG.CONFIRM_DELETE_ENTERPRISE^^^${this.getSelected().enterpriseName}`);
      }
    }
  }

  //查看企业
  checkEnterpriseInfo(entId: string){
    console.log('checkEnterpriseInfo entId', entId);
    this.router.navigateByUrl(`ent-mng/ent-est-mng/ent-est-check/${entId}`);
  }
  //修改配额
  acceptQuotaModify(){
    if(this.validateQuotaModify())
    {
      this.editQuota.close();
      this.entEstResource.FirstItem.memroyQuota = this.entEstResource.FirstItem.memroyQuota*1024;
      this.service.updateEntQuota(this.entEstResource.FirstItem)
      .then(ret=>{
        this.search(null);//刷新
      })
      .catch(err=>{
        console.log("修改配额失败", err);
        this.showMsg("ENT_MNG.FAIL_TO_MODIFY_QUOTA");
        this.okCallback = ()=>{this.editQuota.open();};
      });
    }
    else{
      this.editQuota.close();
    }
  }

  //验证修改配额不为空也不能为负数
  validateQuotaModify():boolean{
    let notValid = [
    {
      "name":""//可创建浮动IP数量
      ,"value":this.entEstResource.FirstItem.floatIpQuota
      ,"op":"integer"
    },
    {
      "name":""//可创建镜像数量
      ,"value":this.entEstResource.FirstItem.imageQuota
      ,"op":"integer"
    },
    {
      "name":""//可用内存数量
      ,"value":this.entEstResource.FirstItem.memroyQuota
      ,"op":"integer"
    },
    {
      "name":""//可创建物理机数量
      ,"value":this.entEstResource.FirstItem.physicalQuota
      ,"op":"integer"
    },
    {
      "name":""//可创建快照数量
      ,"value":this.entEstResource.FirstItem.snapShotQuota
      ,"op":"integer"
    },
    {
      "name":""//可用存储额度
      ,"value":this.entEstResource.FirstItem.storageQuota
      ,"op":"integer"
    },
    {
      "name":""//可使用vCPU数量
      ,"value":this.entEstResource.FirstItem.vcpuQuota
      ,"op":"integer"
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
      this.layoutService.show();

      this._certUpdateHandler.Go(null, [{key:"_enterpriseId", value:this.getSelected().enterpriseId}], 
        {
          "authMode": null,//前台未提供
          "id": this.entEst.BasicInfo.id,
          "password": this.entEst.BasicInfo.password,
          "url": this.entEst.BasicInfo.certUrl,
          "userName": this.entEst.BasicInfo.contactorName
        })
      .then(success=>{
        this.layoutService.hide();
        this.setupCert.close();
        this.search(null);
      })
      .catch(err=>{
        this.layoutService.hide();
        this.showMsg(err);
      })
    }
  }

  //验证设置认证
  validateCertModify():boolean{
    let notValid = [
    {
      "name":""//URL地址
      ,'value':this.entEst.BasicInfo.certUrl
      ,"op":"*"
    },
    {
      "name":""//用户名
      ,'value':this.entEst.BasicInfo.contactorName
      ,"op":"*"
    },
    {
      "name":""//密码
      ,'value':this.entEst.BasicInfo.password
      ,"op":"*"
    }].find(n=>this.service.validate(n.name, n.value, n.op) !== undefined)

    if(notValid !== void 0)
    {
      this.showMsg(this.service.validate(notValid.name, notValid.value, notValid.op));
      this.okCallback = ()=>{
        this.setupCert.open();
      };      
      return false;
    }
    else
      return true;
  }

  //取消认证
  cancelCertModify(){
    this.entEst.BasicInfo.reset();
  }

  //选择行
  selectItem(index:number):void
  {
    this.entEstMng.Items.map(n=>{n.checked = false;});
    this.entEstMng.Items[index].checked = true;
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

  //管理认证源
  setupCerts() {
      let selectItem = this.getSelected();
      if (!selectItem) {
          this.showMsg("ENT_MNG.PLEASE_CHOOSE_ENTERPRISE");
          return;
      }
      if (selectItem.authMode != CertMethod.AD) { //caozhongying 这个地方需要增加一个属性
          this.showMsg("ENT_MNG.ONLY_AD_ENTERPRISE_CAN_SET_AD_SOURCE");
          return;
      }
      this.router.navigateByUrl(`ent-mng/attest-mng/attest-mng/${this.getSelected().enterpriseId}`);
  }

  //测试AD信息
  testAD(): any {
    if (this.validateCertModify()) {
      this.layoutService.show();
      this.service.testAD(this.entEst).then(res => {
        this.layoutService.hide();
        if (res && res.resultCode == "100") {
          console.log("AD测试成功", res);
          this.ADflag = "true";
        } else {
          console.log("AD测试失败", res);
          //this.showMsg("AD测试失败");
          this.ADflag = "false";
          return;
        }
      })
        .catch(err => {
          console.log("AD测试异常", err);
          this.layoutService.hide();
          //this.showMsg("AD测试失败");
          this.ADflag = "false";
        });
    }
  }
  
}