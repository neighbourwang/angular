/**
 * Created by wangyao on 2016/10/21.
 */
//use
//<count-bar [default]=0 [step]=100 [max]=200000 [min]=0 [disabled]=false [value]=0 (output)="outputValue($event)></count-bar>
import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';
@Component({
    selector: 'count-bar',
    template: `<div class="countBar">
               <span class="glyphicon glyphicon-minus font-gray" [ngClass]="{gray:disabled}" (click)="subtract()"></span>
               <input type="text" class="font-gray" [(ngModel)]="value" name="editValue" #box (blur)="inputValue(box.value)" [disabled]="disabled">
               <span class="glyphicon glyphicon-plus font-gray" (click)="add()" [ngClass]="{gray:disabled}"></span>
               </div>
               `,
    // inputs: ["title", "msg", "ot", "ct"]
})
export class CountBarComponent implements OnInit{
    constructor() {

    }
    @Input()
    default:number;
    @Input()
    min:number;
    @Input()
    max:number;
    @Input()
    step:number;
    @Input()
    disabled:boolean;
    @Input()
    value:number;
    @Output()
    output=new EventEmitter();
    ngOnInit (){
        // console.log('init');
        // this.value=this.config.default;
        // this.config.disabled=true;
    }
    add() {
        // console.log(this.config);
        this.value=Number(this.value); 
        if(!this.disabled){
            console.log(this)
            this.value<this.max&&(this.value += this.step);
            this.output.emit(this.value);
        }        
    }
    subtract() {
        this.value=Number(this.value);        
        if(!this.disabled){
            console.log(this)
            this.value>this.min&&(this.value -= this.step);
            this.output.emit(this.value);
        }
    }
    unEdit(){
        this.value=0;
        this.output.emit(this.value)
        this.disabled=true;
    }
    editable(){
        this.disabled=false;
    }
    inputValue(value){
        console.log(value);
        (value>this.min && value<this.max)&&(this.output.emit(value))        
    }    
}
