import { Injectable } from '@angular/core';

@Injectable()
export class ClMngIdService {
    private platformId: String;

    contains(): boolean {
        return !(this.platformId === null || this.platformId === undefined || this.platformId === '')
    }

    setPlatformId(platformId) {
        this.platformId = platformId;
    }

    getPlatformId() {
        return this.platformId;
    }

    clear() {
        this.platformId = null;
    }
}
