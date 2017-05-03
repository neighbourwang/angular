import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatabaseMiddlewareServiceCreComponent } from './components/database-middleware-service-cre.component';
import { DatabaseMiddlewareProdCreStep1Component } from './components/database-middleware-prod-cre-step1.component'
import { DatabaseMiddlewareProdCreStep2Component } from './components/database-middleware-prod-cre-step2.component'
import { DatabaseMiddlewareProdCreStep3Component } from './components/database-middleware-prod-cre-step3.component'
import { DatabaseMiddlewareProdCreStep4Component } from './components/database-middleware-prod-cre-step4.component'

export const  DatabaseMiddlewareRouting:ModuleWithProviders=RouterModule.forChild([
    {
        path:'manager-serve/manager-serve-service-cre',
        component:DatabaseMiddlewareServiceCreComponent
    },
    {
        path:'manager-serve/manager-serve-product-cre-step1',
        component:DatabaseMiddlewareProdCreStep1Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step2',
        component:DatabaseMiddlewareProdCreStep2Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step3',
        component:DatabaseMiddlewareProdCreStep3Component
    },
    {
        path:'manager-serve/manager-serve-product-cre-step4',
        component:DatabaseMiddlewareProdCreStep4Component
    }
]);