import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { RoleMngListComponent } from './component/role-mng-list.component';
import { RoleMngDetailComponent } from './component/role-mng-detail.component';


export const RoleMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/role-mng/role-mng-list',
        component: RoleMngListComponent
    },
    {
        path: 'user-center/role-mng/role-mng-detail/:id',
        component: RoleMngDetailComponent
    }
]);
