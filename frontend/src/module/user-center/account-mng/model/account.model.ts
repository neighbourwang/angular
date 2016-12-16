class Org {
    "key": string;
    "num"= 0;
    "value": string;
}

class Rolee {
    "key": string;
    "num": boolean;
    "value": string;
    selected:boolean;
}

class Member {
    "description": string;
    "email": string;
    "id": string;
    "isAD"= 0;
    "loginName": string;
    "name": string;
    "orgs": Array<Org>;
    "phone": string;
    "roles": Array<Rolee>;
    selected:boolean;
}

class Platform {
    "dataCenter": string;
    "description": string;
    "id": string;
    "name": string;
    "passwd": string;
    "platformType": boolean;
    "platformTypeName": "Openstack";
    "regionId": string;
    "supportChange": boolean;
    "uri": "https://xxx.xxx.xxx.xxx";
    "userName": string;
    "version": string;
}

class Organization {
    "description": string;
    "id": string;
    "leaderId": string;
    "members": Array<Member>;
    "name": string;
    "platforms": Array<Platform>;
    'selected': boolean;
}

class Role {
    "description": string;
    "id": string;
    "name": string;
    selected: boolean;
}

class Account {
    "description": string;
    "email": string;
    "id": string;
    "isLeader": boolean;
    "loginName": string;
    "tenantId":string;
    "organizations": Array<Organization>;
    "phone": string;
    "roles": Array<Role>;
    "userName": string;
    status:number;
    type: string;//0 本地 1 AD
    ldapId: string = "";
    ldapName: string;
    constructor() {
        this.roles = [
            {
                "description": "",
                "id": "",
                "name": "",
                selected: false
            }
        ];
        this.organizations = [
            {
                "description": "",
                "id": "",
                "leaderId": "",
                "members": new Array<Member>(),
                "name": "",
                "platforms": new Array<Platform>(),
                selected: false
            }
        ];
    }
}

export {
    Account,
    Role,
    Organization
    }