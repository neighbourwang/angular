import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, NoticeComponent, PaginationComponent, ConfirmComponent, SystemDictionary, SystemDictionaryService } from '../../../../architecture';

import { Attest } from '../model/attest.model';

@Component({
    selector: 'attest-mng',
    templateUrl: '../template/attest-mng.component.html',
    styleUrls: [],
    providers: []
})
export class AttestMngComponent implements OnInit {
    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private layoutService: LayoutService,
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
    totalPage = 1;
    pageSize = 20;
    attests: Attest[];
    statusDic: Array<SystemDictionary>;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    ngOnInit() {
        this.dicService.getItems("USER", "STATUS")
            .then((dic) => {
                this.statusDic = dic;
                this.getAttests();
            })
    }

    getAttests() {

    }

    onCreate() {
        this.gotoEditPage("create");
    }

    onEdit() {
        this.gotoEditPage("edit");
    }

    onEditAcc() {
        this.gotoEditPage("editAcc");
    }

    gotoEditPage(type) {
        this.router.navigate(['user-center/attest-mng/attest-source-cre', {"type":type}]);
    }

    updateStatus(type: string) {
        
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }

    ccf() {

    }
}