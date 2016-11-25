import { Component,OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';

//model
import { Org } from '../model/org-mng.org.model';

@Component({
  selector: 'org-mng-cr',
  templateUrl: '../template/org-mng-cr.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngCrComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  @Input() isEdit: boolean;

  org:Org;
  ngOnInit() {
    if(this.isEdit){
      console.log('edit 读取接口')
    }else{
      console.log('创建');
    }
  }
  //获取机构成员
  
  //保存 给父组件调用
  save (){
    console.log('save');
  }
  
}
