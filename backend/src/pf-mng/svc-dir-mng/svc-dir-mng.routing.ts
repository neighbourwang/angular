import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { 
    DirectoryComponent,
    SvcDirCreStep1Component,
    SvcDirCreStep2Component,
    SvcDirCreStep3Component,
    SvcDirCreStep4Component
} from './component';

export const SvcDirMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf-mng/svc-dir-mng/svc-dir-mng',
        component: DirectoryComponent
    },
    {
        path: 'pf-mng/svc-dir-mng/svc-dir-cre-step-01',
        component: SvcDirCreStep1Component
    },
    {
        path: 'pf-mng/svc-dir-mng/svc-dir-cre-step-02',
        component: SvcDirCreStep2Component
    },
    {
        path: 'pf-mng/svc-dir-mng/svc-dir-cre-step-03',
        component: SvcDirCreStep3Component
    },
    {
        path: 'pf-mng/svc-dir-mng/svc-dir-cre-step-04',
        component: SvcDirCreStep4Component
    }
]);