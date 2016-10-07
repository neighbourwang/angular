import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PfConnMngComponent } from './component/pf-conn-mng.component';
import { PfConnCreStep01Component } from './component/pf-conn-cre-step-01.component';
import { PfConnCreStep02Component } from './component/pf-conn-cre-step-02.component';
import { PfConnCreStep03Component } from './component/pf-conn-cre-step-03.component';
import { PfConnCreStep04Component } from './component/pf-conn-cre-step-04.component';
import { PfConnCreStep05Component } from './component/pf-conn-cre-step-05.component';
import { PfConnCreStep06Component } from './component/pf-conn-cre-step-06.component';

export const PfConnMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-mng',
        component: PfConnMngComponent
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-01',
        component: PfConnCreStep01Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-02',
        component: PfConnCreStep02Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-03',
        component: PfConnCreStep03Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-04',
        component: PfConnCreStep04Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-05',
        component: PfConnCreStep05Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-cre-step-06',
        component: PfConnCreStep06Component
    }
]);