/**
 * Created by wangyao on 2016/10/21.
 */
import {Component, Input, Output,EventEmitter,OnInit} from '@angular/core';
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


    @Input()
    config:Config;


    @Output()
    output=new EventEmitter();

    ngOnInit (){
        console.log('init');

        this.value=this.config.default;
    }


    add() {
        // console.log(this.config);
        this.value<this.config.max&&(this.value += this.config.step);
        this.output.emit(this.value);
    }

    subtract() {
        this.value>this.config.min&&(this.value -= this.config.step);
        this.output.emit(this.value);
    }
    
}
