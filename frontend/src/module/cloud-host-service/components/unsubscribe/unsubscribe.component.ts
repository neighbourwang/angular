import { Component, OnInit, Input , Output, EventEmitter,ViewChild } from '@angular/core';
import { LayoutService, NoticeComponent, PopupComponent} from '../../../../architecture';
import { UnsubscribeService } from './unsubscribe.service';


@Component({
	selector: 'unsubscribe',
	templateUrl: './unsubscribe.component.html'
})
export class UnsubscribeComponent implements OnInit {

    @Output() onClick = new EventEmitter<any>();
    @Input() id: string = "";
    @Input() name: string = "";

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;
    @ViewChild('popup')
    private popup: PopupComponent;

    forceDelect: boolean = false;

    modalTitle: string = '';
    modalMessage: string = '';
    modalOKTitle: string = '';

    constructor(
        private layoutService: LayoutService,
        private service : UnsubscribeService
    ) { }

    ngOnInit() {
       
    }

    open() {
        $('#unsubscribe').modal('show');
        

    }

	delectVm() {  //退订云主机
        if( !this.id )  return this.showNotice("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST", "VM_INSTANCE.CHOOSE_HOST_UN");
        this.forceDelect = false;

        this.popup.open("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST");
    }
    popupCf(){}
    popupOf(){
        this.layoutService.show();
        this.service.deleteVm(this.id, this.forceDelect?1:0).then(res => {
            this.layoutService.hide();
            this.showNotice("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST", "VM_INSTANCE.ALREADY_STARTED_UN_PROCESS");
        }).catch(e => {
            this.layoutService.hide();
            this.showNotice("VM_INSTANCE.UNSUBSCRIBE_CLOUD_HOST", "退订失败");
        })
        this.popup.close();
    }

    modalAction(){};

    // 警告框相关
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}
