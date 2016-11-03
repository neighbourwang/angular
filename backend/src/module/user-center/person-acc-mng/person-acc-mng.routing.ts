import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PersonAccMngComponent } from './component/person-acc-mng.component';
import { PersonAccEditComponent } from './component/person-acc-edit.component';



export const PersonAccMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/person-acc-mng/person-acc-mng',
        component: PersonAccMngComponent
    },
    {
        path: 'user-center/person-acc-mng/person-acc-edit',
        component: PersonAccEditComponent
    },
]);
