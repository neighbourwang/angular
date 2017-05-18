import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';



//component
import {ServiceViewComponent
        ,MachineViewComponent
        ,SqlViewComponent
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
        ,SqlViewComponent
       
    ],
    exports: [
        ServiceViewComponent
        ,MachineViewComponent
        ,SqlViewComponent
    ],
    providers: []

})
export class OrderViewModule { }