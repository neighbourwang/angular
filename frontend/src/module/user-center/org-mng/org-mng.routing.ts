import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { OrgMngListComponent } from './component/org-mng-list.component';

export const OrgMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'org-mng/org-mng-list',
        component : OrgMngListComponent
    }
]);