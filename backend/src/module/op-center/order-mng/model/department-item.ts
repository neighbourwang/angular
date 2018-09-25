//部门
export class DepartmentItem{
	id: string = null;//, optional),
	name: string = null;//, optional)
	
}

/*
GET /authsec/enterprise/{enterpriseId}/department/

GeneralContentResultOfListOfDepartmentItem {
detailDescription (string, optional),
resultCode (string, optional),
resultContent (Array[DepartmentItem], optional)
}
DepartmentItem {
id (string, optional),
name (string, optional)
}


{
  "detailDescription": "string",
  "resultCode": "string",
  "resultContent": [
    {
      "id": "string",
      "name": "string"
    }
  ]
}

*/