import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CloudHostModule } from './prod_and_svc/cloud_host/cloud_host.module';

function loadSubModule(): any {
  return CloudHostModule;
}


export const FrontendRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod_and_svc',
        // loadChildren: './prod_and_svc/cloud_host/cloud_host.module#CloudHostModule'
        loadChildren: loadSubModule
    }
]);