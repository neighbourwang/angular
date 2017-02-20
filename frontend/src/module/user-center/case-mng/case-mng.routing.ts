 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CaseMngListComponent } from './component/case-mng-list.component.ts';

export const CaseMngRouting= RouterModule.forChild([
    {
        path: "user-center/case-mng/case-mng-list",
        component: CaseMngListComponent
    },
]);
