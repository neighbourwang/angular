export const enterprises = {
    detailDescription: "企业列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 1,
        totalRecords: 2
    },
    resultCode: "100",
    resultContent: [
        {
            id: "001",
            name: "企业1",
            code: "00001" 
        },
        {
            id: "002",
            name: "企业2",
            code: "00002" 
        }
    ]
}

export const createAdminRes = {
    detailDescription: "新增企业管理员",
    pageInfo: {
        currentPage: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecords: 0
    },
    resultCode: "100",
    resultContent: {
        "contactPhone": "13720119493",
        "contactorName": "Moses",
        "description": "description",
        "email": "dark@hpe.com",
        "enterpriseId": "002",
        "enterpriseName": "企业02",
        "id": "1"
    }
}


export const updateAdminRes = {
    detailDescription: "新增企业管理员",
    pageInfo: {
        currentPage: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecords: 0
    },
    resultCode: "100",
    resultContent: {
        "processResult": "string"
    }
}