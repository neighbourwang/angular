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
        ,MiddleWareViewComponent
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
        ,MiddleWareViewComponent
       
    ],
    exports: [
        ServiceViewComponent
        ,MachineViewComponent
        ,SqlViewComponent
        ,VmViewComponent
        ,DiskViewComponent
        ,MiddleWareViewComponent
    ],
    providers: []

})
export class OrderViewModule { }