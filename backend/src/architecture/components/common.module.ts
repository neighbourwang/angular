import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { SpinnerComponent } from './spinner/component/spinner.component';
import { PaginationComponent } from './pagination/component/pagination.component';
import { NoticeComponent } from './dialog/component/notice.component';
import { ConfirmComponent } from './dialog/component/confirm.component';
import { PopupComponent } from './dialog/component/popup.component';
import { CountBarComponent} from './countBar/component/count-bar.component'
import { PopoverModule } from './popover/index';

import { MyDatePickerModule } from './date-picker/my-date-picker.module';
import { BootstrapPopoverDirective } from './popover/bootstrap-popover.directive';

import { ClickOutsideModule } from 'ng2-click-outside';

import { HttpModule } from '@angular/http';
import { TranslateModule } from 'ng2-translate';
import { DialogTranslate } from './dialog/service/dialog-translate.service';

@NgModule({
    imports: [
        CommonModule,
        Ng2Bs3ModalModule,
        FormsModule,
        HttpModule,
        TranslateModule.forRoot()
    ],
    declarations: [
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        BootstrapPopoverDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        SpinnerComponent,
        PaginationComponent,
        NoticeComponent,
        ConfirmComponent,
        PopupComponent,
        CountBarComponent,
        MyDatePickerModule,
        BootstrapPopoverDirective,
        ClickOutsideModule,
        PopoverModule,
        HttpModule,
        TranslateModule
    ],
    providers : [DialogTranslate]
})
export class CommonComponentModule { }
