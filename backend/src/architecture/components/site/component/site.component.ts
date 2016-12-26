import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';
import { SystemDictionaryService, RestApi } from '../../../../architecture';
import { UserService } from '../../../core/service/user.service';
import { SiteService } from '../service/site.service';
import { TranslateService } from 'ng2-translate';
import { TranslateEN } from '../../../../architecture/translate/translateEN';
import { TranslateCN } from '../../../../architecture/translate/translateCN';


@Component({
  selector: 'fc-root',
  templateUrl: '../template/site.component.html',
  styleUrls: ['../style/site.component.css']
})
export class SiteComponent implements OnInit{
  title: string = 'Fox Cloud Portal!';
  left_content_script: string;
  username : string;
  
  constructor (
    private layoutService: LayoutService,
    private dictService: SystemDictionaryService,
    private restApi : RestApi,
    private service : SiteService,
    private userService: UserService,
    public translate: TranslateService
  ) {
    
    translate.setTranslation('EN',  TranslateEN);
    translate.setTranslation('CN',  TranslateCN);

    translate.addLangs(["EN", "CN"]);
    translate.setDefaultLang('CN');
   }
  
  ngOnInit() {
    this.layoutService.hide();
    this.preLoad();
    this.setName();
  }
  setName() {
      this.username = this.restApi.getLoginInfo().userInfo.loginName;
  }
  preLoad(){
    this.dictService.get();  //初始化获取所有的数据字典
    // this.userService.loginService();
  }
  logOut() {
    this.service.logOut().then();
    
    setTimeout(() => {
      window.sessionStorage["token"] = "";
      window.sessionStorage["userInfo"] = "";
      window.location.href = "/login.html";
    },200)
  }
}
