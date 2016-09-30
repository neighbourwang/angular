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

    @ViewChild('dialog')
    dialog: ModalComponent;

    ngOnInit() {
    }

    cof() {
        this.of.emit();
    }

    ccf() {
        this.cf.emit();
    }

    open() {
        this.dialog.open();
    }

    clase() {
        this.dialog.close();
    }
}