import { RouterModule } from "@angular/router";

import { OpenstackMngComponent } from './component/openstack-mng.component';
import { OpenstackImageSyncPublicComponent } from './component/openstack.image-sync-public.component';
import { OpenstackImageSyncEntComponent } from './component/openstack.image-sync-ent.component';
export const OpenstackMngRouting = RouterModule.forChild([

    {
        //path:'host-mng/img-mng/openstack-mng',
        path:'img-mng/openstack-mng',
        component: OpenstackMngComponent
    },
    {
        path:"img-mng/openstack-mng/img-openstack-image-sync-public",
        component: OpenstackImageSyncPublicComponent
    },
    {
        path:"img-mng/openstack-mng/img-openstack-image-sync-ent",
        component: OpenstackImageSyncEntComponent
    }
])