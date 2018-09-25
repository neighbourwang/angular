import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhsicalProdDirCreComponent } from "./component/prod-dirPhsical-cre.component";
import { PhysicalProdCreStep1Component} from './component/physical-prod-cre-step1.component';
import { PhysicalProdCreStep2Component} from './component/physical-prod-cre-step2.component';
import { PhysicalProdCreStep3Component} from './component/physical-prod-cre-step3.component';
import { PhysicalProdCreStep4Component} from './component/physical-prod-cre-step4.component';
import { PhysicalProdEditComponent } from "./component/physical-prod-edit.component";

export const PhysicalProdMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'physical-prod-mng/prod-dirPhsical-cre',
        component: PhsicalProdDirCreComponent
    },
    {
        path: 'physical-prod-mng/prod-mng-cre-step1',
        component: PhysicalProdCreStep1Component
    },
    {
        path: 'physical-prod-mng/prod-mng-cre-step2',
        component: PhysicalProdCreStep2Component
    },
    {
        path: 'physical-prod-mng/prod-mng-cre-step3',
        component: PhysicalProdCreStep3Component
    },
    {
        path: 'physical-prod-mng/prod-mng-cre-step4',
        component: PhysicalProdCreStep4Component
    },
    {
        path: 'physical-prod-mng/prod-mng-edit',
        component: PhysicalProdEditComponent
    },
]);
