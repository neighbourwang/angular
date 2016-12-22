import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'fc-notice',
    templateUrl: '../template/notice.component.html',
    inputs: ["title", "msg", "ot"]
})

export class NoticeComponent implements OnInit {
    @Output() of = new EventEmitter<any>();

    param = { value: '' };
    title: String;
    msg: String;
    msgText: String;
    msgParam: any;

    @ViewChild('dialog')
    dialog: ModalComponent;

    ngOnInit() {
    }

    ngOnChanges() {
        this.msgText = this.msg.split('^^^')[0];
        this.msgParam = this.msg.split('^^^')[1];
        this.msg = this.msgText;
        this.param.value = this.msgParam;
    }

    nof() {
        this.of.emit();
    }

    open(title?: String, msg?: String) {
        title && (this.title = title);
        msg && (this.msg = msg);
        this.msgText = this.msg.split('^^^')[0];
        this.msgParam = this.msg.split('^^^')[1];
        this.msg = this.msgText;
        this.param.value = this.msgParam;

        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }
}