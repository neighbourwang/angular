import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { osVmOrderComponent } from './component/os-vm-order.component';
import { vwVmOrderComponent } from './component/vw-vm-order.component';
import { osVmListComponent } from './component/os-vm-list.component';
import { vwVmListComponent } from './component/vw-vm-list.component';

import {cloudHostDetailComponent} from './component/cloud-host-detail.component';

export const VmInstanceRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'vw-vm-list',
        component: vwVmListComponent
    },
    {
        path: 'vw-vm-order',
        component: vwVmOrderComponent
    },
    {
        path: 'cloud-host-list',
        component: osVmListComponent
    },
    {
        path: 'cloud-host-order',
        component: osVmOrderComponent
    },
    {
        path: 'cloud-host-detail/:itemId',
        component: cloudHostDetailComponent
    }
]);