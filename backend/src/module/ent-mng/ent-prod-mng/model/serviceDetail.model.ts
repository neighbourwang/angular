export class ServiceDetail {
    // Step1 Data
    id: string = '';
    name: string = '';
    desc: string = '';
    regionId: string = '';
    templateId: string = '';

    // Step2 Data
    flavorId: string = '';
    imageType: number = -1;
    networkType: number = -1;

    // Step3 Data


    // Other Data
    options: Option[] = [];
}


class Option {
    code: string = '';
    value: string = '';
}