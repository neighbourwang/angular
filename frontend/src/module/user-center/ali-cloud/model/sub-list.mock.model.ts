export const SubList_mock= {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": [
        {
            id: "1",   // uuid 唯一编号
            loginName: "fhd_001",   // 登录账号
            departmentName: "管理员部门",  //部门名称
            status: "已启用",
            lastUpdate: "2017-4-6 8:00:00",  //最后更新
            operator: "王某某",   // 操作人
        },
        {
            id: "2",   // uuid 唯一编号
            loginName: "fhd_002",   // 登录账号
            departmentName: "管理员部门",  //部门名称
            status: "已禁用",
            lastUpdate: "2017-4-6 8:00:00",  //最后更新
            operator: "王某某",
        }
    ]
}

export const SubInfo_mock= {
    "resultCode": "100",
    "detailDescription": null,
    "resultContent": {
        "loginName": "fhd_001",
        "departmentName": "管理员部门",  //部门名称
        "accessKey": "1",    //  access key
        "accessSecret": "1",  // access secret
    }
}




