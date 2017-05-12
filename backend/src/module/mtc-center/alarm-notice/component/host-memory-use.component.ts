import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,Params,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';
import{ AlarmListModel,Threshold,Receiver} from '../model/alarm-list.model';
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

    threshold1:Threshold=new Threshold();
    threshold2:Threshold=new Threshold();
    alarm:AlarmListModel=new AlarmListModel();
    receiverList:Array<Receiver>;

    big:string=">";
    bigger:string=">=";
    small:string="<";
    smaller:string="<=";
    ngOnInit (){
        console.log('init');
        this.activeRoute.params.forEach((params: Params) => {
            this.alarm.itemId = params["id"];
          });
          this.getAlarm();
    }

    alarmName=["平台存储实际分配率","平台存储分配率","虚拟机CPU平均使用率","虚拟机内存平均使用率"];
    isName=false;

    //获取告警项
    getAlarm(){
        this.layoutService.show();
        this.service.getAlarm(this.alarm.itemId) 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.alarm=response["resultContent"].find((e)=>{return e.itemId ==this.alarm.itemId});
                        console.log(this.alarm.name)
                        this.threshold1=this.alarm.threshold[0];
                        this.threshold2=this.alarm.threshold[1];
                        if(this.alarmName.find((e)=>{return e==this.alarm.name})){
                            this.isName=true;
                            console.log("isName",this.isName)
                        }
                        console.log("条件1",this.threshold1)
                        console.log("条件2",this.threshold2)
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

   //获取接收人列表
      getReceiverList(){
        this.service.getReceivers() 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.receiverList=response["resultContent"];
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

    //保存
    save(){
        if(this.threshold2.value < this.threshold1.value){
            this.showAlert("条件2输入的数值必须大于条件1");
            return;
        }
        this.alarm.threshold=[this.threshold1,this.threshold2];
        this.layoutService.show();
        this.service.update(this.alarm) 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.gotolist();
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

    selectReceiver(id:number){
        this.receiverList[id].isSelect= 
                  this.receiverList[id].isSelect ==true? false:true;

    }

    //全选
     isSelectedAll: boolean = false;
    selectAll(){
        this.isSelectedAll = !this.isSelectedAll;
        this.receiverList.forEach((e)=>e.isSelect=this.isSelectedAll);
    }

   gotolist(){       
        this.router.navigate([`mtc-center/alarm-notice/alarm-notice-list`]);
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
