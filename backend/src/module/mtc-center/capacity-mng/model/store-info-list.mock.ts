export const StoreInfoList_mock = {
    resultCode: "100",
    detailDescription: "存储后端详情",
    resultContent:
        {
            "order": 1,
            "storageId":"storage id in db",
            "storageName": "存储名称",
            "displayName": "存储显示名称",
            "storeType": "CEPH",//数据字典
            "total": 12800,//总容量
            "copy": 1,//副本数
            "quota": 85,//配额
            "rate": 89,//分配率
            "usage": 47,//利用率
            "status": "已启用",//数据字典
            "capacity": 30000,//云平台可分配容量
            "allocation": 12000,//云平台已分配
            "allocationPercent": 89,//云平台已分配
            "actual": 5000,//存储实际利用率
            "actualPercent": 47,//存储实际利用率
            "startup": 50,//云主机启动盘
            "startupCapacity": 180,//云主机启动盘容量
            "disk": 100,//云硬盘数量
            "diskCapacity": 400,//云硬盘容量
        }
    
}
        