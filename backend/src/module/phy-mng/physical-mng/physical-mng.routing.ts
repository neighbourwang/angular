import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhysicalEditComponent } from "./component/physical-edit.component";
import { PhysicalListComponent } from "./component/physical-list.component";
import { PhysicalIpmiComponent } from "./component/physical-ipmi.component";

export const PhysicalMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'physical-mng/physical-edit',
        component: PhysicalEditComponent
    },
     {
        path: 'physical-mng/physical-list',
        component: PhysicalListComponent
    },

    {
        path: 'physical-mng/physical-ipmiInfoChange',
        component:  PhysicalIpmiComponent
    }

]);
