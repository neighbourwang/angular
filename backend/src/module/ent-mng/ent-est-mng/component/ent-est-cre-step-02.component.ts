import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent } from '../../../../architecture';
import { EntEstCreService } from "../service/ent-est-cre.service";
import { ResourceQuota } from "../model/resourcequota";
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";
import { ResourceQuotaPaging } from "../model/resourcequota-paging";

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:['../style/ent-est-mng.component.css']
	,providers:[EntEstCreService]
})
export class EntEstCreStep02Component implements OnInit{

	@ViewChild("notice")
	notice: NoticeComponent;

	private entEstResourceQuotas : EntEstResourceQuota[];
	private resourceQuotaPaging: ResourceQuotaPaging = new ResourceQuotaPaging();
	
	constructor(private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.service.loadResourceQuotas(this.resourceQuotaPaging, this.showError, this);
		this.entEstResourceQuotas = this.service.getEntEst().ResourceQuotas;
	}

	showError(msg:any) {
	    this.notice.open(msg.title, msg.desc);
	}

	next(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-est-mng/ent-est-cre-step-01");
    }

	cancel(){
		this.router.navigateByUrl('ent-mng/ent-est-mng/ent-est-mng');
	}

	add(){
		let selected = this.resourceQuotaPaging.items.find(n=>n.checked);
		if(selected)
		{
			selected.added = true;
			selected.checked = false;

			let entEstResourceQuota = new EntEstResourceQuota();
			entEstResourceQuota.regionId = selected.regionId;
			entEstResourceQuota.regionName = selected.regionName;
			entEstResourceQuota.storageQuota = selected.storageQuota;
			entEstResourceQuota.vmQuota = selected.vmQuota;
			entEstResourceQuota.platformId = selected.platformId;
			entEstResourceQuota.referredResourceQuota = selected;

			this.entEstResourceQuotas.push(entEstResourceQuota);
		}
	}

	remove(){
		let selected = this.entEstResourceQuotas.filter(n=>n.checked);
		if(selected.length > 0)
		{
			for(let item of selected)
			{
				item.referredResourceQuota.added = false;
				item.referredResourceQuota.checked = false;
				item.referredResourceQuota = null;
				this.entEstResourceQuotas.splice(this.entEstResourceQuotas.indexOf(item), 1);
			}
		}
	}

	selectResourceQuota(resourceQuota: ResourceQuota)
	{
		this.resourceQuotaPaging.items.map(n=>{n.checked = false;});
		resourceQuota.checked = true;
	}

	selectEntEstResourceQuota(entEstResourceQuota: EntEstResourceQuota)
	{
		this.entEstResourceQuotas.map(n=>{n.checked = false;});
		entEstResourceQuota.checked = true;
	}

	getNotSelectedResourceQuota(){
		return this.resourceQuotaPaging.items.filter(n=>n.added == false);
	}

	changePage(page: number) {
		page = page < 1 ? 1 : page;
		page = page > this.resourceQuotaPaging.totalPages ? this.resourceQuotaPaging.totalPages : page;

		if (this.resourceQuotaPaging.currentPage == page) {
		  return;
		}

		this.resourceQuotaPaging.currentPage = page;
		this.service.loadResourceQuotas(this.resourceQuotaPaging, this.showError, this); 
	}

}