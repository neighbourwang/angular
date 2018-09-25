export class VmwareImgModel {
    id: string;
    name: string;
    displayName: string;
    os: string;
    bitsType: string;
    capacity: string;
    type: string;
    tenants: Array<TenantModel>;
    status: string;
    description: string;

    nameEditing: boolean;
    checked: boolean;

}

export class VmwareImgSyncModel {
    uuid: string;
    name: string;
    displayName: string;
    os: string;
    bitsType: string;
    capacity: string;
    type: string;
    syncResult: string;
    guestId: string;
    format: string;

    nameEditing: boolean;
    checked: boolean;

}


export class TenantModel {
    id: string;
    name: string;
}

export class EnterpriseModel {
    id: string;
    name: string;

    selected: boolean;
}

export class VmwareEntModel {
    id: string;
    name: string;
}

export class CriteriaQuery{
    type: string = "";
    tenantId: string = "";

    toString(){
        return JSON.stringify(this);
    }
}