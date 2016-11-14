import { RouterModule } from "@angular/router";

import { OpenstackNetMngComponent } from './component/openstack-net-mng.component';
import { OpenstackSynchrNetComponent } from './component/openstack-synchr-net.component';
export const OpenstackRouting = RouterModule.forChild([
    {
        path: "net-mng/openstack/openstack-net-mng",
        component: OpenstackNetMngComponent
    },
    {
        path: "net-mng/openstack/openstack-synchr-net",
        component: OpenstackSynchrNetComponent
    }
]);