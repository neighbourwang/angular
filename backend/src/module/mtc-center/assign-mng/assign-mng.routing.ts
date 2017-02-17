import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssignMngComponent} from './component/assign-mng.component';
import { AssignDetailComponent} from './component/assign-detail.component';

export const AssignMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'mtc-center/assign-mng/assign-mng',
        component: AssignMngComponent
    },
    {
        path: 'mtc-center/assign-mng/assign-detail',
        component: AssignDetailComponent
    }
    
]);