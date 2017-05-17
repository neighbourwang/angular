import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';



//component
import {ServiceViewComponent
        ,MachineViewComponent
         } from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule
    ],
    declarations: [
        // VmViewComponent
        // ,DiskViewComponent
        ServiceViewComponent
        ,MachineViewComponent
       
    ],
    exports: [
        ServiceViewComponent
        ,MachineViewComponent
    ],
    providers: []

})
export class OrderViewModule { }