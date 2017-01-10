import { Component, ViewChild, EventEmitter, Input, Output, OnInit } from "@angular/core";

import { ModalComponent } from "ng2-bs3-modal/ng2-bs3-modal";
import { DialogTranslate } from '../service/dialog-translate.service';

@Component({
    selector: "fc-popup",
    templateUrl: "../template/popup.component.html",
    inputs: ["title", "ot", "ct", "enableOKButton"],
    styleUrls: ["../style/StyleSheet.less"],
    providers: [DialogTranslate]
})
export class PopupComponent implements OnInit {
    @Output()
    of = new EventEmitter<any>();
    @Output()
    cf = new EventEmitter<any>();

    param: any;
    title: String;
    showTitle: String;
    enableOKButton:boolean =true;


    constructor(private dialogTranslate: DialogTranslate) {

    }

    @ViewChild("dialog")
    private dialog: ModalComponent;

    ngOnInit() {
        this.enableOKButton = true;
    }

    ngOnChanges() {
        this.param = this.dialogTranslate.getParam(this.title);
        this.showTitle = this.dialogTranslate.getText(this.title);
    }
    cof() {
        this.of.emit();
    }

    ccf() {
        this.cf.emit();
    }

    open(title?: String, msg?: String) {
        title && (this.title = title);
        this.param = this.dialogTranslate.getParam(this.title);
        this.showTitle = this.dialogTranslate.getText(this.title);

        this.dialog.open();
    }

    close() {
        this.dialog.close();
    }
}