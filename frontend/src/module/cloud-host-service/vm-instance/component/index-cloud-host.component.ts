import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';

@Component({
  selector: 'index-cloud-host',
  templateUrl: '../template/index-cloud-host.component.html',
  styleUrls: [],
})
export class IndexCloudHostComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('index-cloud-host');
  }
}