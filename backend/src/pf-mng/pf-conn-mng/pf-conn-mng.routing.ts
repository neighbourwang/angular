import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PfConnMngComponent } from './component/pf-conn-mng.component';
import { PfCreStep01Component } from './component/pf-cre-step-01.component';
import { PfCreStep02Component } from './component/pf-cre-step-02.component';
import { PfCreStep03Component } from './component/pf-cre-step-03.component';
import { PfCreStep04Component } from './component/pf-cre-step-04.component';
import { PfCreStep05Component } from './component/pf-cre-step-05.component';
import { PfCreStep06Component } from './component/pf-cre-step-06.component';

export const PfConnMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf-mng/pf-conn-mng/pf-conn-mng',
        component: PfConnMngComponent
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-01/:platform-id',
        component: PfCreStep01Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-02',
        component: PfCreStep02Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-03',
        component: PfCreStep03Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-04',
        component: PfCreStep04Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-05',
        component: PfCreStep05Component
    },
    {
        path: 'pf-mng/pf-conn-mng/pf-cre-step-06',
        component: PfCreStep06Component
    }
]);