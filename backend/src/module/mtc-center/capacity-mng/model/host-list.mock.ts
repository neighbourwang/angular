export const HostList_mock = {
    resultCode: "100",
    detailDescription: "宿主机列表",
    resultContent:
    [
        {
            "hostId": "host id in DB",
            "hostName": "宿主机A",
            "cpu": 10,//宿主机CPU数量
            "memory": 256,//宿主机内存数量
            "cpuPercent": 83,//虚拟CPU（实际已分配）
            "memPercent": 80,//内存（实际已分配)
            "running": "1",//数据字典
            "status": "1",//数据字典
            "instance": 30//实例数量
        },
        {
            "hostId": "host id in DB",
            "hostName": "宿主机B",
            "cpu": 10,//宿主机CPU数量
            "memory": 512,//宿主机内存数量
            "cpuPercent": 67,//虚拟CPU（实际已分配）
            "memPercent": 56,//内存（实际已分配)
            "running": "2",//数据字典
            "status": "2",//数据字典
            "instance": 30//实例数量
        }
   ]
}