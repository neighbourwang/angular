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
        path: 'pf_mng/svc_dir_mng/svc_dir_mng',
        component: DirectoryComponent
    },
    {
        path: 'pf_mng/svc_dir_mng/svc_dir_cre_step_01',
        component: SvcDirCreStep1Component
    },
    {
        path: 'pf_mng/svc_dir_mng/svc_dir_cre_step_02',
        component: SvcDirCreStep2Component
    },
    {
        path: 'pf_mng/svc_dir_mng/svc_dir_cre_step_03',
        component: SvcDirCreStep3Component
    },
    {
        path: 'pf_mng/svc_dir_mng/svc_dir_cre_step_04',
        component: SvcDirCreStep4Component
    }
]);