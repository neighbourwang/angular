//区域 
export class Platform{
	code: string = null;//, optional),
	id: string = null;//, optional),
	name: string = null;//, optional)
}


/*
GET /authsec/platforms/status/activation

GeneralContentResultOfListOfPlatformSimpleItem {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (Array[PlatformSimpleItem], optional)
}
PlatformSimpleItem {
code (string, optional),
id (string, optional),
name (string, optional)
}

{
	"detailDescription": "string",
  "resultCode": "string",
  "resultContent": [
    {
      "code": "string",
      "id": "string",
      "name": "string"
    }
  ]
*/