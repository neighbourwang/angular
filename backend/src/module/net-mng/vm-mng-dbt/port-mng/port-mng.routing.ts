import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortMngComponent } from './component/port-mng.component';
import { PortMngSetComponent } from './component/port-mng-set.component';

export const VMPortMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'net-mng/vm-mng-dbt/port-mng',
        component: PortMngComponent
    },
    {
        path: 'net-mng/vm-mng-dbt/port-mng-set/:id',
        component: PortMngSetComponent
    },
]);
