export class StdNet {
    selected: boolean = false;
    nameEditing: boolean;
    id: string = "";
    dcId:string = "";
    dcName: string = ""; //��������
    clusterId: string;
    clusterName: string = "";//����������Ⱥ������
    clusterDisplayName: string;//��������ʾ����
    portGroupId: string;
    portDisplayName: string;//��׼�˿�����ʾ����
    portGroupName: string;//��׼�˿�������
    vlanId: string;//VLANID
    status: string; //״̬����Դ�����ֵ�
    lastUpdate: string;
}