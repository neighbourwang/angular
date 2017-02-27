import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, ValidationService, 
    PaginationComponent, ConfirmComponent, SystemDictionary,PopupComponent } from '../../../../architecture';

import { PhyImg } from '../model/phy-img.model';
import { PhyImgListService } from '../service/phy-imglist.service';

@Component({
    selector: "phy-img-mng/imglist/showimg",
    templateUrl: "../template/physical-image-view.html",
    styleUrls: [],
    providers: []
})

export class PhyImgListShowImg  implements OnInit{
     constructor(
        private layoutService: LayoutService,
        private router2: ActivatedRoute,
        private router: Router,
        private service: PhyImgListService
    ) {
        
    }
    imgId:string;
    img:PhyImg;
    ngOnInit(){
        this.router2.params.forEach((params: Params) => {
			this.imgId = params['imageId'];
            console.log("imageId:" + this.imgId);
			
		});
        this.img = this.service.getOneFromList(this.imgId);
    }
}