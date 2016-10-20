import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { EntEstItem, EntEst} from '../model';

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




  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service: EntEstCreService
  ) {}

  ngOnInit() {
   
  }

  return(){
    this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
  }
  

}