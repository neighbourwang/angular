import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../../../../architecture';
import { EntEstCreService } from "../service/ent-est-cre.service";
import { ResourceQuota } from "../model/resourcequota";
import { EntEstResourceQuota } from "../model/ent-est-resourcequota";

@Component({
	selector:'ent-est-cre-step-02'
	,templateUrl:'../template/ent-est-cre-step-02.component.html'
	,styleUrls:['../style/ent-est-mng.component.css']
	,providers:[EntEstCreService]
})
export class EntEstCreStep02Component implements OnInit{
	private resourceQuotas: ResourceQuota[] = [];
	private entEstResourceQuotas : EntEstResourceQuota[];
	
	constructor(private router: Router,
		private service: EntEstCreService){}
	ngOnInit(){
		this.service.loadResourceQuotas(this.resourceQuotas, null);
		this.entEstResourceQuotas = this.service.getEntEst().ResourceQuotas;
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
		let selected = this.resourceQuotas.filter(n=>n.checked);
		if(selected.length > 0)
		{
			for(let item of selected)
			{
				item.added = true;
				item.checked = false;

				let entEstResourceQuota = new EntEstResourceQuota();
				entEstResourceQuota.regionId = item.regionId;
				entEstResourceQuota.regionName = item.regionName;
				entEstResourceQuota.storageQuota = item.storageQuota;
				entEstResourceQuota.vmQuota = item.vmQuota;
				entEstResourceQuota.platformId = item.platformId;
				entEstResourceQuota.referredResourceQuota = item;

				this.entEstResourceQuotas.push(entEstResourceQuota);
			}
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
		this.resourceQuotas.map(n=>{n.checked = false;});
		resourceQuota.checked = true;
	}

	selectEntEstResourceQuota(entEstResourceQuota: EntEstResourceQuota)
	{
		this.entEstResourceQuotas.map(n=>{n.checked = false;});
		entEstResourceQuota.checked = true;
	}

	getNotSelectedResourceQuota(){
		return this.resourceQuotas.filter(n=>n.added == false);
	}

}