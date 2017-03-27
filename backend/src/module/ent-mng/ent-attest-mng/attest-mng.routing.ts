import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AttestMngComponent } from './component/attest-mng.component';
import { AttestSourceCreComponent } from './component/attest-source-cre.component';



export const AttestMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'attest-mng/attest-mng/:eid',
        component: AttestMngComponent
    },
    {
        path: 'attest-mng/attest-source-cre/:eid',
        component: AttestSourceCreComponent
    },
]);
