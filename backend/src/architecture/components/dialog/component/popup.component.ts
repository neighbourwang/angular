import { Component, ViewChild, EventEmitter, Input, Output, Renderer, ElementRef } from "@angular/core";

@Component({
    selector: 'fc-popup'
    ,template:`<div class="modal fade" #popupCmp tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <!--header-->
                      <div class="modal-header" class="fox-cloud-modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                      </div>

                      <!--content-->
                     <div class="modal-body fox-cloud-modal-body"> 
                        <ng-content></ng-content>
                    </div>
                      
                      <!-- footer -->
                      <div class="modal-footer fox-cloud-modal-footer" style="text-align: center;">
                          <button class="fox-cloud-button-lg fox-cloud-button-white" data-dismiss="modal" (click)="cancel()">
                            <span class="icon-button-label">{{ct}}</span><!-- 取消 -->
                        </button>
                        <button class="fox-cloud-button-lg fox-cloud-button-white" (click)="accept()" style="margin-left: 30px">
                            <span class="icon-button-label">{{ot}}</span><!-- 确认 -->
                        </button>
                      </div>
                  </div>
              </div>
        </div>`
})
export class PopupComponent {
    @Input()
    private title:string = "系统";//标题
    @Input()
    private ct:string = "取消";//取消
    @Input()
    private ot:string = "确认";//确认
    @Output()
    private cf = new EventEmitter<any>();//取消处理
    @Output()
    private of = new EventEmitter<any>();//确认处理
    @ViewChild('popupCmp')
    private popupCmp:ElementRef;

    constructor(element:ElementRef, renderer: Renderer)
    {
        console.log('render', renderer, 'element', element);
    }
    private cancel(){
        this.cf.emit();
    }

    private accept(){
        this.of.emit();
    }

    open(title?:string)
    {
        title && (this.title = title);
        $(this.popupCmp.nativeElement).modal('show');
    }

    close(){
        $(this.popupCmp.nativeElement).modal('hide');
    }
}