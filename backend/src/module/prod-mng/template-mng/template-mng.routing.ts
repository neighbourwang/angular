import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TemplateMngListComponent } from './components/template-mng-list.component'
import { TemplateMngCreComponent } from './components/template-mng-cre.component'


export const TemplateMngRouting:ModuleWithProviders=RouterModule.forChild([
    {
        path:'template-mng/template-list',
        component:TemplateMngListComponent
    },
    {
        path:'template-mng/template-cre',
        component:TemplateMngCreComponent
    }
    
])
