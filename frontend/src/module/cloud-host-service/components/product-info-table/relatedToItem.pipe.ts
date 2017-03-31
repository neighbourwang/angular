import { Pipe, PipeTransform } from "@angular/core";
import { RelatedList, ItemList } from "./service.model";

@Pipe({
    name: "releatedToItem"
})

export class releatedToItem implements PipeTransform {

    transform(lists: RelatedList[]): Array<any> {
    	return lists.map(related => {
    		related["billingInfo"] = related.productBillingItem;
    		related["serviceType"] = related.type;
    		related["departmentName"] = related.department;

    		return related;
    	});
    }
}
