import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PfConnMngCreService } from '../service/pf_conn_mng_cre.service';

import { LayoutService } from '../../../../core/service/layout.service';

@Component({
  // moduleId: module.id,
  selector: 'fc-pf-conn-mng-cre',
  templateUrl: '../template/pf_conn_mng_cre.component.html',
  styleUrls: [],
  providers: []
})

export class PfConnMngCreComponent implements OnInit {
  constructor(
    private pfConnMngCreService: PfConnMngCreService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  showError(title: string, msg: string) {
    alert(msg);
  }
}
