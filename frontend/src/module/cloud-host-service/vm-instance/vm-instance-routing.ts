import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cloudVmComponentOrder } from './component/cloud-host-order.component';
import { cloudHostListComponent } from './component/cloud-host-list.component';
import {cloudHostDetailComponent} from './component/cloud-host-detail.component';

export const VmInstanceRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-list',
        component: cloudHostListComponent
    },
    {
        path: 'cloud-host-order',
        component: cloudVmComponentOrder
    },
    {
        path: 'cloud-host-detail/:itemId',
        component: cloudHostDetailComponent
    }
]);