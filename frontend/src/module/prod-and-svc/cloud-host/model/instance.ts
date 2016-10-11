export class Instance {
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

export class InstanceAction {
    actions: string = '';
    enterpriseIds = {
        'enterpriseId': '18',
        'platformId': '8'
    }
    id: string = '';
    uid: string = '';
}
