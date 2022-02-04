import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AlarmSummaryService {

  public readonly alertApiEndPoints = ApiEndpoints.Alert; 
  
  constructor( private httpService : HttpService ) { }
 
  getAlertByMainSensorId(id : string): Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${id}`)
      return this.httpService.get(this.alertApiEndPoints.alertListByMainSensorId, {params});
  }
  
}
