import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent } from './component/order-mng-detail.component';
@NgModule({
    imports: [
        CommonComponentModule,
        OrderMngRouting
    ],
    declarations: [
        OrderMngDetailComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }