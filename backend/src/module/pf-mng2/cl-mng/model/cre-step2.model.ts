export class CreStep2Model {

    zones : String ; // 可用区状态
    zonesStatus : boolean; //可用区状态

    storages : String ; //存储状态
    storagesStatus : boolean; //存储状态

    flavors : String ; //云主机规格状态
    flavorsStatus : boolean; //云主机规格状态

    images : String ; //镜像状态
    imagesStatus : boolean; //镜像状态

    hosts : String ; // 宿主机状态
    hostsStatus : boolean; //宿主机状态

    message : String; //提示字
    percentage : number; //百分比
    isNext : boolean; //是否能下一步

    constructor(message : String , percentage : number) {
        
        this.zones = 'loading';
        this.zonesStatus = false;

        this.storages = 'loading';
        this.storagesStatus = false;

        this.flavors = 'loading';
        this.flavorsStatus = false;

        this.images = 'loading';
        this.imagesStatus = false;

        this.hosts = 'loading';
        this.hostsStatus = false;

        this.message = message;
        this.percentage = percentage;

        this.isNext = true;
    }
}
