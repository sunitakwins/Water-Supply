import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

constructor() { }

 sensorIdDetails = new Subject<any>();

 alertSummaryData = new Subject<any>();

 currentLanguage = new BehaviorSubject<any>({});

 selectedDateDetails = new Subject<any>();
}
