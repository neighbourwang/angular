export class AliMajorList{
    id: string;   // uuid 唯一编号
    loginName: string;   // 登录账号
    departmentName: string;  //部门名称
    subNumber: string;   //   子账号数量
    lastUpdate: string;  //最后更新
    operator: string;   // 操作人
    accessKey: string;    //  access key
    accessSecret: string;  // access secret
    departmentId: string;
}

/*{
    "detailDescription": "string",
    "resultCode": "string",
    "resultContent": [
    {
        "accessKey": "string",
        "accessSecret": "string",
        "departmentId": "string",
        "departmentName": "string",
        "id": "string",
        "lastUpdate": ,
        "loginName": "string",
        "operator": "string",
        "subNumber": "string"
    }
]
}*/
