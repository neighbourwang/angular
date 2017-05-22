import { NgModule } from '@angular/core';
import { CommonComponentModule } from '../../architecture';

// Routing
import { TestUtilRouting } from './testutil.routing';

//Components
import { FirstComponent } from './component/First.component';

//Service
import { FirstService } from './service/first.service';

@NgModule({
    imports: [
        CommonComponentModule,
        TestUtilRouting,
    ],
    declarations: [
        FirstComponent
    ],
    exports: [
    ],
    providers: [
        FirstService
    ]

})
export class TestUtilModule { }