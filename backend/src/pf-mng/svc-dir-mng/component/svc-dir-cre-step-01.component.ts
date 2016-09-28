import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st1',
  templateUrl: '../template/svc-dir-cre-step-01.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep1Component implements OnInit {

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  nextStep() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-cre-step-02'];
    this.router.navigate(link);
  }
  
}
