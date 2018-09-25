import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { AccountMngListComponent } from './component/account-mng-list.component'; 

export const AccountMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'account-mng/account-mng-list',
        component : AccountMngListComponent
    }

]);