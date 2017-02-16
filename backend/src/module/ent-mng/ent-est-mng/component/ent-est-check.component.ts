import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService, ItemLoader,RestApi, RestApiCfg,NoticeComponent, PopupComponent,SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { OrderCounter,WorkCounter,AccountCounter,CertMethod, EntProdItem, EntEstItem, EntEst,EntEstCreResourceQuota} from '../model';
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

 private orderCounterLoader : ItemLoader<OrderCounter> = null; //订单与审批
 private workCounterLoader : ItemLoader<WorkCounter> = null;//工单
 private accountCounterLoader : ItemLoader<AccountCounter> = null;//账户
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



     this.orderCounterLoader = new ItemLoader<OrderCounter>(false,'加载订单与审批系统错误','',restApiCfg,restApi);
     this.workCounterLoader = new ItemLoader<WorkCounter>(false,'加载工单系统错误','',restApiCfg,restApi);
     this.accountCounterLoader = new ItemLoader<AccountCounter>(false,'加载账户系统错误','',restApiCfg,restApi);

    // this.orderCounterLoader.MapFunc = (source:Array<any>,target:Array<OrderCounter>)=>{
    //   let obj = new OrderCounter();
    //   for(let item of source){
    //     obj.notApprveOrder =item.notApprveOrder;
    //     target.push(obj);
    //   }
    // }

  this.orderCounterLoader.FakeDataFunc = (target:Array<OrderCounter>)=>{
      target.splice(0, target.length);

      let _orderCount = new OrderCounter();
      _orderCount.notApprveOrder = 123;
      _orderCount.overdueOrder = 15;
      target.push(_orderCount);  
    }


    //   this.workCounterLoader.MapFunc = (source:Array<any>,target:Array<WorkCounter>)=>{
    //   let obj = new WorkCounter();
    //   for(let item of source){
    //     target.push(obj);
    //   }
    // }

  this.workCounterLoader.FakeDataFunc = (target:Array<WorkCounter>)=>{
      target.splice(0, target.length);

      let _workCounter = new WorkCounter();
      _workCounter.newOrder = 11;
      _workCounter.processOrder = 11;
      _workCounter.completedOrder = 11;
      target.push(_workCounter);  
    }

    //    this.accountCounterLoader.MapFunc = (source:Array<any>,target:Array<AccountCounter>)=>{
    //   let obj = new AccountCounter();
    //   for(let item of source){
    //     target.push(obj);
    //   }
    // }

  this.accountCounterLoader.FakeDataFunc = (target:Array<AccountCounter>)=>{
      target.splice(0, target.length);

      let _accountCounter = new AccountCounter();
      _accountCounter.startAccount = 11;
      _accountCounter.disabledAccount = 11;
      target.push(_accountCounter);  
    }




    //加载企业统计图
    this.resourceQuotaSvg = new ItemLoader<EntEstCreResourceQuota>(true, "ENT_MNG.ENT_OVERVIEW_DATA_ERROR", "ent-mng.ent-est-mng.enterprise.quota.detail", restApiCfg, restApi);
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

          
          obj.vcpuQuota = item.cpuQuota;// : number = null;//": 0, //vCPU数量
         
         
          obj.memroyQuota = item.memQuota; //内存

           obj.storageQuota = item.storageQuota;//存储

          obj.physicalQuota = item.physicalMachineQuota;// : number = null;//": 0,//可创建物理机数量

          obj.snapShotQuota = item.snapshotQuota;// : number = null;//": 0,//可创建快照数量

          obj.imageQuota = item.imageQuota;// : number = null;//": 0,//可创建镜像数量

         obj.floatIpQuota = item.floatIpQuota;// : number = null;//": 0,//可创建浮动IP数量

         obj.id = item.id;// : string = null;//": "string",
  
      }
    };

    // this.resourceQuotaSvg.FakeDataFunc = (target:Array<EntEstCreResourceQuota>)=>{
    //   target.splice(0, target.length);

    //   let obj = new EntEstCreResourceQuota();
    //   target.push(obj);
    //     obj.usedCpuRate = 0.13;//CPU配额使用率
    //     obj.usedFloatIpRate= 0.23;// 浮动IP配额配额
    //     obj.usedImageRate = 0.11;//镜像配额使用率
    //     obj.usedMemRate  = 0.53;//内存使用率
    //     obj.usedPhysicalMachineRate = 0.45;//物理机配额使用率
    //     obj.usedSnapshotRate = 0.23; //快照配额使用率
    //     obj.usedStorageRate = 0.28;//储存使用率
              
         
    //       obj.enterpriseId = "2";// : string = null;//": "string",

          
    //       obj.vcpuQuota = 3;// : number = null;//": 0, //vCPU数量
         
         
    //       obj.memroyQuota = 5; //内存

    //       obj.storageQuota = 3;//存储

    //       obj.physicalQuota = 2;// : number = null;//": 0,//可创建物理机数量

    //      obj.snapShotQuota = 3;// : number = null;//": 0,//可创建快照数量

    //      obj.imageQuota = 3;// : number = null;//": 0,//可创建镜像数量

    //      obj.floatIpQuota = 3;// : number = null;//": 0,//可创建浮动IP数量

    //      obj.id = "323";// : string = null;//": "string",

    // };


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
     this.layoutService.show();
     this.orderCounterLoader.Go()
     .then(success=>{
      this.layoutService.hide();
     })
     .catch(err=>{
        this.layoutService.hide();
     })
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
      console.log("测试认证方式"+this.entEst.BasicInfo.certMethod);
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
    this.resourceQuotaSvg.Go(1,[{key:"enterpriseId", value:this.entId}])
    .then(success=>{
    }, err=>{
       this.msg.title='ENT_MNG.RESOURCE_STATISTICS_LOADING';
        this.msg.desc='ENT_MNG.RESOURCE_STATISTICS_FAILED_TO_LOAD';
        this.showError(this.msg);
    })
 }
}