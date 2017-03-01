//use
//<count-bar [stepCheck]=true [step]=100 [max]=2000000 [min]=0 [disabled]=false [value]=0 (output)="outputValue($event)></count-bar>

import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';
@Component({
    selector: 'table-edit-name',
    templateUrl: '../template/tableEditName.component.html',
    styleUrls: [ '../style/tableEditName.component.less' ]
})
export class TableEditNameComponent implements OnInit{
    constructor() {

    }
    @Input() value:string;
    @Output() onChange=new EventEmitter();
    @Output() nameOnClick=new EventEmitter();

    show : boolean = false;
    inputValue : string = "";

    ngOnInit (){
        this.inputValue = this.value;
    }
    change() {
        if(!this.inputValue) return ;
        this.value = this.inputValue;
        this.onChange.emit(this.value);
    }
}
