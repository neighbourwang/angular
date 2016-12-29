import { RouterModule } from "@angular/router";

import { VmwareMngIndexComponent } from './component/vm-mng-index.component';
export const VmwareMngIndexRouting = RouterModule.forChild([
    {
        path: "net-mng/vm-mng-index/vmware-net-index",
        component: VmwareMngIndexComponent
    },
]);