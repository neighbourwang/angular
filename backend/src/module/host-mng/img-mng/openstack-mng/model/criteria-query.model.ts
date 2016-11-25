export class CriteriaQuery {
    type:string;
    tenantId:string = "";

    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}

