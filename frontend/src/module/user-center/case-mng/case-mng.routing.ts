 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CaseMngListComponent } from './component/case-mng-list.component.ts';
 import { CaseDepartListComponent } from './component/case-depart-list.component.ts';

export const CaseMngRouting= RouterModule.forChild([
    {
        path: "case-mng/case-mng-list",
        component: CaseMngListComponent
    },
    {
        path: "case-mng/case-depart-list",
        component: CaseDepartListComponent
    },
]);
