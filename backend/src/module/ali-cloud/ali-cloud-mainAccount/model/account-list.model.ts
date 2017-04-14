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
    hasSubAccount:string;//1有 0 没有

}