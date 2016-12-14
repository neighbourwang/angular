import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';
import { SystemDictionaryService, RestApi } from '../../../../architecture';
import { Router } from '@angular/router';

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
		private router: Router,
    private restApi : RestApi,
    private dictService: SystemDictionaryService,
  ) { }
  
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
  }
}
