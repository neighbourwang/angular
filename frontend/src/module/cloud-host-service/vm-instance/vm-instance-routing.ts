import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cloudHostListComponent } from './component/cloud-host-list.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

import {cloudHostDetailComponent} from './component/cloud-host-detail.component';

export const VmInstanceRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-service/cloud-host-list',
        component: cloudHostListComponent
    },
    {
        path: 'cloud-host-service/cloud-host-order',
        component: cloudHostComponentOrder
    },
    {
        path: 'cloud-host-service/cloud-host-detail',
        component: cloudHostDetailComponent
    }
]);