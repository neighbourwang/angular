import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { OrgMngListComponent } from './component/org-mng-list.component'; 
import { OrgMngCrComponent } from './component/org-mng-cr.component'

export const OrgMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'org-mng/org-mng-list',
        component : OrgMngListComponent
    },
    //创建
    {
        path : 'org-mng/org-mng-cr',
        component : OrgMngCrComponent
    },
    //编辑
    {
        path : 'org-mng/org-mng-cr/:id',
        component : OrgMngCrComponent
    }
    
]);
