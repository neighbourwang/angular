export class CriteriaQuery {
    region:string;
    dataCenter:string;
    url:string;
    tenantName:string;

    constructor() {
    }

    toString() {
        return JSON.stringify(this);
    }
}

// "{
//     ""criteriaQuery"": {
//         ""region"": ""上海"",
//         ""dataCenter"": ""上海数据中心"",
//         ""url"": ""http://192.168.1.1"",
//         ""tenantName"": ""BOE - CIO总部""
//     }
// }"
