import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

constructor() { }

 sensorIdValue = new Subject<any>();

}
