import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pf-mng2/cl-mng/cl-mng',
        pathMatch: 'full'
    },
	// ent-mng
    { path: 'ent-mng', loadChildren: 'module/ent-mng/ent-mng.module#EntMngModule' },
    // pf-mng2
    { path: 'pf-mng2', loadChildren: 'module/pf-mng2/pf-mng2.module#PfMngModule2' },
	//prod-mng
    { path: 'prod-mng', loadChildren: 'module/prod-mng/main-prod-mng.module#MainProdMngModule' },
    { path: 'ent-mng/ent-prod-mng', loadChildren: 'module/ent-mng/ent-prod-mng/ent-prod-mng.module#EntProdMngModule' },
    //user-center
    { path: 'user-center', loadChildren: 'module/user-center/user-center.module#UserCenterModule' },
    //op-center
    { path: 'op-center/order-mng', loadChildren: 'module/op-center/order-mng/order-mng.module#OrderMngModule' },
    //cost-set
    { path: 'op-center/cost-set', loadChildren: 'module/op-center/cost-set/cost-set.module#CostSetModule' },
    //check center
    { path: 'check-center', loadChildren: 'module/check-center/check-center.module#CheckCenterModule' },
    //net-mng
    { path: 'net-mng', loadChildren: 'module/net-mng/net-mng.module#NetMngModule' },
    //phy-pool
    { path: 'phy-mng', loadChildren: 'module/phy-mng/phy-mng.module#PhyMngModule' },
    //host-mng
    { path: 'host-mng', loadChildren: 'module/host-mng/host-mng.module#HostMngModule' },
    //mtc-center
    { path: 'mtc-center', loadChildren: 'module/mtc-center/mtc-center.module#MtcCenterModule' },
    // sys-setup
    { path: 'sys-setup', loadChildren: 'module/sys-setup/sys-setup.module#SysSetupModule' },
    //ali-cloud
    { path: 'ali-cloud', loadChildren: 'module/ali-cloud/ali-cloud.module#AliCloudModule' },
    //testutil
    { path: 'testutil', loadChildren: 'module/testutil/testutil.module#TestUtilModule'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
