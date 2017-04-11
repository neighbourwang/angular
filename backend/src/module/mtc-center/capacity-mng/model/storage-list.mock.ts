export const StorageList_mock = {
    resultCode: "100",
    detailDescription: "存储资源容量管理",
    resultContent: [
        {
            "order": 1,
            "storageId": "111",
            "storageName": "cinder1",
            "displayName": "高速I/O-1",
            "storageType": "CEPH",//数据字典
            "capacity": 12800,//总容量
            "copy": 1,//副本数
            "quota": 85,//配额
            "rate": 89,//分配率
            "usage": 47,//利用率
            "status":"1"
        },
        {
            "order": 2,
            "storageId": "222",
            "storageName": "cinder2",
            "displayName": "高速I/O-2",
            "storageType": "CEPH",//数据字典
            "capacity": 12800,//总容量
            "copy": 1,//副本数
            "quota": 85,//配额
            "rate": 89,//分配率
            "usage": 47,//利用率
            "status":"2"
        }
    ]
       
}