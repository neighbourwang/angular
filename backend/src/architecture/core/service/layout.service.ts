import { Injectable } from "@angular/core";

@Injectable()
export class LayoutService {

    showHeader: boolean;
    private isLoading: boolean;

    constructor() {
        // this.showHeader = false;
        this.showHeader = true;
    }

    count = 0;

    get showLoading(): boolean {
        return this.isLoading;
    }

    setLoading(value: boolean) {
        if (value) {
            this.count++;
            this.isLoading = value;
        } else {
            this.count--;
            if (this.count === 0) {
                this.isLoading = value;
            }
        }
    }

    show() {
        this.count++;
        this.isLoading = true;
    }

    hide() {
        this.count--;
        if (this.count === 0) {
            this.isLoading = false;
        }
    }

}