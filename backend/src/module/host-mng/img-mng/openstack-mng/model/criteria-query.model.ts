export class CriteriaQuery {
    type:string="";
    tenantId:string = "";
    tenantName:string = "";
    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}

