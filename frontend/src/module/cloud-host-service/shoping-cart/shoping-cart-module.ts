import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { ShopingCartRouting } from './shoping-cart-routing';

//component
import { cartListComponent } from './component/cart-list.component';

import { cartOrderComponent } from './component/cart-order.component';

//service
import { cartOrderService } from './service/cart-order.service'; 
import { cartListService } from './service/cart-list.service'; 

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        ShopingCartRouting,
        CommonComponentModule,
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        cartListComponent,
        cartOrderComponent
    ],
    exports: [
    ],
    providers: [
        cartOrderService,
        cartListService
    ]

})
export class ShopingCartModule { }
