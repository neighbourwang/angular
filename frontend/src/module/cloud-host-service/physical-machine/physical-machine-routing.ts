import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { PhysicalMachineOrderComponent } from './component/physical-machine-order.component';
// import { PhysicalMachineListComponent } from './component/physical-machine-list.component';

// import {PhysicalMachineDetailComponent} from './component/physical-machine-detail.component';

export const PhysicalMachineRouting: ModuleWithProviders = RouterModule.forChild([
    // {
    //     path: 'physical-machine-list',
    //     component: PhysicalMachineListComponent
    // },
    {
        path: 'physical-machine-order',
        component: PhysicalMachineOrderComponent
    },
    // {
    //     path: 'physical-machine-detail',
    //     component: PhysicalMachineDetailComponent
    // }
]);