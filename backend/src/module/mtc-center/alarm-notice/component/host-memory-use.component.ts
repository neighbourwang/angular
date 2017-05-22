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
    selecteReceiver:Array<Receiver>;

    ngOnInit (){
        console.log('init');
        this.activeRoute.params.forEach((params: Params) => {
            this.alarm.itemId = params["id"];
          });
          this.getReceiverList()
            .then(() => {
                this.getAlarm().then(
                    () => {
                        for (var i = this.alarm.receiver.length - 1; i >= 0; i--) {
                        let a= this.receiverList.find((e)=>{return e.name ==this.alarm.receiver[i].name});
                        if(a){
                            a.isSelect=true;
                        }
                    }
                });              
                              
            });        
    }

    alarmName=["虚拟机CPU平均使用率","虚拟机内存平均使用率"];
    isName:boolean;

    //获取告警项
    getAlarm():Promise<any>{
        this.layoutService.show();
        return this.service.getAlarm(this.alarm.itemId) 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        // this.alarm=response["resultContent"].find((e)=>{return e.itemId == this.alarm.itemId});
                        this.alarm=response["resultContent"];
                        console.log(this.alarm.name)
                        this.alarm.threshold[0]&& (this.threshold1=this.alarm.threshold[0]); 
                        this.alarm.threshold[1]&&(this.threshold2=this.alarm.threshold[1]);
                        if(this.alarmName.find((e)=>{return e==this.alarm.name})){
                            this.isName=true;
                            // this.threshold1.symbol=">";     
                            // this.threshold2.symbol="<";  
                            // this.threshold1.content="1";  
                            // this.threshold2.content="2";                     
                        }
                        else {
                            this.isName=false;
                            // this.threshold1.symbol="<"; 
                            // this.threshold2.symbol="<";
                            // this.threshold1.level="1";   
                            // this.threshold2.level="2";
                        }
                        console.log("isName",this.isName)
                        console.log("条件1",this.threshold1,this.alarm.threshold,this.alarm.threshold[0])
                        console.log("条件2",this.threshold2)
                        console.log("接收人",this.alarm.receiver)
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e)); 
    }

   //获取接收人列表
      getReceiverList():Promise<any>{
        this.layoutService.show();
       return this.service.getReceivers() 
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
        if( this.isName==false && this.threshold2.value <= this.threshold1.value){
            this.showAlert("条件2输入的数值必须大于条件1");
            return;
        }
        if( this.isName==true &&this.threshold1.value <= this.threshold2.value){
            this.showAlert("条件2输入的数值必须小于条件1");
            return;
        }
        this.alarm.threshold=[this.threshold1,this.threshold2];
        this.alarm.receiver=[];
        this.receiverList.forEach(
            item => {
                if (item.isSelect) {
                    this.alarm.receiver.push(item);
                    
                }
            });
            console.log("修改后的接收人",this.alarm.receiver)
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
     isSelectedAll= false;
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
