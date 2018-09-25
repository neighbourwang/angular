//可用区域，与platform联动
export class SubRegion{
	description: string = null;//, optional),
	uuid: string = null;//, optional),
	zoneCode: string = null;//, optional),
	zoneId: string = null;//, optional),
	zoneName: string = null;//, optional)
}

/*
GET /authsec/platform/{_id}/zone

GeneralPagingResultOfListOfZoneItem {
detailDescription (string, optional),
pageInfo (PageInfo, optional),
resultCode (string, optional),
resultContent (Array[ZoneItem], optional)
}
PageInfo {
currentPage (integer, optional),
pageSize (integer, optional),
totalPage (integer, optional),
totalRecords (integer, optional)
}
ZoneItem {
description (string, optional),
uuid (string, optional),
zoneCode (string, optional),
zoneId (string, optional),
zoneName (string, optional)
}

{
  "detailDescription": "string",
  "pageInfo": {
    "currentPage": 0,
    "pageSize": 0,
    "totalPage": 0,
    "totalRecords": 0
  },
  "resultCode": "string",
  "resultContent": [
    {
      "description": "string",
      "uuid": "string",
      "zoneCode": "string",
      "zoneId": "string",
      "zoneName": "string"
    }
  ]
}

Response 

*/