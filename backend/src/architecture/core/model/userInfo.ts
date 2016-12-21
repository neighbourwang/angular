interface Roles {
    description: string;
    id: string;
    name: string;
    roleName: string;
    status: string
}

interface Members {
    description: string;
    email: string;
    id: string;
    loginName: string;
    phone: string;
    status: string;
    type: number;
    userName: string
}

interface Platforms {
    code: string;
    dataCenter: string;
    description: string;
    healthFlag: string;
    id: string;
    name: string;
    password: string;
    platformType: number;
    regionId: string;
    status: string;
    support: number;
    uri: string;
    username: string;
    version: string
}
interface Organizations {
    description: string;
    headCount: number;
    id: string;
    leaderId: string;
    leaderName: string;
    name: string;
    status: string
    members: Members[];
    platforms: Platforms[];
}

interface UserInfo {
    description: string;
    email: string;
    enterpriseId: string;
    enterpriseName: string;
    enterpriseType: string;
    isAD: boolean;
    ldapId: string;
    ldapName: string;
    leaderId: string;
    leaderName: string;
    loginName: string;
    organizationId: string;
    organizationName: string;
    password: string;
    phone: string;
    roles: Roles[];
    status: string;
    userId: string;
    userName: string;
    isRoot : boolean;
}

export {
    UserInfo
}