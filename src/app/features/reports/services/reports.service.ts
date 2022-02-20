import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/core/config';
import { WaterFlowRequestModel, WaterFlowResponseModel } from 'src/app/core/models/reports/reports.model';
import { HttpService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  public readonly reportsApiEndPoints = ApiEndpoints.WaterFlow; 

  formValueArray : string[] = ['Converted Value','Raw Value']

  constructor(private httpService : HttpService) { }

  waterFlowDataBySensorIdDates(data : WaterFlowRequestModel): Observable<any>{
    const params = new HttpParams()
    .set('mainSensorId',`${data.mainSensorId}`)
    .set('fromDate', `${data.fromDate}`)
    .set('toDate',`${data.toDate}`)
    .set('type',`${data.type}`)
    return this.httpService.get<WaterFlowResponseModel>(this.reportsApiEndPoints.waterFlowListByDatesAndValue, {params});
  }

}
