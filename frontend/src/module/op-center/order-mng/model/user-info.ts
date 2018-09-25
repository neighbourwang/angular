export class UserInfo{
    id:string;
    enterpriseId:string;//企业ID
    organizationId:string;//部门ID
    organizationName:string;
    enterpriseName:string;
    roleName:string='';//角色，管理员、普通用户
    isAdmin:boolean = false;//是否是管理员
}