import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IpMngListComponent } from './component/ip-mng-list.component';

export const IpMngRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: 'net-mng/ip-mng',
        component: IpMngListComponent
    },
    {
        path : 'pf-mng2/cl-mng/cre-step6',
        component : IpMngListComponent
    }
]);
