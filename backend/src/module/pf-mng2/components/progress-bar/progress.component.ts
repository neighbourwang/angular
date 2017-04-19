//use
import { Component, Input, Output, OnInit, ElementRef, ViewChild, OnChanges, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'progress-bar',
    template: `<div #el [@heroState]="state" (@heroState.start)="animationStarted($event)" style="position:relative;min-height:85px;width:100%">
                    <div  *ngIf="!display" style="transform:rotateX(180deg)">
                        <div class="row navigator-progress" >
                            <div class="col-md-3" [ngClass]="{'active':step>=1}"><span class="mark">1</span><span>{{"PF_MNG2.BASIC_INFO" | translate}}</span><span *ngIf="step>=2" class="icon-tick"></span></div>
                            <div class="col-md-3" [ngClass]="{'active':step>=2}"><span class="mark">2</span><span>{{"PF_MNG2.RESOURCE_SYNC" | translate}}</span><span *ngIf="step>=3" class="icon-tick"></span></div>
                            <div class="col-md-3" [ngClass]="{'active':step>=3}"><span class="mark">3</span><span>{{"PF_MNG2.AVAILABLE_ZONE_CONFIGURATION" | translate}}</span><span *ngIf="step>=4" class="icon-tick"></span></div>
                            <div class="col-md-3" [ngClass]="{'active':step>=4}"><span class="mark">4</span><span>{{"PF_MNG2.STORAGE_CONFIGURATION" | translate}}</span></div>
                        </div>
                        <div class="step-progress">
                            <div class="fox-cloud-progress-rectangle progress-striped">
                                <div class="progress-bar fox-cloud-progress-bar-rectangle" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                    [style.width.%]="100*step/4">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="display" >
                        <div  class="row navigator-progress">
                            <div class="col-md-2" [ngClass]="{'active':step>=1}"><span class="mark">1</span><span>{{"PF_MNG2.BASIC_INFO" | translate}}<!--基本信息--></span><span *ngIf="step>=2" class="icon-tick"></span></div>
                            <div class="col-md-2" [ngClass]="{'active':step>=2}"><span class="mark">2</span><span>{{"PF_MNG2.RESOURCE_SYNC" | translate}}<!--资源同步--></span><span *ngIf="step>=3" class="icon-tick"></span></div>
                            <div class="col-md-2" [ngClass]="{'active':step>=3}"><span class="mark">3</span><span>{{"PF_MNG2.AVAILABLE_ZONE_CONFIGURATION" | translate}}</span><span *ngIf="step>=4" class="icon-tick"></span></div>
                            <div class="col-md-2" [ngClass]="{'active':step>=4}"><span class="mark">4</span><span>{{"PF_MNG2.STORAGE_CONFIGURATION" | translate}}</span><span *ngIf="step>=5" class="icon-tick"></span></div>
                            <div class="col-md-2" [ngClass]="{'active':step>=5}"><span class="mark">5</span><span>{{"PF_MNG2.CLOUD_HOST_SPECIFICATIONS" | translate}}</span><span *ngIf="step>=6" class="icon-tick"></span></div>
                            <div class="col-md-2" [ngClass]="{'active':step>=6}"><span class="mark">6</span><span>{{"PF_MNG2.IMAGE_CONFIGURATION" | translate}}</span></div>
                        </div>
                        <div class="step-progress">
                            <div class="fox-cloud-progress-rectangle progress-striped">
                                <div class="progress-bar fox-cloud-progress-bar-rectangle" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
                                 [style.width.%]="100*step/6">
                                </div>
                            </div>
                        </div>
                    </div>             
                 </div>`,
    animations: [
        trigger('heroState', [
            state('4', style({
                transform: 'rotateX(180deg)'
            })),
            state('6', style({
                transform: 'rotateX(0)'
            })),
            transition("*<=> *", animate('500ms ease-out'))
        ])       
    ],
})
export class ProgressBarComponent implements OnInit, OnChanges {
    constructor(
        // private el:ElementRef,
    ) {

    }
    @Input() state: string = "6"; //状态
    @Input() step: number ; //步骤
    @ViewChild('el') el: ElementRef;    
    ngOnInit() { }
    display:boolean=true;
    ngOnChanges(values) {       

    }
    animationStarted(e){
        if (this.state == '4') {
           setTimeout(()=>this.display=false,e.totalTime/3)
        } else {
           setTimeout(()=>this.display=true,e.totalTime/3)
        }
    }
}
