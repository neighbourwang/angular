 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AlarmNoticeListComponent } from './component/alarm-notice-list.component';
 import { HostMemoryUseComponent } from './component/host-memory-use.component';

export const AlarmNoticeRouting= RouterModule.forChild([
    {
        path: "alarm-notice/alarm-notice-list",
        component: AlarmNoticeListComponent
    },
    {
        path: "alarm-notice/host-memory-use",
        component: HostMemoryUseComponent
    },
]);
