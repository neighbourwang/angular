import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { CloudDriveRouting } from './cloud-drive-routing';

//component
import { cloudDriveListComponent } from './component/cloud-drive-list.component';
import { osDiskOrderComponent } from './component/os-disk-order.component';
import { vwDiskOrderComponent } from './component/vw-disk-order.component';
import { osDiskListComponent } from './component/os-disk-list.component';
import { vwDiskListComponent } from './component/vw-disk-list.component';

import { cloudDriveComponentOrder } from './component/cloud-drive-order.component';
import { subTableListComponent } from './component/sub-table-list.component';
import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { cloudDriveServiceOrder } from './service/cloud-drive-order.service'; 
import { cloudDriveServiceList } from './service/cloud-drive-list.service'; 
import { SubTableListService } from './service/sub-table-list.service'; 

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
        cloudDriveComponentOrder,
        subTableListComponent,
        osDiskOrderComponent,
        vwDiskOrderComponent,
        osDiskListComponent,
        vwDiskListComponent
    ],
    exports: [
    ],
    providers: [
        cloudDriveServiceOrder,
        cloudDriveServiceList,
        subTableListComponent,
        SubTableListService
    ]

})
export class CloudDriveModule { }
