import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { LayoutService} from '../../../../architecture';
import { PlatformZoneServiceList} from './platform-zone.service';
import { Platform, Zone } from './platform-zone.model';


@Component({
	selector: 'platform-zone',
	templateUrl: './platform-zone.component.html',
	styleUrls: ['./platform-zone.component.less']
})
export class PlatformZoneComponent implements OnInit {

    @Output() onClick = new EventEmitter<any>();

	areaList : Platform[] = [];
	zoneList : Zone[] = [];

	currentArea : Platform = new Platform();
	currentZone : Zone = new Zone();
	emptyArea : Platform = new Platform();
	emptyZone : Zone = new Zone();

	constructor(
		private layoutService: LayoutService,
		private service : PlatformZoneServiceList
	) { }

	ngOnInit() {
		this.setPlatform();
	}

	setPlatform(){   //请求并设置区域列表
		this.service.getAreaList().then(areaList => {
			this.areaList = areaList;
		})
	}

	setZone(id:string) {  //设置可用区
		this.service.getZoneList(id).then(zoneList => {
			this.zoneList = zoneList;
		})
	}

	setCurrentArea(area:Platform = this.emptyArea) {
		this.currentArea = area;
		this.currentZone = this.emptyZone;  //清空zone
		this.clickEmit();
	}

	reset() {
		this.currentArea = this.emptyArea;
		this.currentZone = this.emptyZone;
	}

	setCurrentZone(zone:Zone = this.emptyZone) {
		this.currentZone = zone;
		this.clickEmit();
	}

	private clickEmit(){
		this.onClick.emit({
			area : this.currentArea, 
			zone : this.currentZone
		});
	}
}
