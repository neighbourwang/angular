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

export class PhyImgListShowImgComponent implements OnInit{
     constructor(
        private layoutService: LayoutService,
        private router2: ActivatedRoute,
        private router: Router,
        private service: PhyImgListService
    ) {
        
    }
    imgId:string;
    img:PhyImg;

    sourceId: string;
    sourceName : string;
    ngOnInit(){
        this.router2.params.forEach((params: Params) => {
			this.imgId = params['imageId'];
            console.log("imageId:" + this.imgId);
            
            this.sourceId = params['pmImagePoolId'];
            this.sourceName = params['sourceName'];
			console.log("接收的sourceId:" + this.sourceId);
            console.log("sourceName:" + this.sourceName);
			
		});
        
        this.img = this.service.getOneFromList(this.imgId);
    }
    // getImgDetail(){
    //     this.layoutService.show();
    //     this.service.imgDetail(this.imgId).then(
    //         response=>{
    //             this.layoutService.hide();
    //             if(response && 100 == response["resultCode"]){
    //                 this.img = response.resultContent;
    //             }
    //         }
    //     )
    // }
    backToList(){
        this.router.navigate(['phy-mng/phy-img-mng/imglist', {"pmImagePoolId":this.sourceId, "sourceName":this.sourceName}])
    }
}