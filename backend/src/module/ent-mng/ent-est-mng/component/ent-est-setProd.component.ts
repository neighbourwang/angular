import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent } from '../../../../architecture';
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
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(data=>{
      this.entName = data["entName"];
      this.entId = data["entId"];
    });
   // todo: 加载企业产品
   // todo: 加载产品
  }

  //移除产品
  removeItem(entProdItem: EntProdItem)
  {
    this.entProdItems.items.splice(this.entProdItems.items.indexOf(entProdItem), 1);
    this.prodItems.items.push(entProdItem);
    // todo: 更新企业产品到服务器api
  }

  //添加产品
  addItem(prodItem: EntProdItem)
  {
    this.entProdItems.items.push(prodItem);
    this.prodItems.items.splice(this.prodItems.items.indexOf(prodItem), 1);
    // todo: 更新企业产品到服务器api
  }
  
  //返回企业列表
  return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }

}