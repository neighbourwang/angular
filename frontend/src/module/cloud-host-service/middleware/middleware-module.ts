import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { MiddlewareRouting } from './middleware-routing';

//component
// import { MiddlewareListComponent } from './component/middleware-list.component';

import { MiddlewareComponentOrder } from './component/middleware-order.component';


// import { MiddlewareDetailComponent } from './component/middleware-detail.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { MiddlewareServiceOrder } from './service/middleware-order.service'; 
// import { MiddlewareServiceList } from './service/middleware-list.service'; 
// import {MiddlewareDetailService} from './service/middleware-detail.service';

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        MiddlewareRouting,
        CommonComponentModule,
        CloudHostComponents,
        
        PipeModule
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        // MiddlewareListComponent,
        // MiddlewareDetailComponent,
        MiddlewareComponentOrder
    ],
    exports: [
    ],
    providers: [
        MiddlewareServiceOrder,
        // MiddlewareServiceList,
        // MiddlewareDetailService,
    ]

})
export class MiddlewareModule { }
