import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { PhysicalMachineRouting } from './physical-machine-routing';

//component
import { PhysicalMachineListComponent } from './component/physical-machine-list.component';
import { PhysicalMachineOrderComponent } from './component/physical-machine-order.component';
import { PhysicalMachineDetailComponent } from './component/physical-machine-detail.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { PhysicalMachineOrderService } from './service/physical-machine-order.service'; 
import { PhysicalMachineListService } from './service/physical-machine-list.service'; 
import { PhysicalMachineDetailService } from './service/physical-machine-detail.service';

// import { MyDatePickerModule } from 'mydatepicker';

import { CountPartLengthPipe } from './pipe/countPartLength';



@NgModule({
    imports: [
        PhysicalMachineRouting,
        CommonComponentModule,
        CloudHostComponents,
        
        PipeModule
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        PhysicalMachineListComponent,
        CountPartLengthPipe,
        PhysicalMachineOrderComponent,
        PhysicalMachineDetailComponent,
    ],
    exports: [
    ],
    providers: [
        PhysicalMachineOrderService,

        PhysicalMachineListService,
        PhysicalMachineDetailService,
    ]

})
export class PhysicalMachineModule { }
