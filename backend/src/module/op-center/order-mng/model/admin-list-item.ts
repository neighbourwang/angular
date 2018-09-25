//企业
export class AdminListItem{
	admin: string = null;//
	description: string = null;//
	email: string = null;//
	enterpriseId: string = null;//
	id: string = null;//
	name: string = null;//
	phone: string = null;//
}

/*
GET  /authsec/enterprise/user/{userId}
GeneralContentResultOfListOfTenantModel {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (Array[TenantModel], optional)
}
TenantModel {
admin (string, optional),
description (string, optional),
email (string, optional),
enterpriseId (string, optional),
id (string, optional),
name (string, optional),
phone (string, optional)
}

{
  "detailDescription": "string",
  "resultCode": "string",
  "resultContent": [
    {
      "admin": "string",
      "description": "string",
      "email": "string",
      "enterpriseId": "string",
      "id": "string",
      "name": "string",
      "phone": "string"
    }
  ]
}

*/