import { RouterModule } from '@angular/router';

import {MngServiceListComponent} from './component/mng-service-list.component'
export const MngServiceRouting = RouterModule.forChild([
    {
        path:'mng-service/mng-service-list',
        component:MngServiceListComponent
    }
])