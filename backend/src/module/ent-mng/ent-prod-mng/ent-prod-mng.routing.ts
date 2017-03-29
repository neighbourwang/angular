import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';



import { EntProdMngComponent } from './component/ent-prod-mng.component';
import { EntProdCre01Component } from './component/ent-prod-cre-01.component';
import { EntProdCre02Component } from './component/ent-prod-cre-02.component';
import { EntProdCre03Component } from './component/ent-prod-cre-03.component';

export const EntProdMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-prod-mng',
        component: EntProdMngComponent
    },{
	    path: 'ent-prod-cre-01',
        component: EntProdCre01Component
    },{
	    path: 'ent-prod-cre-02',
        component: EntProdCre02Component
    },{
	    path: 'ent-prod-cre-03',
        component: EntProdCre03Component
    }
]);