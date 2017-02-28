export class CaseMngList{
    id: string; //工单号
    subject: string;
    type: string;
    status: string;
    emergency: string;
    typeName: string; //类别
    statusName: string; //状态
    contact: string; //联系人
    contactNo: string; //联系电话
    details: string; //描述
    emergencyName: string; //紧急程度
    creatorName: string; //提交者
    creatorTenant: string; //所属企业
    creatorOrganization: string; //所属部门
    createDate: string; //提交时间
    updateDate: string; //更新时间
}

/*    "id": 5,
    "subject": "剩余不足",
    "typeName": "云硬盘",
    "statusName": "新建",
    "contact": "钟声",
    "contactNo": "18000000",
    "details": "云硬盘剩余大小不足",
    "emergencyName": "紧急",
    "creatorName": "前端235",
    "creatorTenant": "前端企业",
    "creatorOrganization": "管理员部门",
    "createDate": 1487673934000,
    "updateDate": 1487673934000*/
