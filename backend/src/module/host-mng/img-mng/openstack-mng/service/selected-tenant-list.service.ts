import { Injectable } from '@angular/core';

import {Tenant} from '../model/tenant.model';
@Injectable()
export class SelectedTenantListService{
    private tenantList:Array<Tenant>;

    setList(tList:Array<Tenant>){
        this.tenantList = tList;
    }

    getList(){
        return this.tenantList;
    }

    clear() {
        this.tenantList = null;
    }
}