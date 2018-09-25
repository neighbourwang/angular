import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CapacityMngComponent} from './component/capacity-mng.component';
import { ComputeResComponent} from './component/compute-res.component';
import { StoreResComponent} from './component/store-res.component';
import { StoreDetailComponent} from './component/store-detail.component';
import { HostDetailComponent} from './component/host-detail.component';

export const CapacityMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'capacity-mng/capacity-mng',
        component: CapacityMngComponent
    },
    {
        path: 'capacity-mng/compute-res',
        component: ComputeResComponent
    },
    {
        path: 'capacity-mng/store-res',
        component: StoreResComponent
    },
     {
        path: 'capacity-mng/store-detail',
        component: StoreDetailComponent
    },
     {
        path: 'capacity-mng/host-detail',
        component: HostDetailComponent
    }
]);