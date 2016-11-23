import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';
import { SystemDictionaryService } from '../../../../architecture';

@Component({
  selector: 'fc-root',
  templateUrl: '../template/site.component.html',
  styleUrls: ['../style/site.component.css']
})
export class SiteComponent implements OnInit{
  title: string = 'Fox Cloud Portal!';
  left_content_script: string;
  
  constructor (
    private layoutService: LayoutService,
    private dictService: SystemDictionaryService
  ) { }
  
  ngOnInit() {
    this.layoutService.hide();
    this.preLoad();
  }
  preLoad(){
    this.dictService.get();  //初始化获取所有的数据字典
  }
}
