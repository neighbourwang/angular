import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent, SystemDictionaryService, SystemDictionary  } from '../../../../architecture';
import { EntProdItem, EntEst} from '../model';

import { EntEstCreService, Paging } from '../service/ent-est-cre.service';

@Component({
  // moduleId: module.id,
  selector: 'ent-est-mng',
  templateUrl: '../template/ent-est-setProd.component.html',
  styleUrls: ['../style/ent-est-mng.component.css'],
  providers: [EntEstCreService]
}) 
export class EntEstSetProdComponent implements OnInit {
  @ViewChild("notice")
  notice: NoticeComponent;

  private entProdItems: Paging<EntProdItem> = new Paging<EntProdItem>();
  private prodItems: Paging<EntProdItem> = new Paging<EntProdItem>();
  private entName:string = "";
  private entId: string = "";
  private dic:SystemDictionary[];
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService,
    private sysDicService: SystemDictionaryService
  ) {}

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(data=>{
      this.entName = data["entName"];
      this.entId = data["entId"];

      this.refreshData();
       this.sysDicService.sysDicOF(this, this.sysDicCallback, "GLOBAL", "STATUS")
    });
   // todo: 加载企业产品
   // todo: 加载产品
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
      let obj = this.dic.find(n=>n.code ==id) as SystemDictionary;
      if(obj)
        return obj.displayValue as string;
      else
        return id;
    };
    this.entProdItems.items.map(n=>{n.status= getName(n.status);});
  }

  //移除产品
  removeItem(entProdItem: EntProdItem)
  {
    this.entProdItems.items.splice(this.entProdItems.items.indexOf(entProdItem), 1);
    this.prodItems.items.push(entProdItem);
    this.saveChanges();
  }

  //添加产品
  addItem(prodItem: EntProdItem)
  {
    this.entProdItems.items.push(prodItem);
    this.prodItems.items.splice(this.prodItems.items.indexOf(prodItem), 1);
    this.saveChanges();
  }

  //保存企业产品的变更
  saveChanges()
  {
    this.service.updateEntProducts(this.entProdItems.items)
    .then(ret=>{

    })
    .catch(err=>{
      console.log("保存企业产品变更失败", err);
      this.showMsg("保存企业产品变更失败");
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
    this.notice.open("系统提示", msg);
  }

  changePage_ProdItems(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.prodItems.totalPages ? this.prodItems.totalPages : page;

    if (this.prodItems.currentPage == page) {
      return;
    }

    this.prodItems.currentPage = page;
    this.service.loadAvailProdItems(this.prodItems, this.showError, this); 
  }

  changePage_EntProdItems(page: number) {

    page = page < 1 ? 1 : page;
    page = page > this.entProdItems.totalPages ? this.entProdItems.totalPages : page;

    if (this.entProdItems.currentPage == page) {
      return;
    }

    this.entProdItems.currentPage = page;
    this.service.loadEntProdItems(this.entProdItems, this.showError, this, this.entId); 
  }

  refreshData(){
    this.service.loadEntProdItems(this.entProdItems, this.showError, this, this.entId); 
    this.service.loadAvailProdItems(this.prodItems, this.showError, this); 

  }

}