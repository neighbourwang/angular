import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PersonAccMngComponent } from './component/person-acc-mng.component';

export const PersonAccMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/person-acc-mng/person-acc-mng',
        component: PersonAccMngComponent
    }   
]);
