export class AliSubList{
    id: string;   // uuid 唯一编号
    loginName: string;   // 登录账号
    departmentName: string;  //部门名称
    status: string;   //   子账号数量
    lastUpdate: string;  //最后更新
    operator: string;   // 操作人
    departId: string= "";
    accessKey: string;
    accessSecret: string;
}

/*[
    {
        id   // uuid 唯一编号
        loginName   // 登录账号
        departmentName  //部门名称
        subNumber   //   子账号数量
        lastUpdate  //最后更新
        operator   // 操作人
    }
]*/
