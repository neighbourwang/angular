import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent, SystemDictionaryService, SystemDictionary  } from '../../../../architecture';
import { EntProdItem, EntEst} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-setProd.component.html',
  styleUrls: ['../style/ent-est-mng.component.less'],
  providers: [EntEstCreService]
}) 
export class EntEstSetProdComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  private entProdItems: Paging<EntProdItem> = new Paging<EntProdItem>();//当前页可用产品
  private allEntProdItems: Paging<EntProdItem> = new Paging<EntProdItem>();//所有可用产品
  private prodItems: Paging<EntProdItem> = new Paging<EntProdItem>();//所有产品
  private entName:string = "";
  private entId: string = "";
  private dic:SystemDictionary[];
  private showEntProdList: boolean = true;
  private showProdList:boolean = true;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService
  ) {}

  ngOnInit() {
    this.entId = this.activatedRoute.snapshot.params["entId"] as string;
    this.entName = this.activatedRoute.snapshot.params["entName"] as string;
    
    this.refreshData();
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
      let obj = this.dic.find(n=>n.value == id) as SystemDictionary;
      
      if(obj)
        return obj.displayValue as string;     
      else
        return id;
    };
    this.entProdItems.items.map(n=>{
      n.statusName = getName(n.status);
    });
    
     this.prodItems.items.map(n=>{
      n.statusName = getName(n.status);
    });
  } 

  //移除产品
  removeItem(entProdItem: EntProdItem)
  {
    this.entProdItems.items.splice(this.entProdItems.items.indexOf(entProdItem), 1);
    this.allEntProdItems.items.splice(this.entProdItems.items.indexOf(entProdItem), 1);
    this.prodItems.items.push(entProdItem);
    this.saveChanges();
  }

  //添加产品
  addItem(prodItem: EntProdItem)
  {
    this.entProdItems.items.push(prodItem);
    this.allEntProdItems.items.push(prodItem);
    this.prodItems.items.splice(this.prodItems.items.indexOf(prodItem), 1);
    this.saveChanges();
  }

  //保存企业产品的变更
  saveChanges()
  {
    this.service.updateEntProducts(this.allEntProdItems.items, this.entId)
    .then(ret=>{

    })
    .catch(err=>{
      console.log("保存企业产品变更失败", err);
      this.showMsg("ENT_MNG.SAVE_ENTERPRISE_PRODUCT_FAILURE");
    })
  }
  
  //返回企业列表
  return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }

  showError(msg:any) {
    this.notice.open(msg.title, msg.desc);
  }

  showMsg(msg: string)
  {
    this.notice.open("COMMON.SYSTEM_PROMPT", msg);
  }

  changePage_ProdItems(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.prodItems.totalPages ? this.prodItems.totalPages : page;

    if (this.prodItems.currentPage == page) {
      return;
    }

    this.prodItems.currentPage = page;
    this.service.loadAvailProdItems(this.prodItems, this.showError, this, this.entId
      ,()=>{this.updateWithDic();}); 
  }

  changePage_EntProdItems(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.entProdItems.totalPages ? this.entProdItems.totalPages : page;

    if (this.entProdItems.currentPage == page) {
      return;
    }

    this.entProdItems.currentPage = page;
    this.service.loadEntProdItems(this.entProdItems, this.showError, this, this.entId
      ,5,()=>{this.updateWithDic();}); 
  }

  refreshData(){
    //已选产品entProdItems
    this.service.loadEntProdItems(this.entProdItems, this.showError, this, this.entId
      ,5,()=>{this.updateWithDic();});
    this.service.loadEntProdItems(this.allEntProdItems, this.showError, this, this.entId
      ,1000,()=>{this.updateWithDic();});
      //未选产品
    this.service.loadAvailProdItems(this.prodItems, this.showError, this, this.entId
      ,()=>{this.updateWithDic();}); 

  }

}