import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[afterNgFor]'
})
export class afterNgForDirective {

  @Output() afterNgFor: EventEmitter<Event> = new EventEmitter<Event>();

  constructor() {}
  ngOnInit() {      
     this.afterNgFor.emit();
  } 

}
