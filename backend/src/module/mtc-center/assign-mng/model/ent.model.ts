//超分管理首页--企业联动列表
export class EntModel {
    enterpriseId: string;
    enterpriseName: string;
    department: Array<DeptModel>;
}

export class DeptModel {
    departmentName: string;
    departmentId: string;
}