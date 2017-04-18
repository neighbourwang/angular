import {Component, ViewChild, OnInit } from "@angular/core";
import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent} from "../../../../architecture";

@Component({
    selector:"mng-service-list",
    templateUrl:"../template/servicelist.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceListComponent implements OnInit{
    constructor(){
        
    }
    ngOnInit() {
    }
}