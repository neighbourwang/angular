export class AccountListModel{
    id:string;
    loginName:string;
    tenantName:string;
    tenantId:string;
    departName:string;
    departId:string;
    status:string;
    lastUpdate:string;
    operator:string;
    description:string;
    accessUrl:string;
    accessKey:string;
    accessSecret:string;
    isEditable:string;
    isSelect=false;
    
}
export class EnterpriseModel{
    tenantId:string;
    tenantName:string;
    status:string;
    isSelect=false;
}

