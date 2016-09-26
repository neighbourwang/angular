import { Injectable } from '@angular/core';

@Injectable()
export class LayoutService {
    
    showHeader: boolean;
    private isLoading: boolean;
    
    constructor() {
        // this.showHeader = false;
        this.showHeader = true;
    }

    get showLoading():boolean {
        return this.isLoading;
    }

    setLoading(value: boolean) {
        this.isLoading = value;
    }

}
