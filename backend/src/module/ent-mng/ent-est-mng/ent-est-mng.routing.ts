import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { EntEstMngComponent } from './component/ent-est-mng.component';
// import { EntEstCreComponent } from './component/ent-est-cre.component';
// import { EntEstSetProdComponent } from './component/ent-est-setProd.component';
// import { EntEstCheckComponent } from './component/ent-est-check.component';
// import { EntEstManagePlatformComponent } from './component';
import { EntEstMngComponent,  EntEstCreComponent,EntEstSetProdComponent,EntEstCheckComponent,EntEstManagePlatformComponent} from './component';

export const EntEstMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'ent-est-mng/ent-est-mng',
        component: EntEstMngComponent
    }
    ,{
    	path: 'ent-est-mng/ent-est-cre'
    	,component: EntEstCreComponent
    },{
    	path: 'ent-est-mng/ent-est-setProd/:entId/:entName'
    	,component: EntEstSetProdComponent
    },{
    	path: 'ent-est-mng/ent-est-check/:entId'
    	,component: EntEstCheckComponent
    },{
    	path: 'ent-est-mng/ent-est-managePlatform/:entId'
    	,component: EntEstManagePlatformComponent
    }
]);