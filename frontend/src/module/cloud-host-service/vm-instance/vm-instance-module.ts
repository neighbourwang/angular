import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { cloudHostListComponent } from './component/cloud-host-list.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

import { subAddStorageComponent } from './component/sub-add-storage.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';


//service
import { cloudHostServiceOrder } from './service/cloud-host-order.service'; 
import { cloudHostServiceList } from './service/cloud-host-list.service'; 


// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule,
        CloudHostComponents,
        PipeModule
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        cloudHostListComponent,
        cloudHostComponentOrder,
        subAddStorageComponent
    ],
    exports: [
    ],
    providers: [
        cloudHostServiceOrder,
        cloudHostServiceList,
        subAddStorageComponent
    ]

})
export class VmInstanceModule { }
