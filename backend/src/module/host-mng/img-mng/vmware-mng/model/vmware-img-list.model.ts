/*        {
            "id": "ef349044-3bfb-4b09-b804-30954b084e0d",
            "name": "windows",
            "displayName": "我的windows",
            "os": "CentOS",
            "bitsType": "0",
            "type": "0",
            "tenants": [
             {
                        "name": "企业1",
                        "id": "ef349044-3bfb-4b09-b804-30954b084e0d"
            },
            {
                        "name": "企业2",
                        "id": "ef349044-3bfb-4b09-b804-30954b084e0d"
            }
            ],
            "status":"1",
            "description":"xxx"
        },
*/


export class VmwareImgModel {
    id: string;
    name: string;
    displayName: string;
    os: string;
    bitsType: string;
    type: string;
    tenants: Array<TenantModel>;
    status: string;
    description: string;

    nameEditing: boolean;
    checked: boolean;

}


export class TenantModel {
    id: string;
    name: string;
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