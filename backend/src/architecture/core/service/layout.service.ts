import { Injectable } from "@angular/core";

@Injectable()
export class LayoutService {

    showHeader: boolean;
    private isLoading: boolean;

    constructor() {
        // this.showHeader = false;
        this.showHeader = true;
    }

    showTimer: any;
    hideTimer: any;
    delay = 100;
    count = 0;

    get showLoading(): boolean {
        return this.isLoading;
    }

    //setLoading(value: boolean) {
    //    if (value) {
    //        this.count++;
    //        this.isLoading = value;
    //    } else {
    //        this.count--;
    //        if (this.count <= 0) {
    //            this.count = 0;
    //            this.isLoading = value;
    //        }
    //    }
    //}

    show() {
        this.count++;
        this.hideTimer && window.clearTimeout(this.hideTimer);
        this.showTimer = window.setTimeout(() => {
                this.isLoading = true;
            },
            this.delay);
    }

    hide() {
        this.count--;
        this.showTimer && window.clearTimeout(this.showTimer);
        //当所有loadin都完成关闭loading;
        if (this.count <= 0) {
            this.count = 0;
            this.hideTimer = window.setTimeout(() => {
                    this.isLoading = false;
                },
                this.delay);

        }
    }

}