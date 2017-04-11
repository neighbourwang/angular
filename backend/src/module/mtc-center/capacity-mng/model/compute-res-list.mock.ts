export const ComputeRes_mock = {
    resultCode: "100",
    detailDescription: "计算资源容量管理",
    resultContent:
    {
        "code": "string",
        "dataCenter": "string",
        "description": "string",
        "healthFlag": "string",
        "id": "Platform ID in DB, required for updat option ONLY.",
        "name": "HuaDong Openstack 1",
        "password": "string",
        "platformType": "0",
        
        "status": "string",
        "support": 0,
        "uri": "https://xxx.xxx.xxx.xxx",
        "username": "string",
        "version": "string",
        "regions": [
            {
                 "regionId": "10",
                 "regionName": "北京",
                 "zones": [
                     {
                         "zoneId": "101",
                         "zoneName": "朝阳区",
                         "zoneStatus": "1"
                     },
                     {
                         "zoneId": "102",
                         "zoneName": "东城区",
                         "zoneStatus": "2"
                     }
                 ]
            },
            {
                 "regionId": "20",
                 "regionName": "武汉",
                 "zones": [
                     {
                         "zoneId": "201",
                         "zoneName": "武昌区",
                         "zoneStatus": "1"
                     },
                     {
                         "zoneId": "202",
                         "zoneName": "洪山区",
                         "zoneStatus": "2"
                     }
                 ]
            }
        ],      
    }
}