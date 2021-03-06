import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService, ItemLoader,RestApi, RestApiCfg,NoticeComponent, PopupComponent,SystemDictionaryService, SystemDictionary } from '../../../../architecture';
import { ExtendDetailItem,CertMethod, EntProdItem, EntEstItem, EntEst,EntEstCreResourceQuota} from '../model';
import { EntEstCreService, Paging } from '../service/ent-est-cre.service';
import {DictService} from '../../../../architecture/core/service/dict-service';
@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-check.component.html',
  styleUrls: ['../style/ent-est-mng.component.less'],
  providers: [EntEstCreService]
}) 
export class EntEstCheckComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

      eplist : any = {};
    epcpu: any = [{ data: [0,10]}];//VCPU
    epmem: any = [{ data: [0,10]}];//
    epdisk: any = [{ data: [0,10]}];
    ephost: any = [{ data: [0,10]}];
    epsnapshot: any = [{ data: [0,10]}];
    epimage: any = [{ data: [0,10]}];
    epfloatIp: any = [{ data: [0,10]}];

      public quotaOptions = {
                legend: { display: false },
                tooltips: {  enabled: false },
                cutoutPercentage: 82
            }

  private entEst: EntEst = new EntEst();
  private entProdItems: Paging<EntProdItem> = new Paging<EntProdItem>();
  private entId:string = "";
  private dic:SystemDictionary[];
  private resourceQuotaSvg : ItemLoader<EntEstCreResourceQuota>;
  private msg ={title:'',desc:''};

//查看企业：管理信息及新增图标（云主机、物理机、存储、数据库、快照/镜像）等数据
 private extendDetailLoader : ItemLoader<ExtendDetailItem> = null; 

  //[ngStyle]="{'stroke-dashoffset': '75.0401';'stroke-dasharray': 282.783;}"


  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService,
    private activatedRouter: ActivatedRoute,
    private restApiCfg:RestApiCfg,
    private restApi:RestApi,
    private _dictServ:DictService
  ) { 



     this.extendDetailLoader = new ItemLoader<ExtendDetailItem>(false,'加载数据错误','ent-mng.ent-est-mng.enterprise.detail.ext',restApiCfg,restApi);
  

    // this.extendDetailLoader.MapFunc = (source:Array<any>,target:Array<ExtendDetailItem>)=>{
    //   let obj = new ExtendDetailItem();
    //   for(let item of source){
    //     obj.orderForAudit = item.orderForAudit;
    //     obj.serviceToExpired = item.serviceToExpired;

    //     obj.ticketNew = item.ticketNew;
    //     obj.ticketProcessing = item.ticketProcessing;
    //     obj.ticketDone = item.ticketDone;

    //     obj.userEnabled = item.userEnabled;
    //     obj.userDisabled = item.userDisabled;

    //     obj.vmRunning = item.vmRunning;
    //     obj.vmPaused = item.vmPaused;

    //     obj.storageRunning = item.storageRunning;
    //     obj.storagePaused = item.storagePaused;

    //     obj.dbRunning = item.dbRunning;
    //    obj.dbPaused = item.dbPaused;

    //     obj.snapshotRunning = item.snapshotRunning;

    //     target.push(obj);
    //   }
    // }

  // this.extendDetailLoader.FakeDataFunc = (target:Array<ExtendDetailItem>)=>{
  //     target.splice(0, target.length);

  //     let _extend = new ExtendDetailItem();
  //     _extend.orderForAudit = 123;
  //     _extend.orderToExpired = 15;
  //     _extend.ticketNew = 11;
  //     _extend.ticketProcessing = 11;
  //     _extend.ticketDone = 11;
  //      _extend.userEnabled = 11;
  //     _extend.userDisabled = 11;

  //     _extend.vmRunning = 123;
  //     _extend.vmPaused = 15;

  //     _extend.pcRunning = 11;
  //     _extend.pcPaused = 11;

  //     _extend.storageRunning = 11;
  //     _extend.storagePaused = 11;

  //     _extend.dbRunning = 11;
  //     _extend.dbPaused = 11;

  //     _extend.snapshotRunning = 11;
  //      _extend.snapshotPaused = 11;
    
  //     target.push(_extend);  
  //   }


    //加载企业统计图
    
    this.resourceQuotaSvg = new ItemLoader<EntEstCreResourceQuota>(true, "ENT_MNG.ENT_OVERVIEW_DATA_ERROR", "ent-mng.ent-est-mng.enterprise.quota.detail", restApiCfg, restApi);
    this.resourceQuotaSvg.MapFunc = (source:Array<any>, target:Array<EntEstCreResourceQuota>)=>{
      for(let item of source)
      {
        let obj = new EntEstCreResourceQuota();
        target.push(obj);
        

          obj.enterpriseId = item.enterpriseId;// : string = null;//": "string",

          obj.id = item.id;// : string = null;//": "string",
          obj.vcpuQuota = item.cpuQuota;// : number = null;//": 0, //vCPU数量
          obj.usedCpuQuota =item.usedCpuQuota; 
         
          obj.memroyQuota = item.memQuota; //内存
          obj.usedMemQuota =item.usedMemQuota; 

           obj.storageQuota = item.storageQuota;//存储
           obj.usedStorageQuota =item.usedStorageQuota; 

          obj.physicalQuota = item.physicalMachineQuota;// : number = null;//": 0,//可创建物理机数量
          obj.usedPhysicalMachineQuota =item.usedPhysicalMachineQuota; 

          obj.snapShotQuota = item.snapshotQuota;// : number = null;//": 0,//可创建快照数量
          obj.usedSnapshotQuota =item.usedSnapshotQuota; 

          obj.imageQuota = item.imageQuota;// : number = null;//": 0,//可创建镜像数量
          obj.usedImageQuota =item.usedImageQuota; 

         obj.floatIpQuota = item.floatIpQuota;// : number = null;//": 0,//可创建浮动IP数量
         obj.usedFloatIpQuota =item.usedFloatIpQuota; 

        

         // obj.usedCpuRate = item.usedCpuRate;//CPU配额使用率
        obj.usedCpuRate = item.cpuQuota==0?0:Number(((item.usedCpuQuota/item.cpuQuota)*100).toFixed(2));

        // obj.usedFloatIpRate= item.usedFloatIpRate;// 浮动IP配额配额
        obj.usedFloatIpRate=item.floatIpQuota==0?0:Number(((item.usedFloatIpQuota/item.floatIpQuota)*100).toFixed(2));

        // obj.usedImageRate = item.usedImageRate;//镜像配额使用率
        obj.usedImageRate =item.imageQuota==0?0:Number(((item.usedImageQuota/item.imageQuota)*100).toFixed(2));

        // obj.usedMemRate  = item.usedMemRate;//内存使用率
        obj.usedMemRate =item.memQuota==0?0:Number(((item.usedMemQuota/item.memQuota)*100).toFixed(2));

        // obj.usedPhysicalMachineRate = item.usedPhysicalMachineRate;//物理机配额使用率
        obj.usedPhysicalMachineRate = item.physicalMachineQuota==0?0:Number(((item.usedPhysicalMachineQuota/item.physicalMachineQuota)*100).toFixed(2));

        // obj.usedSnapshotRate = item.usedSnapshotRate; //快照配额使用率
        obj.usedSnapshotRate = item.snapshotQuota==0?0:Number(((item.usedSnapshotQuota/item.snapshotQuota)*100).toFixed(2)); 

        // obj.usedStorageRate = item.usedStorageRate;//储存使用率

        obj.usedStorageRate =item.storageQuota==0?0:Number(((item.usedStorageQuota/item.storageQuota)*100).toFixed(2));
  
      }
    };
     this.resourceQuotaSvg.Trait = (target:Array<EntEstCreResourceQuota>)=>{
            const bgc = [ "#E7E9ED", "#00CC99" ];
            const bgw = [  0,0  ];  

            this.epcpu = [{ data: [ target[0].usedCpuQuota,target[0].vcpuQuota- target[0].usedCpuQuota], backgroundColor: bgc, borderWidth:bgw }];
            this.epmem = [{ data: [target[0].usedMemQuota,target[0].memroyQuota-target[0].usedMemQuota ], backgroundColor: bgc, borderWidth:bgw }];
            this.epdisk = [{ data: [target[0].usedStorageQuota, target[0].storageQuota-target[0].usedStorageQuota], backgroundColor: bgc, borderWidth:bgw }];
            this.ephost = [{ data: [target[0].usedPhysicalMachineQuota,  target[0].physicalQuota-target[0].usedPhysicalMachineQuota], backgroundColor: bgc, borderWidth:bgw }];
            this.epsnapshot = [{ data: [ target[0].usedSnapshotQuota,target[0].snapShotQuota-target[0].usedSnapshotQuota ], backgroundColor: bgc, borderWidth:bgw }];
            this.epimage = [{ data: [target[0].usedImageQuota, target[0].imageQuota-target[0].usedImageQuota ], backgroundColor: bgc, borderWidth:bgw }];
            this.epfloatIp = [{ data: [target[0].usedFloatIpQuota,target[0].floatIpQuota-target[0].usedFloatIpQuota], backgroundColor: bgc, borderWidth:bgw }]; 
     
    
            //   this.epcpu = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.epmem = [{ data:[ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.epdisk = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.ephost = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.epsnapshot = [{ data:[ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.epimage = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            // this.epfloatIp = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];  
}

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
    // this.createChart();
     this.layoutService.show();
     this.extendDetailLoader.Go(null,[{key:'_enterpriseId',value:this.entId}])
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
      ,5,()=>{
        this.updateWithDic();
      }); 
  }

//加载统计图
 loadResourceQuotaSvg(){
   this.layoutService.show();
    this.resourceQuotaSvg.Go(1,[{key:"enterpriseId", value:this.entId}])
    .then(success=>{
     this.layoutService.hide();

    }, err=>{
       this.msg.title='ENT_MNG.RESOURCE_STATISTICS_LOADING';
       this.msg.desc='ENT_MNG.RESOURCE_STATISTICS_FAILED_TO_LOAD';
       this.showError(this.msg);
       this.layoutService.hide();
    })
 }


//不调用接口测试统计图
createChart(){
          const bgc = [ "#E7E9ED", "#00CC99" ];
            const bgw = [  0,0  ];  
             this.epcpu = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.epmem = [{ data:[ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.epdisk = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.ephost = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.epsnapshot = [{ data:[ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.epimage = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];
            this.epfloatIp = [{ data: [ 15,85], backgroundColor: bgc, borderWidth:bgw }];  
}

}