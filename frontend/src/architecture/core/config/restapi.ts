import { RestApiModel } from '../model/rest';

export let RestApis: RestApiModel[] = [
    {
        "desc": "",
        "method": "GET",
        "id": "hosts.services.get",
        "url": "marketplace/authsec/shopping/servicelist/vm"
    },
    {
        "desc": "",
        "method": "GET",
        "id": "hosts.order.add",
        "url": "/marketplace/authsec/shopping/cart/vm"
    },    
    {
        "desc": "",
        "method": "GET",
        "id": "hosts.instance.get",
        "url": "marketplace/authsec/subinstance/itemlist/vm/page/{page}/size/{size}"
    }
]