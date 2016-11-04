/**
 * Created by wangyao on 2016/10/18.
 */
import { NgModule } from '@angular/core';

// Common Components
import { CommonComponentModule } from '../../../architecture';

//Components
import { PersonAccMngComponent } from './component/person-acc-mng.component';

// Routing
import { PersonAccMngRouting } from './person-acc-mng.routing';


//Service

@NgModule({
    imports: [
        CommonComponentModule,
        PersonAccMngRouting
    ],
    declarations: [
        PersonAccMngComponent,
    ],
    exports: [
        PersonAccMngComponent,
    ],
    providers: [
       
    ]

})
export class PersonAccMngModule { }
