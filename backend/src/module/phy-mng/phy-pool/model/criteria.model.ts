export class Criteria{
    poolName: string;
    region: string;
    dataCenter: string;
    description: string;
    pmPoolId: string;
    regionId: string;

    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}
/*
 {
 "dataCenter": "string",
 "description": "string",
 "pmPoolId": "string",
 "poolName": "string",
 "region": "string",
 "regionId": "string"
 }
}*/
