export class AccountListModel{
    id:string;
    loginName:string;
    mainAccountType:string=""; //1 独享， 2 共享
    tenantCross:string;     //所属企业
    status:string;
    lastUpdate:string;
    operator:string;
    description:string;
    accessUrl:string;
    accessKey:string;
    accessSecret:string;
    isSelect=false;
   isEditable:string;//1有 0 没有

}

export class EnterpriseModel{
    tenantId:string;
    tenantName:string;
    status:string;
    isSelect=false;
    visible:string;
}