import { Component, OnInit, Input , Output, EventEmitter,ViewChild } from '@angular/core';
import { LayoutService, NoticeComponent, PopupComponent} from '../../../../architecture';
import { OpenConsoleService } from './open-console.service';


@Component({
	selector: 'open-console',
	templateUrl: './open-console.component.html'
})
export class OpenConsoleComponent implements OnInit {

    @Input() platformid: string = "";
    @Input() uuid: string = "";
    @Input() platformtype: string = "";

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    modalTitle: string = '';
    modalMessage: string = '';
    modalOKTitle: string = '';

    constructor(
        private layoutService: LayoutService,
        private service : OpenConsoleService
    ) { }

    ngOnInit() {
       
    }

	open() {
        let pathParams = [
            {
                key: 'platformid',
                value: this.platformid
            },
            {
                key: 'enterpriseId',
                value: this.service.userInfo.enterpriseId
            },
            {
                key: 'uuid',
                value: this.uuid
            }
        ];

        this.layoutService.show();
        this.service.getConsoleUrl(pathParams).then(res => {  
            if(this.platformtype === "0") {    //openstract直接打开
                window.open(res)
            }else if(this.platformtype === "2") {  //vmware 需要打开一个页面穿进去url
                window.localStorage["vmwControlUrl"] = res;
                window.open("/control.html");
            };
            this.layoutService.hide();
        }).catch(error => {
            this.layoutService.hide();
            this.showNotice("提示", "打开控制台失败!")
        })
    }

    modalAction(){}

    // 警告框相关
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}
