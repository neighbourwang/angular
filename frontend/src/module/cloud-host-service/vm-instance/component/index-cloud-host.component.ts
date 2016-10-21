import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { IndexCloudHostService } from '../service/index-cloud-host.service'

import { Vm } from '../model/vm';

@Component({
  selector: 'index-cloud-host',
  templateUrl: '../template/index-cloud-host.component.html',
  styleUrls: ['../style/index-cloud-host.less'],
})
export class IndexCloudHostComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private service : IndexCloudHostService
  ) {}

  vmList : Array<Vm> = new Array<Vm>();

  ngOnInit() {
    console.log('index-cloud-host');
    this.layoutService.show();
    this.service.getVmList(1, 10).then(
      res => {
        this.layoutService.hide();
        console.log(res);
        let items = res.resultContent;
      
        for(let item of items){
          let vm : Vm = new Vm();
          vm.diskCount = item.diskCount;
          vm.expiryDate = item.expiryDate;
          vm.instanceName = item.instanceName;
          vm.privateIp = item.privateIp;
          vm.publicIP = item.publicIP;
          vm.regionZone = item.regionZone;
          vm.snapshotCount = item.snapshotCount;
          vm.specification = item.specification;
          vm.vmState = item.vmState;
          this.vmList.push(vm);
        }
        console.log('vmList',this.vmList);
      }
    ).catch(
      err => {
        this.layoutService.hide();
      }
    )
  }
}