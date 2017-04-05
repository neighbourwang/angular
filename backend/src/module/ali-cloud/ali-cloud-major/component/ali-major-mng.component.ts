import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model

//service
import { AliMajorMngService} from '../service/ali-major-mng.service'

@Component({
    selector: 'ali-major-mng',
    templateUrl: '../template/ali-cloud.html',
    styleUrls: [],
    providers: []
})

export class AliMajorMngComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliMajorMngService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();


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
