import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { InstanceDetail } from '../model/instance';
import { InstanceListService } from '../service/';

import { LayoutService, NoticeComponent } from '../../../../architecture';

@Component({
  // moduleId: module.id,
  selector: 'fc-cloud-host-ins-list',
  templateUrl: '../template/cloud-host-ins-detail.component.html',
  styleUrls: [
    '../style/cloud-host-ins-detail.component.css'
  ],
  providers: []
})
export class InstantceDetailComponent implements OnInit {

  @ViewChild('notice')
  private noticeDialog: NoticeComponent;

  instanceUuid: string;

  instanceDetail: InstanceDetail;
  
  modalTitle: string = '';
  modalMessage: string = '';
  modalOKTitle: string = '';

  cpuData: Object;
  networkData: Object;

  constructor(
    private layoutService: LayoutService,
    private instanceService: InstanceListService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.instanceDetail = new InstanceDetail();
    this.route.params.forEach((params: Params) => {
      this.instanceUuid = params['uuid'];
      if (this.instanceUuid) {
        this.getInstanceDetail(this.instanceUuid);
      }
    });
    
    this.cpuData = [
      {
        xValue: '09:15:00',
        yValue: 2.8
      },
      {
        xValue: '09:20:00',
        yValue: 0.2
      },
      {
        xValue: '09:25:00',
        yValue: 1.2
      },
      {
        xValue: '09:30:00',
        yValue: 4
      },
      {
        xValue: '09:35:00',
        yValue: 1.2
      },
      {
        xValue: '09:40:00',
        yValue: 0.7
      },
      {
        xValue: '09:45:00',
        yValue: 2.6
      }
    ]
    this.networkData = [
      {
        xValue: '09:15:00',
        yValue: 1000
      },
      {
        xValue: '09:20:00',
        yValue: 1900
      },
      {
        xValue: '09:25:00',
        yValue: 3800
      },
      {
        xValue: '09:30:00',
        yValue: 2700
      },
      {
        xValue: '09:35:00',
        yValue: 3200
      },
      {
        xValue: '09:40:00',
        yValue: 1000
      },
      {
        xValue: '09:45:00',
        yValue: 2200
      }
    ]
  }

  getInstanceDetail(uuid: string) {
    this.instanceService
        .getInstanceDetail(uuid)
        .then(ret => {
            if (!ret) {
                this.showNotice('COMMON.DATA_ACQUISITION_FAILURE', 'CLOUD_HOST.FAILED_TO_RETRIEVE_INSTANCE_DETAILS'+ '.');
            } else {
                this.fmtInstanceData(ret);
            }
            this.layoutService.hide();
        })
        .catch(error => {
            this.showNotice('COMMON.DATA_ACQUISITION_FAILURE', 'CLOUD_HOST.FAILED_TO_RETRIEVE_INSTANCE_DETAILS'+ '.');
            this.layoutService.hide();
        });
  }

  fmtInstanceData(ret: any) {
    if (ret && ret.resultContent) {
      this.instanceDetail = ret.resultContent;

      let data = this.instanceDetail.memoryMb;
      this.instanceDetail.memoryMbDisplay = data >= 1024 ? Math.floor((data/1024)*100)/100 + 'GB' : data + 'MB';
    }
  }

  
  showNotice(title: string, msg: string) {
    this.modalTitle = title;
    this.modalMessage = msg;
    this.modalOKTitle = 'OK';

    this.noticeDialog.open();
  }
}
