
import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';
import { SystemDictionaryService, RestApi } from '../../../../architecture';
import { UserService } from '../../../core/service/user.service';
import { SiteService } from '../service/site.service';
import { DictService} from '../../../core/service/dict-service';

import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'fc-root',
  templateUrl: '../template/site.component.html',
  styleUrls: ['../style/site.component.css'],
  providers:[DictService]
})
export class SiteComponent implements OnInit{
  title: string = 'Fox Cloud Portal!';
  left_content_script: string;
  username : string;
  showCssload: boolean = true;
  
  constructor (
    private layoutService: LayoutService,
    private dictService: SystemDictionaryService,
    private restApi : RestApi,
    private service : SiteService,
    private translate: TranslateService,
    private userService: UserService,
  ) {
    
   }
  
  ngOnInit() {
    this.layoutService.hide();
    // this.preLoad();
    // this.setName();
  }
  setName() {
      this.username = this.restApi.getLoginInfo().userInfo.loginName;
  }
  preLoad(){
    this.dictService.get();  //初始化获取所有的数据字典
    // this.userService.loginService();
  }
  onActivate(e) {
    if(this.showCssload) this.showCssload = false;
  }
 
  navClock(url) {
    this.showCssload = true;
  }
  
  logOut() {
    this.service.logOut().then();
    
    setTimeout(() => {
      window.sessionStorage["token"] = "";
      window.sessionStorage["userInfo"] = "";
      window.location.href = "/login.html";
    },200)
  }

  translateCodeChange(code) {
    window.localStorage["languageCode"] = code.toLocaleLowerCase();
    window.location.reload();
  }
}
