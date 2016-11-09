export const imageList = {
    detailDescription: "获取镜像列表",
    pageInfo: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 5,
        totalRecords: 10
    },
    resultCode: "100",
    resultContent: [
        {
            "id":"1",
            "name":"MyCentOS-VM-001",//镜像名称
            "type":"自定义镜像",//镜像类型
            "os":"Windows 2013",//操作系统
            "digit":"64",//系统位数
            "createTime":"2016/10/1 11:00",//创建时间
            "status":1,//状态--字典
            "progress":"100%",//进度
            "location":"上海",//区域
            "des":"描述文字信息内容在这里显示",//描述
        },
        {
            "id":"2",
            "name":"MyCentOS-VM-002",//镜像名称
            "type":"自定义镜像",//镜像类型
            "os":"Windows 2016",//操作系统
            "digit":"64",//系统位数
            "createTime":"2016/11/1 12:22",//创建时间
            "status":0,//状态--字典
            "progress":"100%",//进度
            "location":"武汉",//区域
            "des":"描述文字信息内容在这里显示",//描述
        }
    ]

}