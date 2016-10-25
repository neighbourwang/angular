import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { CertMethod, EntProdItem, EntEstItem, EntEst} from '../model';
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



  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
    this.router.routerState.root.queryParams.subscribe(data=>{
      let entId:string = data["entId"] as string;
      console.log('Check entId', entId);
      //加载基本信息
      this.service.loadEntInfo(this.entEst.BasicInfo
          , this.showError
          , null
          , this
          , entId);

      //加载产品信息
      this.service.loadEntProdItems(this.entProdItems, this.showError, this, entId); 
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
  

}