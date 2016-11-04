import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttestMngComponent } from './component/attest-mng.component';
import { AttestSourceCreComponent } from './component/attest-source-cre.component';



export const AttestMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/attest-mng/attest-mng',
        component: AttestMngComponent
    },
    {
        path: 'user-center/attest-mng/attest-source-cre/:id/:type',
        component: AttestSourceCreComponent
    },
]);
