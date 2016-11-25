import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { CloudDriveRouting } from './cloud-drive-routing';

//component
import { cloudDriveListComponent } from './component/cloud-drive-list.component';

import { cloudDriveComponentOrder } from './component/cloud-drive-order.component';
import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { cloudDriveServiceOrder } from './service/cloud-drive-order.service'; 
import { cloudDriveServiceList } from './service/cloud-drive-list.service'; 

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CloudDriveRouting,
        CommonComponentModule,
        PipeModule,
        CloudHostComponents
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        cloudDriveListComponent,
        cloudDriveComponentOrder
    ],
    exports: [
    ],
    providers: [
        cloudDriveServiceOrder,
        cloudDriveServiceList
    ]

})
export class CloudDriveModule { }
