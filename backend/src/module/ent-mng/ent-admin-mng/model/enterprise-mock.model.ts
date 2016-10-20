export const enterprises = {
    detailDescription: "企业列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
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
};

export const enterpriseOne = {
    detailDescription: "企业列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords: 2
    },
    resultCode: "100",
    resultContent:  
        {
            id: "1",
            name: "企业1",
            code: "001",
            authMode:"1"
        }
};
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
        "userName": "dark@hpe.com",
        "password": "password",
        "enterpriseId": "2",
        "enterpriseName": "企业02",
        "id": "1"
    }
};
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
        "contactPhone": "13720119493",
        "contactorName": "Moses",
        "description": "description",
        "email": "dark@hpe.com",
        "userName": "dark@hpe.com",
        "password": "password",
        "enterpriseId": "2",
        "enterpriseName": "企业02",
        "id": "1"
    }
};
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
};
export const adminList = {
    detailDescription: "获取管理员列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords: 45
    },
    resultCode: "100",
    resultContent: [
        {
            "authMode":"0",
            "contactPhone": "13720119493",
            "userName": "Moses",
            "description": "description",
            "loginName": "dark@hpe.com",
            "enterpriseId": "2",
            "id": "1",
            "status": 0
        },
        {
            "authMode": "0",
            "contactPhone": "13720119493",
            "userName": "王五",
            "description": "description",
            "loginName": "dark@hpe.com",
            "enterpriseId": "2",
            "id": "1",
            "status": 1
        },
        {
            "authMode": "1",
            "contactPhone": "13720119493",
            "userName": "王五",
            "description": "description",
            "loginName": "dark@hpe.com",
            "enterpriseId": "2",
            "id": "1",
            "status": 2
        },
        {
            "authMode": "0",
            "contactPhone": "13720119493",
            "userName": "王五",
            "description": "description",
            "loginName": "dark@hpe.com",
            "enterpriseId": "2",
            "id": "1",
            "status": 3
        }
    ]
};


export const adadminList = {
    detailDescription: "获取管理员列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords: 45
    },
    resultCode: "100",
    resultContent: [
        {
            id: "1",
            "userName": "王五",
            phone: "13720119493",
            email: "dark@hpe.com",
            description: "description",
            loginName: "dark@hpe.com",
            enterpriseId: "1",
            type: "",
            bindStatus: "",
        },
        {
            id: "1",
            "userName": "王五",
            phone: "13720119493",
            email: "dark@hpe.com",
            description: "description",
            loginName: "dark@hpe.com",
            enterpriseId: "1",
            type: "",
            bindStatus: "",
        },
        {
            id: "1",
            "userName": "王五",
            phone: "13720119493",
            email: "dark@hpe.com",
            description: "description",
            loginName: "dark@hpe.com",
            enterpriseId: "1",
            type: "",
            bindStatus: "",
        },
        {
            id: "1",
            "userName": "王五",
            phone: "13720119493",
            email: "dark@hpe.com",
            description: "description",
            loginName: "dark@hpe.com",
            enterpriseId: "1",
            type: "",
            bindStatus: "",
        }
    ]
};