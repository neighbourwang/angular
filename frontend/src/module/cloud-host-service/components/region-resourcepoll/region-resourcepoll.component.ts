import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';
import { LayoutService} from '../../../../architecture';
import { RegionResourcepollServiceList} from './region-resourcepoll.service';
import { Regions, ResoucePolls } from './region-resourcepoll.model';


@Component({
	selector: 'region-resourcepoll',
	templateUrl: './region-resourcepoll.component.html',
	styleUrls: ['./region-resourcepoll.component.less']
})
export class RegionResourcepollComponent implements OnInit {

    @Output() onClick = new EventEmitter<any>();

	regions: Regions[] = [];
	region: Regions;
	resourcePolls: ResoucePolls[] = [];
	resourcePoll: ResoucePolls;

	constructor(
		private layoutService: LayoutService,
		private service : RegionResourcepollServiceList
	) { }

	ngOnInit() {
		this.fetchRegion();
	}

	/****区域*****/
	private fetchRegion() {
		this.service.fetchRegion().then(res => {
			if(!res.length) return

			this.regions = res;
			this.region = this.regions[0]
			this.fetchResourcePoll()
		})
	}

	/****资源池*****/
	private fetchResourcePoll() {
		this.service.fetchResourcePoll(this.region.id).then(res => {
			if(!res.length) return this.resourcePolls = []

			this.resourcePolls = res;
			this.resourcePoll = this.resourcePolls[0]
		})
	}


	// private clickEmit(){
	//	this.onClick.emit({
	//		area : this.currentArea, 
	//		zone : this.currentZone
	//	});
	// }
}
