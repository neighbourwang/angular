import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';

@Component({
  selector: 'cr-cloud-host',
  templateUrl: '../template/cr-cloud-host.component.html',
  styleUrls: [],
})
export class CrCloudHostComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('cr-cloud-host');
  }
}