/**
 * Created by junjie on 16/10/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClMngListComponent } from './component/cl-mng-list.component';
import { PfDetailComponent } from './component/pf-mng-detail.component';

import { ClMngCreStep1Component } from './component/cl-mng-cre-step-1.component';
import { ClMngCreStep2Component } from './component/cl-mng-cre-step-2.component';
import { ClMngCreStep3Component } from './component/cl-mng-cre-step-3.component';
import { ClMngCreStep4Component } from './component/cl-mng-cre-step-4.component';
import { ClMngCreStep5Component } from './component/cl-mng-cre-step-5.component';
import { ClMngCreStep6Component } from './component/cl-mng-cre-step-6.component';

export const ClMngRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: 'pf-mng2/cl-mng/cl-mng',
        component: ClMngListComponent
    },
    {
        path : 'pf-mng2/cl-mng/cre-step1',
        component : ClMngCreStep1Component
    },
    {
        path : 'pf-mng2/cl-mng/cre-step2',
        component : ClMngCreStep2Component
    },
    {
        path : 'pf-mng2/cl-mng/cre-step3',
        component : ClMngCreStep3Component
    },
    {
        path : 'pf-mng2/cl-mng/cre-step4',
        component : ClMngCreStep4Component
    },
    {
        path : 'pf-mng2/cl-mng/cre-step5',
        component : ClMngCreStep5Component
    },
    {
        path : 'pf-mng2/cl-mng/cre-step6',
        component : ClMngCreStep6Component
    },
    {
        path: 'pf-mng2/pf-mng-detail',
        component: PfDetailComponent
    },
    
]);
