import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DialogTranslate } from '../service/dialog-translate.service';

@Component({
    selector: 'fc-confirm',
    templateUrl: '../template/confirm.component.html',
    inputs: ["title", "msg", "ot", "ct"]
})

export class ConfirmComponent implements OnInit {
    @Output() of = new EventEmitter<any>();
    @Output() cf = new EventEmitter<any>();

    param = { value: <String>'' };
    title: String;
    msg: String;

    constructor(private dialogTranslate: DialogTranslate) {
    }

    @ViewChild('dialog')
    dialog: ModalComponent;

    ngOnInit() {

    }

    ngOnChanges() {
        this.msg = this.dialogTranslate.getText(this.msg);
        this.param.value = this.dialogTranslate.getParam(this.msg);
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
        this.msg = this.dialogTranslate.getText(this.msg);
        this.param.value = this.dialogTranslate.getParam(this.msg);

        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }
}