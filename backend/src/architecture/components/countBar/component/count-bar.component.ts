/**
 * Created by wangyao on 2016/10/21.
 */
//use
//<count-bar [stepCheck]=true [step]=100 [max]=200000 [min]=0 [disabled]=false [value]=0 [decimal]=true (output)="outputValue($event)></count-bar>
import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';
@Component({
    selector: 'count-bar',
    template: `<div class="countBar " [ngClass]="{valueError:valueError}">
               <span class="glyphicon glyphicon-minus font-gray" [ngClass]="{gray:disabled || value == min}" (click)="subtract()"></span>
               <input type="text" class="font-gray "  [(ngModel)]="value" name="editValue" #box (change)="valueChange($event)" [disabled]="disabled">
               <span class="glyphicon glyphicon-plus font-gray" (click)="add()" [ngClass]="{gray:disabled || value == max}"></span>
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
    min:number = -Number.MAX_VALUE;
    @Input()
    max:number = Number.MAX_VALUE;
    @Input()
    step:number = 1;
    @Input()
    disabled:boolean = false;
    @Input()
    value:number = 0;
    @Input()
    stepCheck:boolean = false;   //强制开启step检测 手动输入的时候不允许输入不是step倍数的数字
    @Input()
    valueError:boolean=false; //数据非法样式
    @Input()
    decimal:boolean=false;//小数默认整数，输入true时四舍五入保留两位小数
    @Output()
    output=new EventEmitter();

    unValid:boolean=false;
    ngOnInit (){
    }
    add() {
        if(!this.disabled){
            this.value = +this.value + +this.step;
        this.valueChange();
        }
        
    }
    subtract() {
        if(!this.disabled){
            this.value = this.value - this.step;
        this.valueChange();
        }      
    }
    valueChange(){
        this.value=this.value?this.value:this.min;
        if(!this.decimal)this.value=parseInt(this.value+'',10); //取整
        if(Number.isNaN(this.value))this.value=this.min;
        const beyond = (this.value - this.min)%this.step;
        if(this.stepCheck && beyond !== 0)  this.value = (this.step/2 <= beyond) ? this.value - beyond + this.step : this.value - beyond;   //检测是否输入了非步长倍数的数字
        this.value = +this.value > +this.max ? +this.max : +this.value < +this.min ? +this.min : +this.value;
        if(this.decimal){
            this.value=Number((this.value).toFixed(2));
        }; //取整
        this.output.emit(this.value); 
             
    }
    unEdit(){
        this.value=this.min;
        this.output.emit(this.value)
        this.disabled=true;
    }
    editable(){
        this.disabled=false;
    }   
}

