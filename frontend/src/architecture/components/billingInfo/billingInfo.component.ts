//use

import {Component, Input, Output,EventEmitter,OnInit} from '@angular/core';

import { BillingInfoService} from './billingInfo.service';
import { BillingInfo } from './billingInfo.model';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../architecture';

@Component({
    selector: 'billing-info',
    template: `<ng-content></ng-content>`
})
export class BillingInfoComponent implements OnInit{
    constructor(
            private service:BillingInfoService,
        ) {}

    @Input() billingInfo:BillingInfo;
   

    ngOnInit (){
    }
   
}
