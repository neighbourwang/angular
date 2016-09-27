import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { Directory } from '../model/directory';
import { DirectoryService } from '../service/directory.service';

import { LayoutService } from '../../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-svc_dir_mng_cre_st1',
  templateUrl: '../template/step1.component.html',
  styleUrls: [
    '../style/svc_dir_mng.component.css'
  ],
  providers: []
})
export class SvcDirCreStep1Component implements OnInit {

  constructor(
    
  ) {}

  ngOnInit() {
    
  }
  
}
