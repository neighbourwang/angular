import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VmwareImgListComponent } from './component/vmware-img-list.component';
import { VmwareImgSyncComponent } from './component/vmware-img-sync.component';

export const VmwareMngRouting = RouterModule.forChild([
    {
        path: 'host-mng/img-mng/vmware-img-list/:platformId',
        component: VmwareImgListComponent
    },
    {
        path : 'host-mng/img-mng/vmware-img-sync/:platformId',
        component : VmwareImgSyncComponent
    }
]);
