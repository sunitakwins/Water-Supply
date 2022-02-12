import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { AlarmSummaryResponseModel } from 'src/app/core/models';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AlarmSummaryService {

  public readonly alertApiEndPoints = ApiEndpoints.Alerts; 
  
  constructor( private httpService : HttpService ) { }
 
  getAlertByMainSensorId(id : string): Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${id}`)
      return this.httpService.get<AlarmSummaryResponseModel>(this.alertApiEndPoints.alertListByMainSensorId, {params});
  }

  getAlertByMainSensorIdDate(data : any): Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${data.mainSensorId}`)
    .set('date',`${data.selectedDate}`)
    return this.httpService.get<AlarmSummaryResponseModel>(this.alertApiEndPoints.alertListByMainSensorIdDate, {params});
  }
  
}
