export class CaseListModel{

    creatorOrganization: string;//部门
    details: string;//描述
    
    id: string;//
    subject: string;//主题
    typeName: string;//类别
    statusName: string;//状态
    emergencyName: string;//紧急程度
    contact: string; //联系人
    contactNo: string;//联系电话
    creatorName: string;  //提交者
    creatorTenant: string;// 所属企业
    createDate: string;//创建时间
    updateDate: string;//更新时间
    isSelect=false;
    status:string;

}
export class queryParm{
    subject:string=" ";
    tenantId:string=" ";
    type:string=" ";
    status:string=" ";
    emergency:string=" ";
}
