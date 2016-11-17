export class IpMngQuery {
    dataCenter: string = "";
    cluster: string = "";

    toString(){
        return JSON.stringify(this);
    }
}