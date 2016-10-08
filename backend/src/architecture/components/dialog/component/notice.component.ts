import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'fc-notice',
    templateUrl: '../template/notice.component.html',
    inputs: ["title", "msg", "ot"]
})

export class NoticeComponent implements OnInit {
    @Output() of = new EventEmitter<any>();

    title: String;
    msg: String;

    @ViewChild('dialog')
    dialog: ModalComponent;

    ngOnInit() {
    }

    nof() {
        this.of.emit();
    }

    open(title?: String, msg?: String) {
        title && (this.title = title);
        msg && (this.msg = msg);

        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }
}