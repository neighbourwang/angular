import { NgModule } from '@angular/core';

// common
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

//routing

import { DatabaseRouting } from './database-routing';

//component
import { DatabaseListComponent } from './component/database-list.component';

import { DatabaseComponentOrder } from './component/database-order.component';

import { DatabaseDetailComponent } from './component/database-detail.component';

import { CloudHostComponents } from '../components/cloud-host-components.module';

//service
import { DatabaseServiceOrder } from './service/database-order.service'; 
import { DatabaseServiceList } from './service/database-list.service'; 
import {DatabaseDetailService} from './service/database-detail.service';

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        DatabaseRouting,
        CommonComponentModule,
        CloudHostComponents,
        
        PipeModule
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        DatabaseListComponent,
        DatabaseDetailComponent,
        DatabaseComponentOrder
    ],
    exports: [
    ],
    providers: [
        DatabaseServiceOrder,
        DatabaseServiceList,
        DatabaseDetailService,
    ]

})
export class DatabaseModule { }
