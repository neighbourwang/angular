import { RouterModule } from "@angular/router";

import { OpenstackNetMngComponent } from './component/openstack-net-mng.component';
import { OpenstackSynchrNetComponent } from './component/openstack-synchr-net.component';
export const OpenstackRouting = RouterModule.forChild([
    {
        path: "openstack/openstack-net-mng",
        component: OpenstackNetMngComponent
    },
    {
        path: "openstack/openstack-synchr-net",
        component: OpenstackSynchrNetComponent
    }
]);