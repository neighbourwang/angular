class Organization {
          "key": string;
          "num": number;
          "value": string
        }
class Role {
          "key": string;
          "num": number;
          "value": string
        }
class Member {
      "description": string;
      "email": string;
      "id": string;
      "isAD": boolean;
      "loginName": string;
      "name": string;
      "orgs": Array<Organization>;
      "phone":string
      "roles": Array<Role>;
    }
class Platform {
      "dataCenter": string;
      "description": string;
      "id": string;
      "name": string;
      "passwd": "xxxxxx";
      "platformType": number;
      "platformTypeName": string;
      "regionId": string;
      "supportChange": boolean;
      "uri": string;
      "userName": string;
      "version": string
    }
 class Org {
  "description": string;
  "id": string;
  "leaderId": string;
  "members": Array<Member>;
  "name": string;
  "platforms": Array<Platform>;

  
}
class OrgPer{
      "id": string;
      "name": string;
      "headCount": number;
      "leaderId": string;
      "leaderName": string;
      "status": number;
      "description": string;
      "members": string;
      "platforms": string;
}
export {
  Org,
  OrgPer
}