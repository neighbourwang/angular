/**
 * Created by wangyao on 2016/10/21.
 */
//use
//<count-bar [stepCheck]=true [step]=100 [max]=200000 [min]=0 [disabled]=false [value]=0 (output)="outputValue($event)></count-bar>
import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';
@Component({
    selector: 'count-bar',
    template: `
               <div class="btn-group input-step-compontent" style="width: 130px;">  
                    <button type="button" class="btn btn-default col-md-3" [ngClass]="{'clickable':value != min}" (click)="subtract()" [disabled]="disabled || value == min"><span class="glyphicon glyphicon-minus"></span></button>
                    <input type="text" class="form-control" (change)="valueChange($event)" [(ngModel)]="value" name="editValue" #box [disabled]="disabled">
                    <button type="button" class="btn btn-default" (click)="add()" [ngClass]="{'clickable':value != max}" [disabled]="disabled || value == max"><span class="glyphicon glyphicon-plus"></span></button>
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
    decimal:boolean=false;//小数
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
        console.log(!this.decimal);
        this.value=this.value?this.value:this.min;
        if(!this.decimal)this.value=parseInt(this.value+'',10); //取整
        if(Number.isNaN(this.value))this.value=this.min;
        const beyond = (this.value - this.min)%this.step;
        if(this.stepCheck && beyond !== 0)  this.value = (this.step/2 <= beyond) ? this.value - beyond + this.step : this.value - beyond;   //检测是否输入了非步长倍数的数字
        this.value = +this.value > +this.max ? +this.max : +this.value < +this.min ? +this.min : +this.value;
        // if(!this.decimal)this.value=Math.ceil(this.value); //取整
        this.output.emit(this.value);  
        console.log(!this.value);
             
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

