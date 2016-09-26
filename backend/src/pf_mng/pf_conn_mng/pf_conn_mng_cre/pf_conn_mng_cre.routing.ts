import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PfConnMngCreComponent } from './component/pf_conn_mng_cre.component';


export const PfConnMngCreRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf_mng/pf_conn_mng/pf_conn_mng_cre',
        component: PfConnMngCreComponent
    }
]);