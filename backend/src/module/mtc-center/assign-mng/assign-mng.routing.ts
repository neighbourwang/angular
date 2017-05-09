import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssignMngComponent} from './component/assign-mng.component';
import { AssignDetailComponent} from './component/assign-detail.component';
import { AssignMngDetailComponent} from './component/assign-mng-detail.component';

export const AssignMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'assign-mng/assign-mng',
        component: AssignMngComponent
    },
    {
        path: 'assign-mng/assign-detail',
        component: AssignDetailComponent
    },
    {
        path: 'assign-mng/assign-mng-detail',
        component: AssignMngDetailComponent
    },
]);