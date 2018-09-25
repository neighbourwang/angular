import  { ClusterMode} from "./cluster.model"
export class DCModel {
    dcId: string;
    dcName: string;
    clusters: Array<ClusterMode>;
}