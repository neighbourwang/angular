import { Component, Input } from '@angular/core';

import { Image_wxl } from "../model/img-mng.model";

@Component({
  selector: 'img-mng-description',
  templateUrl: "../template/img-mng-description.html",
  styleUrls: ["../style/img-mng.less"],
  providers: []
})
export class ImgMngDescriptionComponent {
    @Input()
    image: Image_wxl;

    onCancel(): void {
      this.image = null;
    }

    onSave(image1: Image_wxl): void {
      //console.log(image1.description);
      //console.log(this.image.description);
      this.image = null;
    }
}