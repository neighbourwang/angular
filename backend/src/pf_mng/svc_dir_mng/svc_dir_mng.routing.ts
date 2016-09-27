import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DirectoryComponent } from './svc_dir_mng/component/directory.component';

import { SvcDirCreStep1Component } from './svc_dir_cre_step/component/step1.component';
import { SvcDirCreStep2Component } from './svc_dir_cre_step/component/step2.component';
import { SvcDirCreStep3Component } from './svc_dir_cre_step/component/step3.component';
import { SvcDirCreStep4Component } from './svc_dir_cre_step/component/step4.component';

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