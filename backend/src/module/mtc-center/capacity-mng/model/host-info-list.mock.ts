export const HostInfo_mock = {
    resultCode: "100",
    detailDescription: "宿主机详情",
    resultContent:
        {
            "hostId": "host id in DB",
            "hostName": "宿主机名称",
            "cpu": 10,//宿主机CPU数量
            "memory": 512,//宿主机内存数量
            "cpuPercent": 83,//虚拟CPU（实际已分配）
            "memPercent": 80,//内存（实际已分配)
            "running": "up|down",//数据字典
            "status": "active",//数据字典
            "instance": 30,//实例数量
            "cpuAverage": 0.1,//CPU平均使用率
            "cpuPeak": 23,//CPU峰值使用率
            "cpuPeakTime": "2017年1月18日    18：00：53",//CPU峰值记录时间
            "memoryAverage": 39.9,//内存平均使用率
            "memoryPeak": 67,//内存峰值使用率
            "memoryPeakTime": "2017年1月18日    18：00：53",//内存峰值记录时间
        }
    
}

