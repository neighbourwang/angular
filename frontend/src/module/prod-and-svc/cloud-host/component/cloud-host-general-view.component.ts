import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Instance } from '../model/instance';
import { InstanceListService } from '../service/cloud-host-ins-list.service';

import { LayoutService } from '../../../../architecture';

@Component({
  // moduleId: module.id,
  selector: 'fc-cloud-host-ins-list',
  templateUrl: '../template/cloud-host-general-view.component.html',
  styleUrls: [
    '../style/cloud-host-general-view.component.css'
  ],
  providers: []
})
export class GeneralViewComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
  }
}