import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import{ AlarmListModel} from '../model/alarm-list.model';

//service
import { AlarmNoticeListService } from '../service/alarm-notice-list.service';

@Component({
    selector: 'alarm-notice-list',
    templateUrl: '../template/alarm-notice-list.html',
    styleUrls: [],
    providers: []
})

export class AlarmNoticeListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AlarmNoticeListService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    alarmList:Array<AlarmListModel>;
    alarm:AlarmListModel=new AlarmListModel();

    @ViewChild("notice")
    notice: NoticeComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();
        this.getAlarmList();
    }

    //获取列表
    getAlarmList(){
         this.layoutService.show();
        this.service.getAlarmList() 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.alarmList=response["resultContent"];
                        console.log(this.alarmList);
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

     //选取告警项
     getSelectAlarm(alarm: AlarmListModel) {
        this.alarmList.forEach((e) => {
            e.isSelect = false;
        });
        alarm.isSelect= true;
    }


    gotoSet(){
        const alarm=this.alarmList.find((e)=>{return e.isSelect});
        console.log(alarm)
        if(!alarm){
            this.showAlert("ALARM.PLEASE_SELECT_ALARM");
            return;
        }
        this.router.navigate([`mtc-center/alarm-notice/host-memory-use`,{id:alarm.itemId}]);
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
