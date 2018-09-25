import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VmwareImgListComponent } from './component/vmware-img-list.component';
import { VmwareImgSyncComponent } from './component/vmware-img-sync.component';
import { VmwareImgEntSetupComponent } from './component/vmware-img-ent-setup.component';


export const VmwareMngRouting = RouterModule.forChild([
    {
        path: 'img-mng/vmware-img-list/:platformId',
        component: VmwareImgListComponent
    },
    {
        path : 'img-mng/vmware-img-sync/:platformId',
        component : VmwareImgSyncComponent
    },
    {
        path : 'img-mng/vmware-img-ent-setup/:platformId',
        component : VmwareImgEntSetupComponent
    }
]);

