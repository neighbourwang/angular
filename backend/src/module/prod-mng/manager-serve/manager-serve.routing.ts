import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerServeServiceCreComponent } from './components/manager-serve-service-cre.component';
import { ManagerServeProdCreStep1Component } from './components/manager-serve-prod-cre-step1.component'
import { ManagerServeProdCreStep2Component } from './components/manager-serve-prod-cre-step2.component'
import { ManagerServeProdCreStep3Component } from './components/manager-serve-prod-cre-step3.component'
import { ManagerServeProdCreStep4Component } from './components/manager-serve-prod-cre-step4.component'

export const  ManagerServeRouting:ModuleWithProviders=RouterModule.forChild([
    {
        path:'manager-serve/manager-serve-service-cre',
        component:ManagerServeServiceCreComponent
    },
    {
        path:'manager-serve/manager-serve-product-cre-step1',
        component:ManagerServeProdCreStep1Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step2',
        component:ManagerServeProdCreStep2Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step3',
        component:ManagerServeProdCreStep3Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step4',
        component:ManagerServeProdCreStep4Component
    }
]);