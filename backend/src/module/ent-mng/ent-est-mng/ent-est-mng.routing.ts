import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EntEstMngComponent } from './component/ent-est-mng.component';
import { EntEstCreStep01Component } from './component/ent-est-cre-step-01.component';
import { EntEstCreStep04Component } from './component/ent-est-cre-step-04.component';
import { EntEstCreComponent } from './component/ent-est-cre.component';
import { EntEstSetProdComponent } from './component/ent-est-setProd.component';
import { EntEstCheckComponent } from './component/ent-est-check.component';
export const EntEstMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-mng/ent-est-mng/ent-est-mng',
        component: EntEstMngComponent
    }
    ,{
    	path: 'ent-mng/ent-est-mng/ent-est-cre-step-01',
    	component: EntEstCreStep01Component
    }
    ,{
    	path: 'ent-mng/ent-est-mng/ent-est-cre-step-04'
    	,component: EntEstCreStep04Component
    },{
    	path: 'ent-mng/ent-est-mng/ent-est-cre'
    	,component: EntEstCreComponent
    },{
    	path: 'ent-mng/ent-est-mng/ent-est-setProd'
    	,component: EntEstSetProdComponent
    },{
    	path: 'ent-mng/ent-est-mng/ent-est-check'
    	,component: EntEstCheckComponent
    }
]);