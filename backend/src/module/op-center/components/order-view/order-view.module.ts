import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';



//component
import {ServiceViewComponent
        ,MachineViewComponent
        ,SqlViewComponent
        ,VmViewComponent
        ,DiskViewComponent
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
        ,VmViewComponent
        ,DiskViewComponent
       
    ],
    exports: [
        ServiceViewComponent
        ,MachineViewComponent
        ,SqlViewComponent
        ,VmViewComponent
        ,DiskViewComponent
    ],
    providers: []

})
export class OrderViewModule { }