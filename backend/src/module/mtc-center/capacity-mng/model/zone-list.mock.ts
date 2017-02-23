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
            "cpuTotal": 4583,
            "cpuPercent": 41.9,
            "memory": 790,
            "memoryTotal": 870,
            "memoryPercent": 90.3
        },
        "resourceActual": {
            "cpu": 1920,
            "cpuTotal": 5392,
            "cpuPercent": 41.9,
            "memory": 790,
            "memoryTotal": 1024,
            "memoryPercent": 90.3
        },
        "resourceUsed": {
            "cpu": 0,
            "cpuTotal": 0,
            "cpuPercent": 1,
            "memory": 429,
            "memoryTotal": 1024,
            "memoryPercent": 41.9
        } 
    }
}