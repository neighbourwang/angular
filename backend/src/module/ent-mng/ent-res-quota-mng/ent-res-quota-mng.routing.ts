import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntResQuotaMngComponent } from './component/ent-res-quota-mng.component';
import { EntResQuotaCreComponent } from './component/ent-res-quota-cre.component';

export const EntResQuotaMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-mng/ent-res-quota-mng/ent-res-quota-mng',
        component: EntResQuotaMngComponent
    },
    {
        path: 'ent-mng/ent-res-quota-mng/ent-res-quota-cre',
        component: EntResQuotaCreComponent
    }
]);