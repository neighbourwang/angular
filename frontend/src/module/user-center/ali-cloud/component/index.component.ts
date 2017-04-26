import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService,ValidationRegs, NoticeComponent , ConfirmComponent,} from '../../../../architecture';

//service
import { AliIndexService } from '../service/index.service';

@Component({
    selector: 'ali-index',
    templateUrl: '../template/index.html',
    styleUrls: [],
    providers: []
})

export class AliIndexComponent implements OnInit{

    constructor(
        private router : Router,
        private service : AliIndexService,
        private layoutService : LayoutService
    ) {

    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";

    ngOnInit (){
        console.log('init');
        this.getType();
    }

    getType(){
        this.layoutService.show();
        this.service.getType()
            .then(
                response => {
                    this.layoutService.hide();
                    console.log(response);
                    if (response && 100 == response["resultCode"]) {
                        if(response.resultContent == 2){
                            this.router.navigate([`user-center/ali-cloud/ali-shared-list`]);
                        }else{
                            this.router.navigate([`user-center/ali-cloud/ali-major-list`]);
                        }
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            ) .catch((e) => this.onRejected(e));

    }

    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.FAILED_TO_GET_DATA");
    }
}
