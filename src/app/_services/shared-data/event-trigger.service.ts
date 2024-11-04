import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventTriggerService {
  constructor() {}

  executeOnchangeFunction = new EventEmitter();

  onReloadServiceData(data: any = null) {
    this.executeOnchangeFunction.emit();
  }
}
