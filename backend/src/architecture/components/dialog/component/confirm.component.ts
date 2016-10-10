import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'fc-confirm',
    templateUrl: '../template/confirm.component.html',
    inputs: ["title", "msg", "ot", "ct"]
})

export class ConfirmComponent implements OnInit {
    @Output() of = new EventEmitter<any>();
    @Output() cf = new EventEmitter<any>();

    title: String;
    msg: String;

    @ViewChild('dialog')
    private dialog: ModalComponent;

    ngOnInit() {
    }

    cof() {
        this.of.emit();
    }

    ccf() {
        this.cf.emit();
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