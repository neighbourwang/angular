import { Enterprise } from './enterprise.model';
export class DlrDetailModel{
        dlrPortId:string;
        dlrId:string;
        dlrRouteName:string;
        dlrInterfaceName:string;
        drlSubnetDisplayName:string;
        dlrInterfaceIPaddress:string;
        gateway:string;
        subnetCIDR:string;
        dlrSubnet:string;
        dlrInterfaceType:string;
        lswName:string;
        lswId:string;
        lswTransportZone:string;
        status:string;
        lastUpdate:string;
        platformId:string;

        selected:boolean;
        enterpriseList:Array<Enterprise>;
}


