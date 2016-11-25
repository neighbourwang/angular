import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountMngComponent } from './component/account-mng-list.component';
import { AccountMngCrLocal } from './component/account-mng-cr-local.component';
import { AccountMngCrAd } from './component/account-mng-cr-ad.component';
import { AccountMngEditAd } from './component/account-mng-edit-ad.component';

export const AccountMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/account-mng/account-mng-list',
        component: AccountMngComponent
    },
    //编辑本地
    {
        path: 'user-center/account-mng/account-mng-cr-local/:id',
        component: AccountMngCrLocal
    },
    //编辑ad
    {
        path : 'user-center/account-mng/account-mng-edit-ad/:id',
        component: AccountMngEditAd
    },
    //创建本地
    {
        path: 'user-center/account-mng/account-mng-cr-local',
        component: AccountMngCrLocal
    },
    //创建ad
    {
        path : 'user-center/account-mng/account-mng-cr-ad',
        component : AccountMngCrAd
    }

]);
