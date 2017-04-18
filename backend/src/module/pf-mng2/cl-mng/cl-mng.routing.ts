/**
 * Created by junjie on 16/10/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClMngListComponent } from './component/cl-mng-list.component';
import { PfDetailComponent } from './component/pf-mng-detail.component';
import { bootDiskMngComponent } from './component/pf-mng-bootDisk.component';
import { bootDiskCreEditComponent } from './component/pf-mng-bootDisk-creEdit.component';
import { CloudHostSpecComponent } from './component/pf-mng-cloudHostSpec.component';


import { ClMngCreStep1Component } from './component/cl-mng-cre-step-1.component';
import { ClMngCreStep2Component } from './component/cl-mng-cre-step-2.component';
import { ClMngCreStep3Component } from './component/cl-mng-cre-step-3.component';
import { ClMngCreStep4Component } from './component/cl-mng-cre-step-4.component';
import { ClMngCreStep5Component } from './component/cl-mng-cre-step-5.component';
import { ClMngCreStep6Component } from './component/cl-mng-cre-step-6.component';

//desktop cloud
 import { DeskCloudCreStep2Component } from './component/desk-cloud-cre-step2.component';
 import { DeskCloudCreStep3Component } from './component/desk-cloud-cre-step3.component';
 import { DeskCloudCreStep4Component } from './component/desk-cloud-cre-step4.component';

export const ClMngRouting:ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cl-mng/cl-mng',
        component: ClMngListComponent
    },
    {
        path : 'cl-mng/cre-step1',
        component : ClMngCreStep1Component
    },
    {
        path : 'cl-mng/cre-step2',
        component : ClMngCreStep2Component
    },
    {
        path : 'cl-mng/cre-step3',
        component : ClMngCreStep3Component
    },
    {
        path : 'cl-mng/cre-step4',
        component : ClMngCreStep4Component
    },
    {
        path : 'cl-mng/cre-step5',
        component : ClMngCreStep5Component
    },
    {
        path : 'cl-mng/cre-step6',
        component : ClMngCreStep6Component
    },
    {
        path : 'cl-mng/desk-cloud-cre-step2',
        component : DeskCloudCreStep2Component
    },
    {
        path : 'cl-mng/desk-cloud-cre-step3',
        component : DeskCloudCreStep3Component
    },
    {
        path : 'cl-mng/desk-cloud-cre-step4',
        component : DeskCloudCreStep4Component
    },
    {
        path: 'pf-mng-detail',
        component: PfDetailComponent
    },
    {
        path: 'pf-mng-bootDisk',
        component: bootDiskMngComponent
    },
    {
        path: 'pf-mng-bootDisk-creEdit',
        component: bootDiskCreEditComponent
    },
    {
        path: 'pf-mng-cloudHostSpec',
        component:CloudHostSpecComponent
    },
    
    
    
]);
