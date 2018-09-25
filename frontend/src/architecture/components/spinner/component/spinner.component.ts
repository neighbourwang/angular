import {Component, Input, OnDestroy} from '@angular/core';

@Component({
    selector: 'fc-spinner',
    templateUrl: '../template/spinner.component.html',
    styleUrls: [
        '../style/spinner.component.css'
    ]
})
export class SpinnerComponent implements OnDestroy {  
    private currentTimeout: any;
    private isLoading: boolean = false;

    @Input()
    public delay: number = 300;

    @Input()
    public set isRunning(value: boolean) {
        this.isLoading = value;
    }

    ngOnDestroy(): any {
        this.isLoading = false;
    }
}