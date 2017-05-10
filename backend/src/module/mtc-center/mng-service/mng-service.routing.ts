import { RouterModule } from '@angular/router';

import {MngServiceListComponent} from './component/mng-service-list.component'
import {MngServiceDetailComponent} from './component/mng-service-detail.component'
import {MngServiceSetComponent} from './component/mng-service-set.component'

export const MngServiceRouting = RouterModule.forChild([
    {
        path:'mng-service/mng-service-list',
        component:MngServiceListComponent
    },
    {
        path:'mng-service/mng-service-detail',
        component:MngServiceDetailComponent
    },
    {
        path:'mng-service/mng-service-set',
        component:MngServiceSetComponent
    }
])
