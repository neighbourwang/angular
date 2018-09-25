import { Pipe, PipeTransform } from "@angular/core";
import { RelatedList, ItemList } from "./service.model";

@Pipe({
    name: "releatedToItem"
})

export class releatedToItem implements PipeTransform {

    transform(lists: RelatedList[]): Array<any> {
    	return lists.map(related => {
    		related["billingInfo"] = related["billingInfo"] || related.productBillingItem;
    		related["departmentName"] = related["departmentName"] || related.department;
    		related["serviceType"] = related["serviceType"] || related.productType;

    		return related;
    	});
    }
}
