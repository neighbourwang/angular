import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CloudHostRouting } from './frontend/prod_and_svc/cloud_host/cloud_host.routing';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pf-mng/svc-dir-mng/svc-dir-mng',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);