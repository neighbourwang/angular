import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
    name: "filterPlatform"
})

@Injectable()
export class filterPlatformPipe implements PipeTransform {

    transform(arrs:any[], platformId : string) {
		return arrs.filter(arr => arr.platformIds && arr.platformIds.indexOf(platformId) > -1)
    }
}
