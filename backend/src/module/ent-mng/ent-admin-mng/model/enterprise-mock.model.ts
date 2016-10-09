export const enterprises = {
    detailDescription: "企业列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage:5,
        totalRecords: 2
    },
    resultCode: "100",
    resultContent: [
        {
            id: "1",
            name: "企业1",
            code: "001" 
        },
        {
            id: "2",
            name: "企业2",
            code: "002" 
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
        "contactorPhone": "13720119493",
        "contactName": "Moses",
        "description": "description",
        "email": "dark@hpe.com",
        "userName": "dark@hpe.com",
        "password": "password",
        "enterpriseId": "2",
        "enterpriseName": "企业02",
        "id": "1"
    }
}

export const getAdminByIdRes = {
    detailDescription: "根据ID获取管理员",
    pageInfo: {
        currentPage: 0,
        pageSize: 0,
        totalPage: 0,
        totalRecords: 0
    },
    resultCode: "100",
    resultContent: {
        "contactorPhone": "13720119493",
        "contactName": "Moses",
        "description": "description",
        "email": "dark@hpe.com",
        "userName": "dark@hpe.com",
        "password": "password",
        "enterpriseId": "2",
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


export const adminList = {
    detailDescription: "获取管理员列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords:45
    },
    resultCode: "100",
    resultContent: [{
        "contactorPhone": "13720119493",
        "contactName": "Moses",
        "description": "description",
        "email": "dark@hpe.com",
        "userName": "dark@hpe.com",
        "password":"password",
        "enterpriseId": "2",
        "enterpriseName": "企业02",
        "id": "1",
        "status": 0
    },
        {
            "contactorPhone": "13720189493",
            "contactName": "李四",
            "description": "description",
            "email": "dark@hpe.com",
            "userName": "dark@hpe.com",
            "password": "password",
            "enterpriseId": "1",
            "enterpriseName": "企业",
            "id": "1",
            "status": 1
        },
        {
            "contactorPhone": "13720119445",
            "contactName": "王五",
            "description": "description",
            "email": "dark@hpe.com",
            "userName": "dark@hpe.com",
            "password": "password",
            "enterpriseId": "1",
            "enterpriseName": "企业01",
            "id": "1",
            "status": 0
        }
    ]
}




