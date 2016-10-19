import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntAdminCreComponent } from './component/ent-admin-cre.component';
import { EntAdminMngComponent } from './component/ent-admin-mng.component';
import { EntAdminCreADComponent } from './component/ent-admin-cre-ad.component';

export const EntAdminMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-mng/:id',
        component: EntAdminMngComponent
    },
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-cre/enterprise/:eid/id/:aid',
        component: EntAdminCreComponent
    },
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-cre/enterprise/:eid',
        component: EntAdminCreComponent
    },
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-cre-AD/enterprise/:eid/id/:aid',
        component: EntAdminCreADComponent
    },
    {
        path: 'ent-mng/ent-admin-mng/ent-admin-cre-AD/enterprise/:eid',
        component: EntAdminCreADComponent
    }
]);