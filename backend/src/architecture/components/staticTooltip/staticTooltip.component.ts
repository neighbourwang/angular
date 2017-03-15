//use
import {Component,Input,Output,OnInit,ElementRef,ViewChild,OnChanges} from '@angular/core';

@Component({
    selector: 'static-tooltip',
    template: `
               <span #el data-toggle="tooltip" data-placement="top" title="" [ngClass]="className"><ng-content></ng-content></span>
               `,
})
export class StaticTooltipComponent implements OnInit,OnChanges{
    constructor() {

    }
    @Input() placement:"top"|"left"|"bottom"|"right" = "top";  //弹出的方向
    @Input() title:string = ""; //弹出的内容
    @Input() className:string = "";  //classn名称

    @ViewChild('el') el:ElementRef;

    ngOnInit (){}
    ngOnChanges (values){
        $(this.el.nativeElement)
            .attr('title', this.title)
            .data("placement", this.placement)
            .data("html", true)
            .tooltip('fixTitle')
            .tooltip();
    }
  
}
