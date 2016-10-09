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
    directoryId : string = '';
    directoryName : string = '';　
    desc: string = '';

    // Step2 Data 
    // Step3 Data
    storages : Storage [];

    // Other Data
    options: Option[] = [];
}


class Option {
    code: string = '';
    value: string = '';
}