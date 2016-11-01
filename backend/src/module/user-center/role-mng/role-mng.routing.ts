import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { RoleMngListComponent } from './component/role-mng-list.component';


export const RoleMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/role-mng/role-mng-list',
        component: RoleMngListComponent
    }
]);
