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

import { cloudHostDetailComponent } from './component/cloud-host-detail.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';

import { osVmOrderComponent } from './component/os-vm-order.component';
import { vwVmOrderComponent } from './component/vw-vm-order.component';
import { osVmListComponent } from './component/os-vm-list.component';
import { vwVmListComponent } from './component/vw-vm-list.component';
//service
import { cloudHostServiceOrder } from './service/cloud-host-order.service'; 
import { cloudHostServiceList } from './service/cloud-host-list.service'; 
import {cloudHostDetailService} from './service/cloud-host-detail.service';

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
        cloudHostDetailComponent,
        subAddStorageComponent,
        osVmOrderComponent,
        vwVmOrderComponent,
        osVmListComponent,
        vwVmListComponent
    ],
    exports: [
    ],
    providers: [
        cloudHostServiceOrder,
        cloudHostServiceList,
        cloudHostDetailService,
        subAddStorageComponent
    ]

})
export class VmInstanceModule { }
