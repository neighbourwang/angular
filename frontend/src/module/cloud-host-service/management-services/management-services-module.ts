import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { ManagementServicesRouting } from './management-services-routing';

//component
// import { ManagementServicesListComponent } from './component/management-services-list.component';
import { ManagementServicesOrderComponent } from './component/management-services-order.component';
// import { ManagementServicesDetailComponent } from './component/management-services-detail.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { ManagementServicesOrderService } from './service/management-services-order.service'; 
// import { ManagementServicesListService } from './service/management-services-list.service'; 
// import { ManagementServicesDetailService } from './service/management-services-detail.service';

// import { MyDatePickerModule } from 'mydatepicker';

import { CountPartLengthPipe } from './pipe/countPartLength';



@NgModule({
    imports: [
        ManagementServicesRouting,
        CommonComponentModule,
        CloudHostComponents,
        
        PipeModule
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        // ManagementServicesListComponent,
        CountPartLengthPipe,
        ManagementServicesOrderComponent,
        // ManagementServicesDetailComponent,
    ],
    exports: [
    ],
    providers: [
        ManagementServicesOrderService,

        // ManagementServicesListService,
        // ManagementServicesDetailService,
    ]

})
export class ManagementServicesModule { }
