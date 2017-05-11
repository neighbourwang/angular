import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';
import{ AlarmListModel} from '../model/alarm-list.model';
//service
import { AlarmNoticeListService } from '../service/alarm-notice-list.service';

@Component({
    selector: 'host-memory-use',
    templateUrl: '../template/host-memory-use.html',
    styleUrls: [],
    providers: []
})

export class HostMemoryUseComponent implements OnInit{

    constructor(
        private router : Router,
        private activeRoute:ActivatedRoute,
        private service : AlarmNoticeListService,
        private layoutService : LayoutService,
        private location: Location
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    alarm:AlarmListModel=new AlarmListModel();

    ngOnInit (){
        console.log('init');
        this.activeRoute.params.forEach((params: Params) => {
            this.alarm.id = params["id"];
          });
          this.getAlarm()
    }

    //获取告警项
    getAlarm(){
        this.layoutService.show();
        this.service.getAlarm(this.alarm.id) 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.alarm=response["resultContent"].find((e)=>{return e.id ==this.alarm.id});
                        console.log(this.alarm)
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

    cancel(){
       this.location.back();
    }
    

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }

}
