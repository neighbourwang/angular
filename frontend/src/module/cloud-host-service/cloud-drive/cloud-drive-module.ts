import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { CloudDriveRouting } from './cloud-drive-routing';

//component
import { cloudDriveListComponent } from './component/cloud-drive-list.component';

import { cloudDriveComponentOrder } from './component/cloud-drive-order.component';

//service
import { cloudDriveServiceOrder } from './service/cloud-drive-order.service'; 
import { cloudDriveServiceList } from './service/cloud-drive-list.service'; 

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CloudDriveRouting,
        CommonComponentModule,
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
