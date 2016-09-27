import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DirectoryComponent } from './svc_dir_mng/component/directory.component';

export const SvcDirMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf_mng/svc_dir_mng/svc_dir_mng',
        component: DirectoryComponent
    }
]);