import { Injectable } from '@angular/core';

@Injectable()
class DispatchEvent {
	private eventPoll: any = {}
	private pushEventPoll(name: string, callback: Function) {
		if (!this.eventPoll[name]) this.eventPoll[name] = [];

		this.eventPoll[name].push(callback)
	}
	private removeEventPoll(name: string, callback: Function) {
		if (!this.eventPoll[name]) return false

		this.eventPoll[name] = this.eventPoll[name].filter((event:Function) => event !== callback)
	}

	dispatch(name: string) {
		if( !this.eventPoll[name] ) return false

		this.eventPoll[name].forEach((event:Function) => {
			event && event()
		})
	}
	subscribe(name: string, callback: Function) {
		this.pushEventPoll(name, callback)
	}
	unsubscribe(name: string, callback: Function) {
		this.removeEventPoll(name, callback)
	}
	reset() {
		this.eventPoll = {}
	}
}

export {
	DispatchEvent
}

