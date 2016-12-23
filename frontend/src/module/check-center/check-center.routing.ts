import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckMngListComponent } from './component/check-mng-list.component';
import { CheckMngHascheckComponent } from './component/check-mng-hascheck.component';
import { CheckMngSetComponent } from './component/check-mng-set.component';


export const CheckCenterRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'check-center/check-mng-list',
        component: CheckMngListComponent
    }, {
        path: 'check-center/check-mng-hascheck',
        component: CheckMngHascheckComponent
    }, {
        path: 'check-center/check-mng-set',
        component: CheckMngSetComponent
    }  
]);