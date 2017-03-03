export const Zone_mock = {
    resultCode: "100",
    detailDescription: "可用区资源信息",
    resultContent:
    {
        "cpus": 1348,
        "memory": 1024,
        "cpuOversubscription": 4,//CPU超分
        "cpuQurta": 80, //配额
        "cpuCapacity": 4583,
        "memoryCapacity": 870,
        
        "resourceAllocation": {
            "cpu": 1920,
            "cpuTotal": 5392,
            "cpuPercent": 41.9,
            "memory": 790,
            "memoryTotal": 1024,
            "memoryPercent": 90.3
        },
        "resourceActual": {
            "cpu": 486,
            "cpuTotal": 100,
            "cpuPercent": 486,
            "memory": 160,
            "memoryTotal": 100,
            "memoryPercent": 160
        },
        "resourceUsed": {
            "cpu": 70,
            "cpuTotal": 100,
            "cpuPercent": 70,
            "memory": 429,
            "memoryTotal": 1024,
            "memoryPercent": 41.9
        } 
    }
}