import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService, ItemLoader,RestApi, RestApiCfg,NoticeComponent, PopupComponent,SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { CertMethod, EntProdItem, EntEstItem, EntEst,EntEstCreResourceQuota} from '../model';
import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-check.component.html',
  styleUrls: ['../style/ent-est-mng.component.css'],
  providers: [EntEstCreService]
}) 
export class EntEstCheckComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  private entEst: EntEst = new EntEst();
  private entProdItems: Paging<EntProdItem> = new Paging<EntProdItem>();
  private entId:string = "";
  private dic:SystemDictionary[];
   private resourceQuotaSvg : ItemLoader<EntEstCreResourceQuota>;
   private msg ={title:'',desc:''};


  //[ngStyle]="{'stroke-dashoffset': '75.0401';'stroke-dasharray': 282.783;}"


  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService,
    private activatedRouter: ActivatedRoute,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi
  ) { 

    //加载企业统计图
    this.resourceQuotaSvg = new ItemLoader<EntEstCreResourceQuota>(true, "查看企业统计图", "ent-mng.ent-est-mng.enterprise.quota.detail", restApiCfg, restApi);
    this.resourceQuotaSvg.MapFunc = (source:Array<any>, target:Array<EntEstCreResourceQuota>)=>{
      for(let item of source)
      {
        let obj = new EntEstCreResourceQuota();
        target.push(obj);
        obj.usedCpuRate = item.usedCpuRate;//CPU配额使用率
        obj.usedFloatIpRate= item.usedFloatIpRate;// 浮动IP配额配额
        obj.usedImageRate = item.usedImageRate;//镜像配额使用率
        obj.usedMemRate  = item.usedMemRate;//内存使用率
        obj.usedPhysicalMachineRate = item.usedPhysicalMachineRate;//物理机配额使用率
        obj.usedSnapshotRate = item.usedSnapshotRate; //快照配额使用率
        obj.usedStorageRate = item.usedStorageRate;//储存使用率
              
         
          obj.enterpriseId = item.enterpriseId;// : string = null;//": "string",

          
          obj.vcpuQuota = item.vcpuQuota;// : number = null;//": 0, //vCPU数量
         
         
          obj.memroyQuota = item.memQuota; //内存

          obj.storageQuota = item.storageQuota;//存储

          obj.physicalQuota = item.physicalMachineQuota;// : number = null;//": 0,//可创建物理机数量

         obj.snapShotQuota = item.snapshotQuota;// : number = null;//": 0,//可创建快照数量

         obj.imageQuota = item.imageQuota;// : number = null;//": 0,//可创建镜像数量

         obj.floatIpQuota = item.floatIpQuota;// : number = null;//": 0,//可创建浮动IP数量

         obj.id = item.id;// : string = null;//": "string",
  
      }
    };


 }

  ngOnInit() {
    this.entId = this.activatedRouter.snapshot.params["entId"] as string;
    console.log('Check entId', this.entId);
    //加载基本信息
    this.service.loadEntInfo(this.entEst.BasicInfo
        , this.showError
        , null
        , this
        , this.entId);

    //加载产品信息
    this.loadEntProdItems();
    this.sysDicService.sysDicOF(this, this.sysDicCallback, "GLOBAL", "STATUS");

    this.resourceQuotaSvg.FirstItem = new EntEstCreResourceQuota();
     this.loadResourceQuotaSvg();
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
      let obj = this.dic.find(n=>n.value == id) as SystemDictionary;
      
      if(obj)
        return obj.displayValue as string;     
      else
        return id;
    };
    this.entProdItems.items.map(n=>{
         console.log('status', n.status);
      n.statusName = getName(n.status);
       console.log('statusName', n.statusName);
    });
  } 


  getCertMethod(){
    return {
      0:"本地"
      ,1:"AD"
    }[this.entEst.BasicInfo.certMethod];
  }

  //是否是AD认证
  isAdCert(){
    return this.entEst.BasicInfo.certMethod == CertMethod.AD;
  }

  showError(msg:any) {
    this.notice.open(msg.title, msg.desc);
  }

  return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }
  
  changePage(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.entProdItems.totalPages ? this.entProdItems.totalPages : page;

    if (this.entProdItems.currentPage == page) {
      return;
    }

    this.entProdItems.currentPage = page;
    this.loadEntProdItems();
  }

  loadEntProdItems(){
    this.service.loadEntProdItems(this.entProdItems, this.showError, this, this.entId
      ,()=>{
        this.updateWithDic();
      }); 
  }

//加载统计图
 loadResourceQuotaSvg(){
    this.resourceQuotaSvg.Go(1,[{key:"_enterpriseId", value:this.entId}])
    .then(success=>{
        this.msg.title='资源统计率加载';
        this.msg.desc='资源统计率加载成功!';
        this.showError(this.msg);
    }, err=>{
       this.msg.title='资源统计率加载';
        this.msg.desc='资源统计率加载失败!';
        this.showError(this.msg);
    })
 }
}