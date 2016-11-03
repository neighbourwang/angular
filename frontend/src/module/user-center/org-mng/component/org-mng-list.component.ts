import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent} from '../../../../architecture';



@Component({
  selector: 'org-mng-list',
  templateUrl: '../template/org-mng-list.component.html',
  styleUrls: [],
  providers: []
})
export class OrgMngListComponent implements OnInit {
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }
  
}
