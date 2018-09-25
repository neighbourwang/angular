import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortMngComponent } from './component/port-mng.component';
import { PortMngSetComponent } from './component/port-mng-set.component';

export const VMPortMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'vm-mng-dbt/port-mng',
        component: PortMngComponent
    },
    {
        path: 'vm-mng-dbt/port-mng-set',
        component: PortMngSetComponent
    },
]);
