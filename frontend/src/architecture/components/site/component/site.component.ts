import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../core/service/layout.service';

@Component({
  selector: 'fc-root',
  templateUrl: '../template/site.component.html',
  styleUrls: ['../style/site.component.css']
})
export class SiteComponent implements OnInit{
  title: string = 'Fox Cloud Portal!';
  left_content_script: string;
  
  constructor (
    private layoutService: LayoutService
  ) { }
  
  ngOnInit() {
    this.layoutService.hide();
  }
}
