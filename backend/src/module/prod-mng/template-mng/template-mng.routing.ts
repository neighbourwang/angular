import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemplateMngListComponent } from './components/template-mng-list.component'
import { DatabaseComponent } from './components/template-mng-database.component'
import { MiddlewareComponent } from './components/template-mng-middleware.component'


export const TemplateMngRouting:ModuleWithProviders=RouterModule.forChild([
    {
        path:'template-mng/template-list',
        component:TemplateMngListComponent
    },
    {
        path:'template-mng/template-database',
        component:DatabaseComponent
    },
    {
        path:'template-mng/template-middleware',
        component:MiddlewareComponent
    }
    
])
