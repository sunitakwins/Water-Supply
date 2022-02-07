import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

constructor() { }

 sensorIdDetails = new Subject<any>();

 alertSummaryData = new Subject<any>();

}
