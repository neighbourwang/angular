/**
 * Created by wangyao on 2016/10/21.
 */
import { Component, Input,Output } from '@angular/core';
//配置数据
import {Config} from '../config/Config';
@Component({
    selector: 'count-bar',
    templateUrl: '../template/count-bar.component.html',
    // inputs: ["title", "msg", "ot", "ct"]
})
export class CountBarComponent{
    constructor(){

    }
    
    @Input()
    config:Config;

    
    add(){
        console.log(this.config);
        this.config.value+=this.config.step;
    }
    subtract(){
        this.config.value-=this.config.step;
    }
}