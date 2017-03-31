import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
 import { AliCloudMianAccountList } from './component/ali-cloud-mainAccount-list.component';


export const AliCloudRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ali-cloud_mainAccount-list',
        component: AliCloudMianAccountList
    },
    // {
    //     path: 'check-mng-hascheck',
    //     component: CheckMngHascheckComponent
    // }, 
    // {
    //     path: 'check-mng-set',
    //     component: CheckMngSetComponent
    // }
    
    
]);