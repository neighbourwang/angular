import {Component, OnInit, Input, Output, OnChanges} from'@angular/core';


@Component({
    selector:'fc-selectbox',
    templateUrl:'../template/selectbox.component.html',
    inputs: ["selectedList","unSelectedList","titleL","titleR","displayKey"],
    styleUrls: ['../style/selectbox.less'],
})

export class SelectboxComponent implements OnInit, OnChanges{
    selectedList:Array<any>;
    unSelectedList:Array<any>;
    displayKey:string;

    ngOnInit(){
    }
    ngOnChanges() {

    }
    //选择企业
    select(entity, index) {
        this.selectedList.push(entity);
        this.unSelectedList.splice(index,1);
    }
    //
    unSelect(entity, index){
        this.unSelectedList.push(entity);
        this.selectedList.splice(index,1);
    }
   
    

}