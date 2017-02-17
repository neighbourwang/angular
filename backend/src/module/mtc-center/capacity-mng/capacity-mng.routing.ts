import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CapacityMngComponent} from './component/capacity-mng.component';
import { ComputeResComponent} from './component/compute-res.component';
import { StoreResComponent} from './component/store-res.component';
import { StoreDetailComponent} from './component/store-detail.component';
import { HostDetailComponent} from './component/host-detail.component';

export const CapacityMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'mtc-center/capacity-mng/capacity-mng',
        component: CapacityMngComponent
    },
    {
        path: 'mtc-center/capacity-mng/compute-res',
        component: ComputeResComponent
    },
    {
        path: 'mtc-center/capacity-mng/store-res',
        component: StoreResComponent
    },
     {
        path: 'mtc-center/capacity-mng/store-detail',
        component: StoreDetailComponent
    },
     {
        path: 'mtc-center/capacity-mng/host-detail',
        component: HostDetailComponent
    }
]);