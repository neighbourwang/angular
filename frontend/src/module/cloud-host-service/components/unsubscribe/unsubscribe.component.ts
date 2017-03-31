import { Component, OnInit, Input , Output, EventEmitter,ViewChild } from '@angular/core';
import { LayoutService, NoticeComponent, PopupComponent} from '../../../../architecture';
import { UnsubscribeService } from './unsubscribe.service';


@Component({
	selector: 'unsubscribe',
	templateUrl: './unsubscribe.component.html',
    styleUrls: ['./unsubscribe.less']
})
export class UnsubscribeComponent implements OnInit {

    @Input() subid: string = "";
    @Input() title: string = "退订";
    @Input() name: string = "退订";

    @Output() onerror = new EventEmitter();

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

    detail:any;

    constructor(
        private layoutService: LayoutService,
        private service : UnsubscribeService
    ) { }

    ngOnInit() {
       
    }

    open() {
        if(!this.subid) return this.onerror.emit("sbuid is null");

        this.layoutService.show();
        this.service.getOrderDetail(this.subid).then(detial => {
            $('#unsubscribe').modal('show');
            console.log(detial)
            this.detail = detial;
            this.detail.itemList[0].instanceId = detial.instanceId;
            this.detail.itemList[0].selected = true;
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
        console.log(selectList)
        this.selectItemList = selectList;
    }
    releatedSelectChange(selectList) {
         console.log(selectList)
        this.selectReleatedList = selectList;
    }

	
    startUnsubscribe(){
        console.log(this.selectItemList, this.selectReleatedList)
        let selectList = [...this.selectItemList, ...this.selectReleatedList];
        let instanceList = selectList.map(select => select.instanceId);

        this.layoutService.show();
        this.service.orderUnsubscribe(instanceList)
            .then(res => {
                this.layoutService.hide();
                console.log(res)
            })
            .catch(e => {
                this.layoutService.hide();
                this.showNotice("错误提示", "退订失败!")
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
