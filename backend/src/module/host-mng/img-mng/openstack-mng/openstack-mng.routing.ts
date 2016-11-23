import { RouterModule } from "@angular/router";

import { OpenstackMngComponent } from './component/openstack-mng.component'
export const OpenstackMngRouting = RouterModule.forChild([

    {
        path:'host-mng/image/openstack-mng',
        component: OpenstackMngComponent
    },
    {
        
    }
])