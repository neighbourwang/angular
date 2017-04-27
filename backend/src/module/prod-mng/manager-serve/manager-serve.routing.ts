import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ManagerServeServiceCreComponent } from './components/manager-serve-service-cre.component';

export const  ManagerServeRouting:ModuleWithProviders=RouterModule.forChild([
    {
        path:'manager-serve/manager-serve-service-cre',
        component:ManagerServeServiceCreComponent
    }
]);