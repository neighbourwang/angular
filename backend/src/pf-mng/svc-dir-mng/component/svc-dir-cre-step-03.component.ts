import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService } from '../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st3',
  templateUrl: '../template/svc-dir-cre-step-03.component.html',
  styleUrls: [
    '../style/svc-dir-mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep3Component implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    
  }

  preStep() {
    this.location.back();
  }
  
  nextStep() {
    let link = ['/pf-mng/svc-dir-mng/svc-dir-cre-step-03'];
    this.router.navigate(link);
  }
  
}
