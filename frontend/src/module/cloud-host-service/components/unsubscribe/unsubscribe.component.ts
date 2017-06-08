import { Component, OnInit, Input , Output, EventEmitter,ViewChild } from '@angular/core';
import { LayoutService, NoticeComponent, PopupComponent} from '../../../../architecture';
import { UnsubscribeService } from './unsubscribe.service';

import { Router } from '@angular/router';


@Component({
	selector: 'unsubscribe',
	templateUrl: './unsubscribe.component.html',
    styleUrls: ['./unsubscribe.less']
})
export class UnsubscribeComponent implements OnInit {

    @Input() subid: string = "";
    @Input() title: string = "退订";

    @Output() onerror = new EventEmitter();
    @Output() onSuccess = new EventEmitter();

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;
    @ViewChild('popup')
    private popup: PopupComponent;

    forceDelect: boolean = false;

    modalTitle: string = '';
    modalMessage: string = '';
    modalOKTitle: string = '';

    selectItemList:any = [];
    selectReleatedList:any = [];

    detail:any = {};
    orderList:any[] = [];

    state:"proceed"|"done" = "proceed";

    constructor(
        private layoutService: LayoutService,
        private service : UnsubscribeService,
        private router : Router
    ) { }

    ngOnInit() {
       
    }

    resetData() {
        this.state = "proceed";
        this.selectItemList = [];
        this.selectReleatedList = [];
        this.orderList = [];
        this.detail = {};
    }

    open() {
        if(!this.subid) {
            this.showNotice("提示", "未选择实例")
            return this.onerror.emit("sbuid is null");
        }
        
        this.resetData();
        this.layoutService.show();
        this.service.getOrderDetail(this.subid).then(detial => {
            // $('#unsubscribe').modal('show');
            this.popup.open(this.title);

            this.detail = detial;

            this.detail.itemList[0].instanceId = detial.instanceId;   //上面的退订服务默认全选 ， 退订最外层的instanceId
            this.detail.itemList.forEach(item => item.selected = true)
            this.layoutService.hide();
        }).catch(e => {
            this.layoutService.hide();
        })

    }

    get releatedList() {
        let detail = this.detail,
            type = detail.itemList[0].serviceType,
            list = [];

        switch (type) {
            case 0: list = detail.relatedSubInstanceList; break;  //云主机
            
            default: list = [];  break;
               
        }
        
        return list;
    }

    itemSelectChange(selectList) {
        this.selectItemList = selectList;
    }
    releatedSelectChange(selectList) {
        this.selectReleatedList = selectList;
    }

	
    startUnsubscribe(){
        if(this.state === "done") return this.popup.close();

        let selectList = [this.selectItemList[0], ...this.selectReleatedList];
        let instanceList = selectList.map(select => select.instanceId);

        if(!selectList.length) return; 
        this.layoutService.show();
        this.service.orderUnsubscribe(instanceList)
            .then(res => {
                this.layoutService.hide();
                this.getOrderList(res);
            })
            .catch(e => {
                this.layoutService.hide();
                this.showNotice("错误提示", "退订失败!")
            })
    }

    getOrderList(orderList) {
        this.layoutService.show();
        this.service.getOrderList(orderList)
            .then(res => {
                this.layoutService.hide();
                this.popup.open("退订成功");
                this.state = "done";
                this.onSuccess.emit(this)

                this.orderList = res.map(r => r.itemList[0]);
            })
            .catch(e => {
                this.layoutService.hide();
            })
    }
    // popupOf(){
    //     this.layoutService.show();
    //     this.service.deleteVm(this.id, this.forceDelect?1:0).then(res => {
    //         this.layoutService.hide();
    //         this.showNotice("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST", "VM_INSTANCE.ALREADY_STARTED_UN_PROCESS");
    //     }).catch(e => {
    //         this.layoutService.hide();
    //         this.showNotice("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST", "退订失败");
    //     })
    //     this.popup.close();
    // }

    modalAction(){};

    // 警告框相关
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }

}
