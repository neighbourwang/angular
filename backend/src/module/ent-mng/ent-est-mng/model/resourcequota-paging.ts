import { ResourceQuota } from "./resourcequota";

export class ResourceQuotaPaging{
	items: ResourceQuota[] = [];
	totalPages: number = 0;
	currentPage: number = 0;
}