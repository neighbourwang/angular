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
    
  }

  getInstanceDetail(uuid: string) {
    this.instanceService
        .getInstanceDetail(uuid)
        .then(ret => {
            if (!ret) {
                this.showNotice('数据获取失败', '实例详细信息获取失败。');
            } else {
                this.fmtInstanceData(ret);
            }
            this.layoutService.setLoading(false);
        })
        .catch(error => {
            this.showNotice('数据获取失败', '实例详细信息获取失败。');
            this.layoutService.setLoading(false);
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
