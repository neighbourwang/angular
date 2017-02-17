import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CaseMngComponent } from "./component/case-mng.component";
import { CaseDetailComponent } from "./component/case-detail.component";
import { CaseClosedComponent } from "./component/case-closed.component";
import { CaseOperatedComponent } from "./component/case-operated.component";

export const CaseMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'mtc-center/case-mng/case-list',
        component: CaseMngComponent
    },
     {
        path: 'mtc-center/case-mng/case-detail',
        component: CaseDetailComponent
    },

    {
        path: 'mtc-center/case-mng/case-closed',
        component:  CaseClosedComponent
    },
    {
        path: 'mtc-center/case-mng/case-operated',
        component:  CaseOperatedComponent
    },
    


]);
