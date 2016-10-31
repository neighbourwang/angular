/**
 * Created by wangyao on 2016/10/21.
 */
import {Component, Input, Output,EventEmitter,OnChanges,SimpleChange,OnInit} from '@angular/core';
//配置数据
import {Config} from '../config/Config';
@Component({
    selector: 'count-bar',
    templateUrl: '../template/count-bar.component.html',
    // inputs: ["title", "msg", "ot", "ct"]
})
export class CountBarComponent implements OnInit{
    constructor() {

    }
    value:number;
//     Config:{
//     default:number;
//     step:number;
//     min:number;
//     max:number;
//     disabled:boolean;
//     name:string
// }

    @Input()
    config:Config;  


    @Output()
    output=new EventEmitter();
//     changeLog:string[]=[];
//      ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
//     let log: string[] = [];
//     for (let propName in changes) {
//       let changedProp = changes[propName];
//       let from = JSON.stringify(changedProp.previousValue);
//       let to =   JSON.stringify(changedProp.currentValue);
//       log.push( `${propName} changed from ${from} to ${to}`);
//     }
//     this.changeLog.push(log.join(', '));
//   }

    ngOnInit (){
        console.log('init');

        this.value=this.config.default;
        // this.config.disabled=true;
    }
    add() {
        // console.log(this.config);
        if(!this.config.disabled){
            console.log(this.config)
            this.value<this.config.max&&(this.value += this.config.step);
            this.output.emit(this.value);
        }        
    }

    subtract() {        
        if(!this.config.disabled){
            console.log(this.config)
            this.value>this.config.min&&(this.value -= this.config.step);
            this.output.emit(this.value);
        }
    }
    unEdit(){
        this.value=0;
        this.config.disabled=true;
    }
    editable(){
        this.config.disabled=false;
    }
    inputValue(value){
        console.log(value);
        (value>this.config.min && value<this.config.max)&&(this.output.emit(value))        
    }
    
}
