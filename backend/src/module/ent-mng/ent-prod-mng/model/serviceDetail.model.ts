export class ServiceDetail {
    // Step1 Data
    id: string = '';
    platformId : string ='';

    name: string = '';

        //企业
    enterpriseId : string = '';
    enterpriseName : string = '';

    
        //区域
    regionId : string = '';
    regionName : string = ''; 

       //服务目录
    serviceId : string = '';
    serviceName : string = '';　
    description: string = '';

    // Step2 Data 
    // Step3 Data
    storages : StorageInfo [];

    // Other Data
    options: Option[] = [];
}


class Option {
    code: string = '';
    value: string = '';
}

export class StorageInfo {
    storageId: string = '';
    name: string = '';
    description: string = '';
    disk : string = '';
}