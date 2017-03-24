import {Component, Input, Output,EventEmitter,OnInit} from '@angular/core';

import { ValidationRegs, Validation} from '../validators';
@Component({
    selector: 'tag-input',
    templateUrl: "./tagInput.template.html",
    styleUrls: ["./tagInput.component.less"]
})
export class tagInputComponent implements OnInit{
    constructor(
        private v:Validation
    ) {};

    @Input()   datas:string[]=[];

    @Output()  onAdd=new EventEmitter(); 
    @Output()  onRemove=new EventEmitter();
    @Output()  onDatasChanged=new EventEmitter();
    @Output()  onSelect=new EventEmitter();
    @Output()  onTextChange=new EventEmitter();
    @Output()  onBlur=new EventEmitter();

    tagtext: string = "";


    ngOnInit (){
    }
    
    add() {
        let tagtext = this.tagtext;
        this.tagtext = "";

        if(this.datas.indexOf(tagtext) > -1 || tagtext === "") return;   //如果数组里面有 直接返回
        this.datas.push(tagtext);

        this.onAdd.emit(this.datas);
        this.onDatasChanged.emit(this.datas);
    }
    delete(text) {
        this.datas = this.datas.filter(data => data !== text);
        
        this.onRemove.emit(text);
        this.onDatasChanged.emit(this.datas);
    }

    checkForm(key?:string) {
        let regs:ValidationRegs = {  //regs是定义规则的对象
            tagtext: [this.tagtext, [this.v.isBase, this.v.notEqualToArr(this.datas)], "tags填写不正确"], 
        }
        return this.v.check(key, regs);
    }

    private inputKeyup(e){
        if(e.code !== "Enter") return;

        this.add();
    }

    private buttonSelect(text) {
        this.onSelect.emit(text)
    }
    private inputBlur() {
        this.onBlur.emit(this.tagtext)
    }
    private inputChange() {
        this.checkForm("tagtext");
        this.onTextChange.emit(this.tagtext)
    }
}
