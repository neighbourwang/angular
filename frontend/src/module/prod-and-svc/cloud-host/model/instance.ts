class Instance {
    itemId: string = '';
    instanceName: string = '';
    osInfo: string = '';
    specification: string = '';
    networkType: string = '';
    paymentType: string = '';
    ipAddress: string = '';
    description: string = '';
    uuid: string = '';

    checked: boolean = false;
}

class InstanceAction {
    actions: string = '';
    enterpriseIds = {
        'enterpriseId': '18',
        'platformId': '8'
    }
    id: string = '';
    uid: string = '';
}

class InstanceDetail {
    accessIpV4: string = '';
    accessIpV6: string = '';
    adminPass: string = '';
    availabilityZone: string = '';
    createDate: string = '';
    creatorId: string = '';
    description: string = '';
    displayName: string = '';
    flavorId: string = '';
    host: string = '';
    hostName: string = '';
    id: string = '';
    imageRef: string = '';
    keyData: string = '';
    keyName: string = '';
    launchedAt: string = '';
    memoryMb: number = -1;
    memoryMbDisplay: string = '';
    osType: string = '';
    platformId: string = '';
    powerState: number = -1;
    progress: number = -1;
    projectId: string = '';
    rootGb: number = -1;
    terminatedAt: string = '';
    updateDate: string = '';
    uuid: string = '';
    vcpus: number = -1;
    vmState: string = '';
}

export {
    Instance,
    InstanceAction,
    InstanceDetail
}
