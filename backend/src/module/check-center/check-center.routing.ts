import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckMngListComponent } from './component/check-mng-list.component';

export const CheckCenterRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'check-center/check-mng-list',
        component: CheckMngListComponent
    }
    
]);