import { RouterModule } from '@angular/router';

import { VmwareMngIndexComponent } from './component/vm-mng-index.component';

export const VmwareMngIndexRouting = RouterModule.forChild([
    {
        path: "vm-mng-index/vmware-net-index",
        component: VmwareMngIndexComponent
    },
]);