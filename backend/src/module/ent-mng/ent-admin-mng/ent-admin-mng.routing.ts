import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntAdminCreComponent } from './component/ent-admin-cre.component';
import { EntAdminMngComponent } from './component/ent-admin-mng.component';

export const EntAdminMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-mng',
        component: EntAdminMngComponent
    },
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-cre',
        component: EntAdminCreComponent
    }
]);